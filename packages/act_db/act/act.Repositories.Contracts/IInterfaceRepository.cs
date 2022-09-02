

using act.Services.Model;

namespace act.Repositories.Contracts;

public interface IInteractionRepository
{
    Task<Interaction> GetInteractionScalar(int id);
    Task<IEnumerable<Interaction>> GetAllInteractions();
    Task<Interaction> AddInteraction(Interaction interaction);
    
    Task SaveChanges();
    Task DeleteInteraction(int id);
    Task<Interaction> GetInteraction(int interactionId);
    
    Task<bool> HasSubjectRelation(int relationId);
    Task<bool> HasObjectRelation(int relationId);
    Task<bool> HasParallelRelation(int relationId);
    
    Task<SubjectRelation?> GetSubjectRelation(int relationId);
    Task<ICollection<SubjectRelation>> GetSubjectRelations(ICollection<int> subjectRelationIds);
    Task<ObjectRelation?> GetObjectRelation(int relationId);
    Task<ICollection<ObjectRelation>> GetObjectRelations(ICollection<int> relationIds);
    Task<ParallelRelation?> GetParallelRelation(int relationId);
    Task<ICollection<ParallelRelation>> GetParallelRelations(ICollection<int> relationIds);
    Task<Property?> GetProperty(int propertyId);
    Task<ICollection<Property>> GetProperties(ICollection<int> propertyIds);
    Task<bool> CheckIfInteractionExists(int requestDtoId, Guid requestDtoUuid);
}