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
        string label,
        InteractionIdentity identity
    )
    {
        var interaction = Interaction.FromLabelAndIdentity(label, identity);
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

    public async Task<Interaction?> AddNewEntityInteraction(IInteractionRepository _repo, IRelationRepository _relation, string label)
    {
        return await this.AddNewEntityInteraction(_repo, _relation, label, InteractionIdentity.ENTITY);
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
        
        // if the interaction does not have ID, persist it to get the ID first
        if (!(interaction.Id > 0))
        {
            await _interactionRepo.SaveChanges();
            _logger.LogInformation($"Interaction Scalar Added: {interaction.ToJson()}");
        }
        
        // saving relations
        try
        {
            await updateInteractionRelations(requestDto, interaction, _relationRepo, _interactionRepo);

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

    public async Task<long> DeleteRelation([Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        Guid relationUuid, RelationTypes type)
    {
        await _relationRepo.DeleteRelation(relationUuid, type);
        return Task.FromResult(relationUuid.GetHashCode()).Result;
    }

    public async Task<Relation> CreateOrUpdateRelation(
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo, CreateOrUpdateRelationDto requestDto)
    {
        requestDto.ValidateNewRelationOrThrow();

        var relation = await _relationRepo.CreateOrUpdateRelationWithHostInteractionId<Relation>(requestDto);

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
        
        _interactionRepo.LoadAllRelationsOfInteraction(interaction.Id);
        
        // for subjects
        // if no subjects are provided, remove all subjects
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
                ValidateOrCorrectDtoHostInteractionId(interaction, createSubjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SubjectRelation>(createSubjectDto);

                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating subject relation");
                    throw;
                }
            });
        }
        
        // for parallels
        // if no parallels are provided, remove all parallels
        if (requestDto.ParallelDtos is null)
        {
            interaction.Parallels.Clear();
        }
        
        
        foreach (var interactionParallel in interaction.Parallels)
        {
            // if the parallel is not in the requestDto.parallelDtos, remove it
            if (!requestDto.ParallelDtos.Any(s => s.Uuid == interactionParallel.Uuid))
            {
                _logger.LogInformation($"Removing parallel {interactionParallel.Uuid}");
                _dbContext.ParallelRelations.Remove(interactionParallel);
            }
        }
        
        if (requestDto.ParallelDtos is not null)
        {
            requestDto.ParallelDtos?.ForEach(createParallelDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createParallelDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ParallelRelation>(createParallelDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating parallel relation");
                    throw;
                }
            });
        }
        
        // for first acts
        
        // if no first acts are provided, remove all first acts
        if (requestDto.FirstActDtos is null)
        {
            interaction.FirstActs.Clear();
        }
        
        foreach (var interactionFirstAct in interaction.FirstActs)
        {
            // if the first act is not in the requestDto.firstActDtos, remove it
            if (!requestDto.FirstActDtos.Any(s => s.Uuid == interactionFirstAct.Uuid))
            {
                _logger.LogInformation($"Removing first act {interactionFirstAct.Uuid}");
                _dbContext.FirstActRelations.Remove(interactionFirstAct);
            }
        }
        
        if (requestDto.FirstActDtos is not null)
        {
            requestDto.FirstActDtos?.ForEach(createFirstActDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createFirstActDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<FirstActRelation>(createFirstActDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating first act relation");
                    throw;
                }
            });
        }
        
        // for second acts
        
        // if no second acts are provided, remove all second acts
        
        if (requestDto.SecondActDtos is null)
        {
            interaction.SecondActs.Clear();
        }
        
        foreach (var interactionSecondAct in interaction.SecondActs)
        {
            // if the second act is not in the requestDto.secondActDtos, remove it
            if (!requestDto.SecondActDtos.Any(s => s.Uuid == interactionSecondAct.Uuid))
            {
                _logger.LogInformation($"Removing second act {interactionSecondAct.Uuid}");
                _dbContext.SecondActRelations.Remove(interactionSecondAct);
            }
        }
        
        if (requestDto.SecondActDtos is not null)
        {
            requestDto.SecondActDtos?.ForEach(createSecondActDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createSecondActDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SecondActRelation>(createSecondActDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating second act relation");
                    throw;
                }
            });
        }
        
        // for objects
        
        // if no objects are provided, remove all objects
        
        if (requestDto.ObjectDtos is null)
        {
            interaction.Objects.Clear();
        }
        
        foreach (var interactionObject in interaction.Objects)
        {
            // if the object is not in the requestDto.objectDtos, remove it
            if (!requestDto.ObjectDtos.Any(s => s.Uuid == interactionObject.Uuid))
            {
                _logger.LogInformation($"Removing object {interactionObject.Uuid}");
                _dbContext.ObjectRelations.Remove(interactionObject);
            }
        }
        
        if (requestDto.ObjectDtos is not null)
        {
            requestDto.ObjectDtos?.ForEach(createObjectDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createObjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ObjectRelation>(createObjectDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating object relation");
                    throw;
                }
            });
        }
        
        // for indirect objects
        
        // if no indirect objects are provided, remove all indirect objects
        
        if (requestDto.IndirectObjectDtos is null)
        {
            interaction.IndirectObjects.Clear();
        }
        
        foreach (var interactionIndirectObject in interaction.IndirectObjects)
        {
            // if the indirect object is not in the requestDto.indirectObjectDtos, remove it
            if (!requestDto.IndirectObjectDtos.Any(s => s.Uuid == interactionIndirectObject.Uuid))
            {
                _logger.LogInformation($"Removing indirect object {interactionIndirectObject.Uuid}");
                _dbContext.IndirectObjectRelations.Remove(interactionIndirectObject);
            }
        }
        
        if (requestDto.IndirectObjectDtos is not null)
        {
            requestDto.IndirectObjectDtos?.ForEach(createIndirectObjectDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createIndirectObjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<IndirectObjectRelation>(createIndirectObjectDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating indirect object relation");
                    throw;
                }
            });
        }
        
        // for settings
        
        // if no settings are provided, remove all settings
        
        if (requestDto.SettingDtos is null)
        {
            interaction.Settings.Clear();
        }
        
        foreach (var interactionSetting in interaction.Settings)
        {
            // if the setting is not in the requestDto.settingDtos, remove it
            if (!requestDto.SettingDtos.Any(s => s.Uuid == interactionSetting.Uuid))
            {
                _logger.LogInformation($"Removing setting {interactionSetting.Uuid}");
                _dbContext.SettingRelations.Remove(interactionSetting);
            }
        }
        
        if (requestDto.SettingDtos is not null)
        {
            requestDto.SettingDtos?.ForEach(createSettingDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createSettingDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SettingRelation>(createSettingDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating setting relation");
                    throw;
                }
            });
        }
        
        // for contexts 
        
        // if no contexts are provided, remove all contexts
        
        if (requestDto.ContextDtos is null)
        {
            interaction.Contexts.Clear();
        }
        
        foreach (var interactionContext in interaction.Contexts)
        {
            // if the context is not in the requestDto.contextDtos, remove it
            if (!requestDto.ContextDtos.Any(s => s.Uuid == interactionContext.Uuid))
            {
                _logger.LogInformation($"Removing context {interactionContext.Uuid}");
                _dbContext.ContextRelations.Remove(interactionContext);
            }
        }
        
        if (requestDto.ContextDtos is not null)
        {
            requestDto.ContextDtos?.ForEach(createContextDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createContextDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ContextRelation>(createContextDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating context relation");
                    throw;
                }
            });
        }
        
        // for purposes
        
        // if no purposes are provided, remove all purposes
        
        
        
        if (requestDto.PurposeDtos is null)
        {
            interaction.Purposes.Clear();
        }
        
        foreach (var interactionPurpose in interaction.Purposes)
        {
                
            // if the purpose is not in the requestDto.purposeDtos, remove it
            if (!requestDto.PurposeDtos.Any(s => s.Uuid == interactionPurpose.Uuid))
            {
                _logger.LogInformation($"Removing purpose {interactionPurpose.Uuid}");
                _dbContext.PurposeRelations.Remove(interactionPurpose);
            }
        }
        
        if (requestDto.PurposeDtos is not null)
        {
            requestDto.PurposeDtos?.ForEach(createPurposeDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createPurposeDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<PurposeRelation>(createPurposeDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating purpose relation");
                    throw;
                }
            });
        }
        
        // for references
        
        // if no references are provided, remove all references
         
        if (requestDto.ReferenceDtos is null)
        {
            interaction.References.Clear();
        }
        
        foreach (var interactionReference in interaction.References)
        {
            // if the reference is not in the requestDto.referenceDtos, remove it
            if (!requestDto.ReferenceDtos.Any(s => s.Uuid == interactionReference.Uuid))
            {
                _logger.LogInformation($"Removing reference {interactionReference.Uuid}");
                _dbContext.ReferenceRelations.Remove(interactionReference);
            }
        }
        
        if (requestDto.ReferenceDtos is not null)
        {
            requestDto.ReferenceDtos?.ForEach(createReferenceDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createReferenceDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ReferenceRelation>(createReferenceDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating reference relation");
                    throw;
                }
            });
        }
        
        
        
        
        
        
    }

    private static void ValidateOrCorrectDtoHostInteractionId(Interaction? interaction,
        CreateOrUpdateRelationDto createPurposeDto)
    {
        if (createPurposeDto.HostInteractionId == 0)
        {
            createPurposeDto.HostInteractionId = interaction.Id;
        }

        // check if dto's host interaction id is the same as the interaction id
        if (createPurposeDto.HostInteractionId != interaction.Id)
        {
            throw new Exception(
                $"PurposeDto's host interaction id ({createPurposeDto.HostInteractionId}) does not match the interaction id ({interaction.Id})");
        }
    }
}