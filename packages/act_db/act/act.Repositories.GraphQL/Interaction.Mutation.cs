using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Contracts;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StackExchange.Profiling.Internal;

namespace act.Repositories.GraphQL;

public class GraphQLMutation : IGraphQLMutation
{
    private readonly ILogger _logger;

    // constructor
    // inject db context 
    public GraphQLMutation(
        ILogger<GraphQLMutation> logger
        )
    {
        _logger = logger;
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

    public async Task<Interaction?> AddNewEntityInteraction(IInteractionRepository _repo, IRelationRepository _relation,
        string label)
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
        [Service] IInteractionService _interactionService,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        [Service(ServiceKind.Synchronized)] InteractDbContext _dbContext,
        CreateOrUpdateInteractionRequestDto requestDto)
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

        // attach the interaction to the dbcontext
        // this adds to the change tracker
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
            /**
             * 1. add or update relations
             * 2. delete relations
             */
            await _interactionService.UpdateInteractionRelations(requestDto, interaction);

            // persist
            await _dbContext.SaveChangesAsync();

            // log persisted
            // add first act if not exists, this has to be done after saving changes
            if (!_dbContext.FirstActRelations.Any(x => x.HostInteractionId == interaction.Id))
            {
                _interactionRepo.AddToBeFirstActToInteractionWithoutSaving(_relationRepo,
                    interaction);
                // persist to save the relation
                await _interactionRepo.SaveChanges();
            }

            _logger.LogInformation($"Interaction Scalar Added: {interaction.ToJson()}");

            // return a new interaction with all essential relations.
            var result = await _interactionRepo.GetInteractionFull(interaction.Id);
            
            // remove all relations from the change tracker
            // detach interaction
            // _dbContext.Entry(interaction).State = EntityState.Detached;
            _dbContext.ChangeTracker.Clear();
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
}