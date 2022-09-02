using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace act.Repositories.Interface;

public class InteractionRepository : IInteractionRepository
{
    private readonly ActDbContext _dbContext;

    public InteractionRepository(ActDbContext dbContext)
        => _dbContext = dbContext;

    public async Task<Interaction> GetInteractionScalar(int id)
    {
        return await _dbContext.Interactions
            .Include(x => x.Type)
            .FirstOrDefaultAsync(i => i.Id == id) ?? throw new InvalidOperationException();
    }

    public Task<IEnumerable<Interaction>> GetAllInteractions()
    {
        throw new NotImplementedException();
    }

    public async Task<Interaction> AddInteraction(Interaction interaction)
    {
        // Add interaction to database, Id 0 means Add, and Id > 0 means Update
        _dbContext.Interactions.Update(interaction);
        await SaveChanges();
        return interaction;
    }


    public async Task SaveChanges()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteInteraction(int id)
    {
        var interaction = await _dbContext.Interactions.FindAsync(id);
        _dbContext.Interactions.Remove(interaction);
        await SaveChanges();
    }

    public Task<Interaction> GetInteraction(int interactionId)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> HasSubjectRelation(int relationId)
    {
        return await _dbContext.SubjectRelations.AnyAsync(i => i.Id == relationId);
    }

    public async Task<bool> HasObjectRelation(int relationId)
    {
        return await _dbContext.ObjectRelations.AnyAsync(i => i.Id == relationId);
    }

    public async Task<bool> HasParallelRelation(int relationId)
    {
        return await _dbContext.ParallelRelations.AnyAsync(i => i.Id == relationId);
    }

    public async Task<SubjectRelation?> GetSubjectRelation(int relationId)
    {
        return await _dbContext.SubjectRelations.FindAsync(relationId);
    }

    public async Task<ICollection<SubjectRelation>> GetSubjectRelations(ICollection<int> subjectRelationIds)
    {
        return await _dbContext.SubjectRelations
            .Where(i => subjectRelationIds.Contains(i.Id))
            .ToListAsync();
    }

    public async Task<ObjectRelation?> GetObjectRelation(int relationId)
    {
        return await _dbContext.ObjectRelations.FindAsync(relationId);
    }

    public async Task<ICollection<ObjectRelation>> GetObjectRelations(ICollection<int> relationIds)
    {
        return await _dbContext.ObjectRelations
            .Where(i => relationIds.Contains(i.Id))
            .ToListAsync();
    }

    public async Task<ParallelRelation?> GetParallelRelation(int relationId)
    {
        return await _dbContext.ParallelRelations.FindAsync(relationId);
    }

    public async Task<ICollection<ParallelRelation>> GetParallelRelations(ICollection<int> relationIds)
    {
        return await _dbContext.ParallelRelations
            .Where(i => relationIds.Contains(i.Id))
            .ToListAsync();
    }

    public async Task<Property?> GetProperty(int propertyId)
    {
        return await _dbContext.Properties.FindAsync(propertyId);
    }

    public async Task<ICollection<Property>> GetProperties(ICollection<int> propertyIds)
    {
        return await _dbContext.Properties
            .Where(i => propertyIds.Contains(i.Id))
            .ToListAsync();
    }

    public async Task<bool> CheckIfInteractionExists(int requestDtoId, Guid requestDtoUuid)
    {
        if (requestDtoUuid == Guid.Empty || !(requestDtoId > 0))
        {
            return false;
        }
        return await _dbContext.Interactions.AnyAsync(i => i.Id == requestDtoId && i.Uuid == requestDtoUuid);
    }
}