using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StackExchange.Profiling.Internal;

namespace act.Repositories.GraphQL;

public class GraphQLMutation : IGraphQLMutation
{
    private readonly ILogger _logger;
    private readonly ActDbContext _dbContext;

    // constructor
    // inject db context 
    public GraphQLMutation(
        ILogger<GraphQLMutation> logger,
        ActDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
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

        Interaction interaction = requestDto.toInteraction();

        // check if all subject relations are not tracked by dbcontext's change tracker


        await _interactionRepo.CreateOrUpdateInteractionWithoutSaving(interaction);
        // log ready to persis
        _logger.LogInformation($"Interaction Scalar Added Without Saving: {interaction.ToJson()}");

        // saving relations
        try
        {
            updateInteractionRelations(requestDto, interaction, _relationRepo, _interactionRepo);
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
            var result = await _interactionRepo.GetInteractionFull(interaction.Id);
            // detach all subject relations
            return result;
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


    private async Task updateInteractionRelations(
        CreateOrUpdateInteractionRequestDto requestDto,
        Interaction? interaction,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        [Service(ServiceKind.Synchronized)] IInteractionRepository _interactionRepo
    )
    {
        // if no subjects are provided, remove all subjects
        await _interactionRepo.LoadAllRelationsOfInteraction(interaction);

        if (requestDto.SubjectDtos is null)
        {
            interaction.Subjects.Clear();
        }

        foreach (var interactionSubject in interaction.Subjects)
        {
            // if the subject is not in the requestDto.subjectDtos, remove it
            if (!requestDto.SubjectDtos.Any(s => s.Uuid == interactionSubject.Uuid))
            {   
                _logger.LogInformation($"Removing subject {interactionSubject.Uuid}");
                _dbContext.SubjectRelations.Remove(interactionSubject);
            }
        }

        if (requestDto.SubjectDtos is not null)
        {
            requestDto.SubjectDtos?.ForEach(createSubjectDto =>
            {
                try
                {
                    // remove subjects that are not present in the request from the ICollection
                    _relationRepo.CreateOrUpdateRelation<SubjectRelation>(createSubjectDto, interaction);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating subject relation");
                    throw;
                }
            });
        }

        // // filter out subject relations that are not in the request
        // interaction.Subjects = interaction?.Subjects?.Where(subjectRelation =>
        //     requestDto.SubjectDtos?.Any(createSubjectDto =>
        //         createSubjectDto.Uuid == subjectRelation.Uuid) ?? false).ToList();

        requestDto.ObjectDtos?.ForEach(objectId =>
        {
            try
            {
                var relation = _relationRepo.CreateOrUpdateRelation<ObjectRelation>(objectId, interaction);
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
                var relation = _relationRepo.CreateOrUpdateRelation<ParallelRelation>(relatedId, interaction);
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
                var relation = _relationRepo.CreateOrUpdateRelation<SettingRelation>(settingId, interaction);
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
                var relation = _relationRepo.CreateOrUpdateRelation<ContextRelation>(causeId, interaction);
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
                var relation = _relationRepo.CreateOrUpdateRelation<ReferenceRelation>(relatedId, interaction);
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
                var relation = _relationRepo.CreateOrUpdateRelation<PurposeRelation>(purposeId, interaction);
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
                var relation =
                    _relationRepo.CreateOrUpdateRelation<IndirectObjectRelation>(indirectObjectId, interaction);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating indirect object relation");
                throw;
            }
        });
    }
}