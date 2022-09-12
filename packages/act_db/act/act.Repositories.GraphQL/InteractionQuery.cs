using act.API.DataContracts;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Contracts;
using act.Services.Model;
using HotChocolate.Execution;
using Interact.Graph.Service;
using InteractGraphLib;
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
        return _repo.GetInteractionFullList();
    }

    /// <summary>
    ///     Filter interactions by interaction and relation types.
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
    public Task<IQueryable<Interaction>> GetInteractionsByIdAndRelation(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo
    )
    {
        return _repo.GetInteractionFullListByIdAndRelation();
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

        var result = new InteractionResult(interaction, InteractionResultType.FullInteraction);
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


    // Get all relations


    /// <summary>
    /// Filter subject relations
    /// </summary>
    /// <returns></returns>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SubjectRelation> GetSubjectRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetSubjectRelationsFull();
    }

    // same function for all nine types of relations in RelationType.cs

    /// <summary>
    /// Filter object relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ObjectRelation> GetObjectRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetObjectRelationsFull();
    }

    /// <summary>
    /// Filter context relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ContextRelation> GetContextRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetContextRelationsFull();
    }

    /// <summary>
    /// Filter first acts relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<FirstActRelation> GetFirstActRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetFirstActRelationsFull();
    }

    /// <summary>
    /// Filter second acts relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SecondActRelation> GetSecondActRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetSecondActRelationsFull();
    }

    /// <summary>
    /// Filter indirect object relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<IndirectObjectRelation> GetIndirectObjectRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetIndirectObjectRelationsFull();
    }

    /// <summary>
    /// Filter settings relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SettingRelation> GetSettingsRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetSettingsRelationsFull();
    }

    /// <summary>
    /// Filter reference relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ReferenceRelation> GetReferenceRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetReferenceRelationsFull();
    }

    /// <summary>
    /// Filter paralell relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ParallelRelation> GetParallelRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetParallelRelationsFull();
    }

    /// <summary>
    /// Filter purpose relations
    /// </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
    [UseSorting]
    public IQueryable<PurposeRelation> GetPurposeRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetPurposeRelationsFull();
    }
    
    /// <summary>
    /// Filter category relations
    ///  </summary>
    [UsePaging(
        IncludeTotalCount = true,
        MaxPageSize = 10000,
        DefaultPageSize = 100
    )]
    [UseFiltering]
[UseSorting]
    public IQueryable<TagRelation> GetTagRelations(
        [Service(ServiceKind.Synchronized)] IRelationRepository _repo
    )
    {
        return _repo.GetTagRelationsFull();
    }

    /// <summary>
    /// Get Tree Graph from relations
    /// </summary>
    public async Task<ICollection<InteractTreeDataFlat>> GetTreeGraph(
        [Service] IInteractGraphService treeService,
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        InteractTreeSeed seed
    )
    {
        var checkedSeed = new InteractTreeSeed(seed);
       
        // check if rootIds is null, if so throw an error
        if (checkedSeed.Branches.Roots == null)
        {
            throw new QueryException(
                ErrorBuilder.New()
                    .SetMessage("RootIds not found")
                    .SetCode("NOT_FOUND")
                    .SetExtension("rootIds", checkedSeed.Branches.Roots)
                    .Build()
            );
        }

        var interactions = await _repo.GetInteractionsFullByIds(checkedSeed.Branches.Roots);

        if (interactions == null)
        {
            throw new QueryException(
                ErrorBuilder.New()
                    .SetMessage("Interactions not found")
                    .SetCode("NOT_FOUND")
                    .SetExtension("interactions", interactions)
                    .Build()
            );
        }

        var tree = await treeService.GrowTree(
            checkedSeed
        );
        
        

        
        return InteractTreeDataFlat.FromInteractTreeDataRecursive(tree);
    }
}

