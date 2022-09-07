using act.Services.Model;

namespace act.Repositories.Contracts;

public interface IInteractionRepository
{
    Task<Interaction?> GetInteractionScalar(long id);
    Task<Interaction> GetInteractionFull(long id);
    Task<Interaction?> GetInteractionFullWithAllRelations(long id);
    Task<IEnumerable<Interaction>> GetAllInteractions();
    Task<Interaction?> AddOrCreateInteraction(Interaction? interaction);

    // This does not persist
    public void AddToBeFirstActToInteractionWithoutSaving(IRelationRepository _relation,
        Interaction interaction);
    Task<Interaction?> CreateOrUpdateInteractionWithoutSaving(Interaction? interaction);

    Task SaveChanges();
    Task DeleteInteraction(long id);

    Task<Property?> GetProperty(long propertyId);
    Task<ICollection<Property>> GetProperties(ICollection<long>? propertyIds);
    Task<bool> CheckIfInteractionExists(long requestDtoId, Guid requestDtoUuid);

    IQueryable<Interaction?> GetInteractionScalarList();

    /// <summary>
    /// This include all relations from an interaction from DBContext. Used when modifying relations of an interaction. Without loading this, the interaction object might not have all the relations represented in the DBContext.
    /// </summary>
    /// <returns></returns>
    void LoadAllRelationsOfInteraction(long id);

    Task<IQueryable<Interaction>> GetInteractionFullListByIdAndRelation();
}