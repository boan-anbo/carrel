
using act.Repositories.Db;
using InteractGraphLib;

namespace Interact.Graph.Service;

public interface IInteractGraphService
{
    
    Task<ICollection<InteractTreeDataRecursive>> GrowTree(InteractTreeSeed seed);
}

public class InteractGraphService : IInteractGraphService
{
    private readonly InteractDbContext _dbContext;


    // inject dbcontext
    public InteractGraphService(
        InteractDbContext dbContext
        )
    {
        _dbContext = dbContext;
        
    }
    
    public Task<ICollection<InteractTreeDataRecursive>> GrowTree(InteractTreeSeed seed)
    {
        
        var grower = new InteractTreeGrower(_dbContext, seed);
        
        var tree = grower.Grow();
        
        return Task.FromResult(tree);
    }
}