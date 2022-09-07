using act.Services.Model;

namespace act.Repositories.Contracts;

public interface IInteractionRepository
{
    Task<Interaction> GetInteractionScalar(long id);
    Task<Interaction?> GetInteractionFull(long id);
    Task<Interaction?> GetInteractionFullWithAllRelations(long id);
    Task<IEnumerable<Interaction>> GetAllInteractions();
    Task<Interaction?> AddOrCreateInteraction(Interaction? interaction);

    // This does not persist
    public void AddToBeFirstActToInteractionWithoutSaving(IRelationRepository _relation,
        Interaction interaction);
    Task<Interaction?> AddOrCreateInteractionWithoutSaving(Interaction? interaction);

    Task SaveChanges();
    Task DeleteInteraction(long id);

    Task<Property?> GetProperty(long propertyId);
    Task<ICollection<Property>> GetProperties(ICollection<long>? propertyIds);
    Task<bool> CheckIfInteractionExists(long requestDtoId, Guid requestDtoUuid);

    IQueryable<Interaction?> GetInteractionScalarList();
}