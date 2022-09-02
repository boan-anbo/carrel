using act.Repositories.Db;
using act.Services.Model;
namespace act.Repositories.GraphQL;

public class GraphQLQuery
{
    /// <summary>
    /// Get all interactions
    /// </summary>
    /// <param name="dbContext"></param>
    /// <returns></returns>
    [UsePaging(
        IncludeTotalCount = true, 
        MaxPageSize = 100,
        DefaultPageSize = 50
        
        )]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Interaction> GetInteractions(
        [Service(ServiceKind.Synchronized)] ActDbContext dbContext
        )
    { 
        return dbContext.Interactions;
    }
}