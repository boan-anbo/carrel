using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace act.Repositories;

public class InteractionRepository : IInteractionRepository
{
    private readonly ActDbContext _dbContext;
    private readonly ILogger<InteractionRepository> _logger;

    public InteractionRepository(
        ActDbContext dbContext,
        ILogger<InteractionRepository> logger
    )
    {
        _dbContext = dbContext;
        _logger = logger;
    }


    public async Task<Interaction> GetInteractionScalar(long id)
    {
        return await _dbContext.Interactions
            .Include(x => x.FirstActs)
            .FirstOrDefaultAsync(i => i.Id == id) ?? throw new InvalidOperationException("Interaction not found");
    }

    public async Task<Interaction?> GetInteractionFull(long id)
    {
        return await _dbContext.Interactions
            .Include(x => x.Contexts)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.Subjects)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.FirstActs)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.Objects)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.SecondActs)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.IndirectObjects)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.Parallels)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.Settings)
            .ThenInclude(x => x.LinkedInteraction)
            
            .Include(x => x.Purposes)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.References)
            .ThenInclude(x => x.LinkedInteraction)
            
            .FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Interaction?> GetInteractionFullWithAllRelations(long id)
    {
        // include all relations of full interaction (including reverse as relations)
        return await _dbContext.Interactions
            .Include(x => x.Subjects)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsSubjects)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.Objects)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsObjects)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.Parallels)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsParallels)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.Settings)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsSettings)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.Contexts)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsContexts)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.IndirectObjects)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsIndirectObjects)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.Purposes)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsPurposes)
            .ThenInclude(x => x.HostInteraction)
            .Include(x => x.References)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.AsReferences)
            .ThenInclude(x => x.HostInteraction)
            .FirstOrDefaultAsync(i => i.Id == id);
    }


    public Task<IEnumerable<Interaction>> GetAllInteractions()
    {
        throw new NotImplementedException();
    }

    public async Task<Interaction?> AddOrCreateInteraction(Interaction? interaction)
    {
        await AddOrCreateInteractionWithoutSaving(interaction);
        try
        {
            await SaveChanges();
        }
        catch (Exception e)
        {
            // log interaction as pretty json
            _logger.LogError(e, "Error saving interaction");
            throw;
        }

        return interaction;
    }

    public void AddToBeFirstActToInteractionWithoutSaving(IRelationRepository _relation, Interaction? createdInteraction,
        Interaction interaction)
    {
        var result = _relation.CreateRelationWithHostInteractionId<FirstActRelation>(
            new CreateOrUpdateRelationDto
            {
                Id = null,
                Uuid = null,
                HostInteractionId = createdInteraction.Id,
                RelationType = RelationTypes.FirstActRelation,
                Label = null,
                Description = null,
                Content = null,
                Weight = RelationWeight.Must,
                LinkedInteractionId = 1
            }
        );
        interaction.FirstActs.Add(result);
    }

    public async Task<Interaction?> AddOrCreateInteractionWithoutSaving(Interaction? interaction)
    {
        // Add interactioun to database, Id 0 means Add, and Id > 0 means Update

        // log
        _logger.LogInformation($"Ready to persist {interaction.Id} {interaction.Description}");

        return _dbContext.Interactions.Update(interaction).Entity;
    }


    public async Task SaveChanges()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteInteraction(long id)
    {
        var interaction = await _dbContext.Interactions.FindAsync(id);
        _dbContext.Interactions.Remove(interaction);
        await SaveChanges();
    }


    public async Task<Property?> GetProperty(long propertyId)
    {
        return await _dbContext.Properties.FindAsync(propertyId);
    }

    public async Task<ICollection<Property>> GetProperties(ICollection<long>? propertyIds)
    {
        if (propertyIds == null) return new List<Property>();
        return await _dbContext.Properties
            .Where(i => propertyIds.Contains(i.Id))
            .ToListAsync();
    }

    public async Task<bool> CheckIfInteractionExists(long requestDtoId, Guid requestDtoUuid)
    {
        if (requestDtoUuid == Guid.Empty || !(requestDtoId > 0)) return false;

        return await _dbContext.Interactions.AnyAsync(i => i.Id == requestDtoId && i.Uuid == requestDtoUuid);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public IQueryable<Interaction?> GetInteractionScalarList()
    {
        return _dbContext.Interactions
            .Include(x => x.FirstActs)
            .ThenInclude(x => x.LinkedInteraction)
            .Include(x => x.SecondActs)
            .ThenInclude(x => x.LinkedInteraction)
            .AsQueryable();
    }
}