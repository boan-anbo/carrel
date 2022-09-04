using act.Services.Model;

namespace act.Repositories.Contracts;

public interface IRelationRepository
{
    Task SaveChangesAsync();
    Task DeleteRelation(int id, RelationTypes type);


    Task<T?> GetRelation<T>(int relationId, RelationTypes relationType) where T : Relation;

    Task<bool> CheckIfRelationExists(int requestDtoId, Guid requestDtoUuid, RelationTypes relationType);

    /// <summary>
    /// This is for when interaction instance is ready
    /// </summary>
    /// <param name="Weight"></param>
    /// <param name="hostInteraction"></param>
    /// <param name="LinkedInteractionId"></param>
    /// <param name="relationType"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    T? CreateRelation<T>(
       CreateOrUpdateRelationDto requestDto,
       Interaction? hostInteraction
    ) where T : Relation;

    /// <summary>
    /// This is for when interaction instance is not ready
    /// </summary>
    /// <param name="Weight"></param>
    /// <param name="hostInteractionId"></param>
    /// <param name="LinkedInteractionId"></param>
    /// <param name="relationType"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    T? CreateRelationWithHostInteractionId<T>(CreateOrUpdateRelationDto request) where T : Relation;

    Task DeleteRelation(Guid relationId, int hostInteractionId, int linkedInteractionId, RelationTypes type);
}