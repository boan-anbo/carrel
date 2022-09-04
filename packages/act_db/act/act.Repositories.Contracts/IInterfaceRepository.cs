using act.Services.Model;

namespace act.Repositories.Contracts;

public interface IInteractionRepository
{
    Task<Interaction> GetInteractionScalar(int id);
    Task<Interaction?> GetInteractionFull(int id);
    Task<Interaction?> GetInteractionFullWithAllRelations(int id);
    Task<IEnumerable<Interaction>> GetAllInteractions();
    Task<Interaction?> AddOrCreateInteraction(Interaction? interaction);
    Task<Interaction?> AddOrCreateInteractionWithoutSaving(Interaction? interaction);

    Task SaveChanges();
    Task DeleteInteraction(int id);

    Task<Property?> GetProperty(int propertyId);
    Task<ICollection<Property>> GetProperties(ICollection<int> propertyIds);
    Task<bool> CheckIfInteractionExists(int requestDtoId, Guid requestDtoUuid);

    IQueryable<Interaction?> GetInteractionScalarList();
}