using act.Repositories.Contracts;
using act.Services.Model;

namespace act.Repositories.GraphQL;

public interface IGraphQLMutation
{
    Task<Interaction?> AddNewEntityInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relation,
        string label
    );

    Task<long> DeleteInteraction(
        long id,
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo
    );

    /// <summary>
    ///     Core opetions to add or update interaction
    /// </summary>
    /// <remarks>
    ///     If ID and UUID are not provided, a new interaction is created.
    ///     If both are provided, the interaction is updated.
    ///     Validation is performed on the interaction before it is saved.
    /// </remarks>
    Task<Interaction?> CreateOrUpdateInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _interactionRepo,
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        CreateOrUpdateInteractionRequestDto requestDto
    );

    Task<long> deleteRelation(
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        Guid relationId,
        long hostInteractionId,
        long linkedInteractionId,
        RelationTypes relationType
    );

    /// <summary>
    /// Dedicated GQL endpoint for mutating relation. This is a separated process than creating or updating interaction.
    /// </summary>
    /// <param name="_relationRepo"></param>
    /// <param name="requestDto"></param>
    /// <returns></returns>
    Task<Relation> CreateOrUpdateRelation(
        [Service(ServiceKind.Synchronized)] IRelationRepository _relationRepo,
        CreateOrUpdateRelationDto requestDto
    );
}