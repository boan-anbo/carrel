using act.API.DataContracts;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;

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
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo
    )
    {
        return _repo.GetInteractionScalarList();
    }

    /// <summary>
    /// Get full interaction
    ///     Get all interactions
    /// </summary>
    public async Task<InteractionResult> GetInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        int id
    )
    {
        var interaction = await _repo.GetInteractionFull(id);
        // check if interaction is null, if so throw an error
        if (interaction == null)
        {
            throw new QueryException(
                ErrorBuilder.New()
                    .SetMessage("Interaction not found")
                    .SetCode("NOT_FOUND")
                    .SetExtension("id", id)
                    .Build()
            );
        }
        return new InteractionResult(interaction);
    }
}