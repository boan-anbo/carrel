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
        string label
    )
    {
        var interaction = Interaction.FromLabel(label);
        interaction.SetEntityIdentityAndType();
        await _repo.AddOrCreateInteraction(interaction);


        return await _repo.GetInteractionScalar(interaction.Id);
    }

    public async Task<int> DeleteInteraction(
        int id,
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
        requestDto.ValidateOrThrow();
        // convert identity
        var identity = InteractionIdentity.ACT;
        // switch (request.Identity)

        switch (requestDto.Identity)
        {
            case AddInteractionIdentity.ENTITY:
                identity = InteractionIdentity.ENTITY;
                break;
            case AddInteractionIdentity.ACT:
                identity = InteractionIdentity.ACT;
                break;
            case AddInteractionIdentity.SOURCE:
                identity = InteractionIdentity.SOURCE;
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }


        var end = DateTimeOffset.FromUnixTimeMilliseconds(requestDto.End);
        var start = DateTimeOffset.FromUnixTimeMilliseconds(requestDto.Start);
        // load related entities

        var properties = await _interactionRepo.GetProperties(requestDto.PropertyIds);


        // check existence if an ID and an GUID are provided
        // if not, create interaction as a new one
        if (requestDto.Id != null && requestDto.Id > 0 && requestDto.Uuid is not null &&
            requestDto.Uuid.ToString().Length > 0)
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
            FirstActId = requestDto.FirstActId,
            Start = start.DateTime,
            End = end.DateTime,
            Properties = properties
        };


        var updatedButNotSavedInteraction = await _interactionRepo.AddOrCreateInteractionWithoutSaving(interaction);
        // log ready to persis
        _logger.LogInformation($"Interaction Scalar Added Without Saving: {interaction.ToJson()}");

        // saving relations
        try
        {
            loadRelations(requestDto, updatedButNotSavedInteraction, _relationRepo);
            // persist
            await _interactionRepo.SaveChanges();
            // log persisted
            _logger.LogInformation($"Interaction Scalar Added: {updatedButNotSavedInteraction.ToJson()}");
            var returnedInteraction = await _interactionRepo.GetInteractionFull(updatedButNotSavedInteraction.Id);
            return returnedInteraction;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error creating relations for interaction {}", updatedButNotSavedInteraction.Id);
            throw;
        }
    }

    public async Task<int> deleteRelation([Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        Guid relationId, int hostInteractionId, int linkedInteractionId, RelationTypes type)
    {
        await _relationRepo.DeleteRelation(relationId, hostInteractionId, linkedInteractionId, type);
        return Task.FromResult(relationId.GetHashCode()).Result;
    }

    public async Task<Relation> CreateOrUpdateRelation(
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo, CreateOrUpdateRelationDto requestDto)
    {
        requestDto.ValidateNewRelationOrThrow();

        var relation = _relationRepo.CreateRelationWithId<Relation>(requestDto);

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
        requestDto.SubjectIds.ForEach(createSubjectDto =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<SubjectRelation>(createSubjectDto, interaction);
                interaction.Subjects.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating subject relation");
                throw;
            }
        });

        requestDto.ObjectIds.ForEach(objectId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ObjectRelation>(objectId, interaction);
                interaction.Objects.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating object relation");
                throw;
            }
        });

        requestDto.ParallelIds.ForEach(relatedId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ParallelRelation>(relatedId, interaction);
                interaction.Parallels.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating parallel relation");
                throw;
            }
        });

        requestDto.SettingIds.ForEach(settingId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<SettingRelation>(settingId, interaction);
                interaction.Settings.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating setting relation");
                throw;
            }
        });

        requestDto.ContextIds.ForEach(causeId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ContextRelation>(causeId, interaction);
                interaction.Contexts.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating context relation");
                throw;
            }
        });

        requestDto.ReferenceIds.ForEach(relatedId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<ReferenceRelation>(relatedId, interaction);
                interaction.References.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating reference relation");
                throw;
            }
        });

        requestDto.PurposeIds.ForEach(purposeId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<PurposeRelation>(purposeId, interaction);
                interaction.Purposes.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating purpose relation");
                throw;
            }
        });

        requestDto.IndirectObjectIds.ForEach(indirectObjectId =>
        {
            try
            {
                var relation = _relationRepo.CreateRelation<IndirectObjectRelation>(indirectObjectId, interaction);
                interaction.IndirectObjects.Add(relation);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating indirect object relation");
                throw;
            }
        });
    }
}