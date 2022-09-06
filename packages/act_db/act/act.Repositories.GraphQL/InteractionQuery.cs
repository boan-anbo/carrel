using act.API.DataContracts;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;

namespace act.Repositories.GraphQL;

public class GraphQLQuery
{
    public GraphQLQuery()
    {
    }


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
    public async Task<InteractionResult> GetInteractionFull(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        long id
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
        var result = new InteractionResult(interaction,  InteractionResultType.FullInteraction);
        return result;
    }
    
    /// <summary>
    /// Get full interactions with all relations
    /// </summary>
    public async Task<InteractionResult> GetFullInteractionWithAllRelations(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        long id
    )
    {
        var interaction = await _repo.GetInteractionFullWithAllRelations(id);
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
        var result = new InteractionResult(interaction, InteractionResultType.FullInteractionWithAllRelations);
        return result;
    }

}