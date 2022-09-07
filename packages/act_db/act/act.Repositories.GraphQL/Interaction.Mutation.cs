using act.Repositories.Contracts;
using act.Services.Model;
using Microsoft.Extensions.Logging;
using StackExchange.Profiling.Internal;

namespace act.Repositories.GraphQL;

public class GraphQLMutation : IGraphQLMutation
{
    private readonly ILogger _logger;

    // constructor
    public GraphQLMutation(
        ILogger<GraphQLMutation> logger)
    {
        _logger = logger;
    }

    public async Task<Interaction?> AddNewEntityInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relation,
        string label
    )
    {
        var interaction = Interaction.FromLabel(label);
        var createdInteraction = await _repo.AddOrCreateInteraction(interaction);

        if (createdInteraction == null)
        {
            _logger.LogError("Failed to create interaction");
            return null;
        }

        _repo.AddToBeFirstActToInteractionWithoutSaving(_relation, createdInteraction);

        await _repo.SaveChanges();


        return await _repo.GetInteractionScalar(interaction.Id);
    }


    public async Task<long> DeleteInteraction(
        long id,
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo
    )
    {
        await _repo.DeleteInteraction(id);
        return Task.FromResult(id).Result;
    }

    /// <summary>
    ///     Core opetions to add or update interaction
    /// </summary>
    /// <remarks>
    ///     If ID and UUID are not provided, a new interaction is created.
    ///     If both are provided, the interaction is updated.
    ///     Validation is performed on the interaction before it is saved.
    /// </remarks>
    [UseProjection]
    public async Task<Interaction?> CreateOrUpdateInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _interactionRepo,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        CreateOrUpdateInteractionRequestDto requestDto
    )
    {
        _logger.LogInformation($"CreateOrUpdateInteraction: {requestDto.ToJson()}");
        /// check validity of request
        requestDto.ValidateOrThrow();
        // convert identity

        var identity = requestDto.Identity;


        // load related entities

        var properties = await _interactionRepo.GetProperties(requestDto.PropertyIds);


        // check existence if an ID and an GUID are provided
        // if not, create interaction as a new one
        if (requestDto.Uuid is not null && requestDto.Uuid.ToString().Length > 0)
        {
            var exists =
                await _interactionRepo.CheckIfInteractionExists(requestDto.Id ?? 0, requestDto.Uuid ?? Guid.Empty);
            if (!exists)
                throw new ArgumentException(
                    "Update Interaction with ID and GUID are provided but they do not match any interactions in the DB.");
        }

        var interaction = new Interaction
        {
            Id = requestDto.Id ?? 0,
            Uuid = requestDto.Uuid ?? Guid.NewGuid(),
            Label = requestDto.Label,
            Description = requestDto.Description,
            Identity = identity,
            Start = requestDto.Start,
            End = requestDto.End,
            Properties = properties
        };


        await _interactionRepo.AddOrCreateInteractionWithoutSaving(interaction);
        // log ready to persis
        _logger.LogInformation($"Interaction Scalar Added Without Saving: {interaction.ToJson()}");

        // saving relations
        try
        {
            loadRelations(requestDto, interaction, _relationRepo);
            // check if interaction has at least first acts

            // persist
            await _interactionRepo.SaveChanges();

            // log persisted
            // add first act if not exists, this has to be done after saving changes
            if (interaction.FirstActs.Count == 0)
            {
                _interactionRepo.AddToBeFirstActToInteractionWithoutSaving(_relationRepo,
                    interaction);
                // persist to save the relation
                await _interactionRepo.SaveChanges();
            }

            // if interaction still has no first acts, throw
            if (interaction.FirstActs.Count == 0)
                throw new ArgumentException("Interaction must have at least one first act.");

            _logger.LogInformation($"Interaction Scalar Added: {interaction.ToJson()}");

            // return a new interaction with all essential relations.
            return await _interactionRepo.GetInteractionFull(interaction.Id);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error creating relations for interaction {}", interaction.Id);
            throw;
        }
    }

    public async Task<long> deleteRelation([Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        Guid relationId, long hostInteractionId, long linkedInteractionId, RelationTypes type)
    {
        await _relationRepo.DeleteRelation(relationId, hostInteractionId, linkedInteractionId, type);
        return Task.FromResult(relationId.GetHashCode()).Result;
    }

    public async Task<Relation> CreateOrUpdateRelation(
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo, CreateOrUpdateRelationDto requestDto)
    {
        requestDto.ValidateNewRelationOrThrow();

        var relation = _relationRepo.CreateRelationWithHostInteractionId<Relation>(requestDto);

        try
        {
            await _relationRepo.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error persisting {}", relation.ToJson());
            throw;
        }

        return relation;
    }


    private void loadRelations(
        CreateOrUpdateInteractionRequestDto requestDto,
        Interaction? interaction,
        IRelationRepository _relationRepo
    )
    {
        requestDto.SubjectDtos?.ForEach(createSubjectDto =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<SubjectRelation>(createSubjectDto, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating subject relation");
                throw;
            }
        });

        requestDto.ObjectDtos?.ForEach(objectId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ObjectRelation>(objectId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating object relation");
                throw;
            }
        });

        requestDto.ParallelDtos?.ForEach(relatedId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ParallelRelation>(relatedId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating parallel relation");
                throw;
            }
        });

        requestDto.SettingDtos?.ForEach(settingId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<SettingRelation>(settingId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating setting relation");
                throw;
            }
        });

        requestDto.ContextDtos?.ForEach(causeId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ContextRelation>(causeId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating context relation");
                throw;
            }
        });

        requestDto.ReferenceDtos?.ForEach(relatedId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ReferenceRelation>(relatedId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating reference relation");
                throw;
            }
        });

        requestDto.PurposeDtos?.ForEach(purposeId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<PurposeRelation>(purposeId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating purpose relation");
                throw;
            }
        });

        requestDto.IndirectObjectDtos?.ForEach(indirectObjectId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<IndirectObjectRelation>(indirectObjectId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating indirect object relation");
                throw;
            }
        });
    }
}