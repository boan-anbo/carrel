using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;

namespace act.Repositories.GraphQL;

public class GraphQLQuery
{
    /// <summary>
    ///     Get all interactions
    /// </summary>
    /// <param name="dbContext"></param>
    /// <returns></returns>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 100,
        DefaultPageSize = 50
    )]

    [UseFiltering]
    [UseSorting]
    public IQueryable<Interaction?> GetInteractions(
        [Service(ServiceKind.Synchronized)] ActDbContext dbContext
    )
    {
        return dbContext.Interactions;
    }

    /// <summary>
    /// Get full interaction
    ///     Get all interactions
    /// </summary>
    public async Task<Interaction?> GetInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        int id
    )
    {
        return await _repo.GetInteractionFull(id);
    }
}