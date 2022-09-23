using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace InteractGraphLib;

public interface IInteractTreeGrower
{
    ICollection<InteractTreeDataRecursive> Grow();

    // constructor
}

public class InteractTreeGrower : IInteractTreeGrower
{
    private readonly InteractTreeSeed _seed;


    /// <summary>
    /// A list of nodes that are always hidden, such as 'to be'.
    /// </summary>
    private long[] ignoreInteractions = new long[] { 1, 2 };

    /// <summary>
    /// A collection of all the nodes in the tree that has been traversed and should not be traversed again to prevent infinite loops.
    /// </summary>
    private ICollection<long> _alreadyVisitedIds = new List<long>();

    /// <summary>
    /// Counter
    /// </summary>
    private int Counter
    {
        get { return _counter; }
        set
        {
            CheckMaxAndThrow(_seed.Option.MaxBranches);
            _counter = value;
        }
    }

    private readonly InteractDbContext _dbContext;
    private int _counter = 0;
    private List<InteractTreeDataRecursive> _allOffshoots;

    public InteractTreeGrower(
        InteractDbContext dbContext,
        InteractTreeSeed seed
    )
    {
        _dbContext = dbContext;
        _seed = seed;
    }


    public bool shouldIgnore(long id)
    {
        return ignoreInteractions.Contains(id);
    }

    public void SetMaxBranches(int maxBranches)
    {
        _seed.Option.MaxBranches = maxBranches;
    }

    public int MaxBranches()
    {
        return ((int)_seed.Option.MaxBranches)!;
    }

    public void Reset()
    {
        _alreadyVisitedIds = new List<long>();
        Counter = 0;
        _allOffshoots = new List<InteractTreeDataRecursive>();
    }

    public ICollection<InteractTreeDataRecursive> Grow()
    {
        // check if branches are provided, if not, populate with all branches
        _seed.PopulateBranches();

        try
        {
            // Create a list of all the nodes that are in the tree
            Reset();
            // start with the roots.
            var rootIds = _seed.Branches.Roots;

            // Grow the tree
            foreach (var rootId in rootIds)
            {
                Interaction root = _dbContext.Interactions.Find(rootId);
                if (root == null)
                {
                    throw new Exception($"Root with id {rootId} not found");
                }

                InteractTreeDataRecursive rootDataRecursive =
                    InteractTreeDataRecursive.FromRootInteraction(Counter++, root);

                // Add the root to the list of all offshoots
                _allOffshoots.Add(rootDataRecursive);
            }

            // loop over roots
            GrowAllChildren(_allOffshoots);
        }
        catch (ReachMaxNodeException e)
        {
            Console.WriteLine(e);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return _allOffshoots;
    }

    private void GrowAllChildren(ICollection<InteractTreeDataRecursive> rootTreeData)
    {
        foreach (var root in rootTreeData)
        {
            void AddToRootChildren(
                InteractTreeDataRecursive rootTreeData,
                InteractTreeDataRecursive treeData
            )
            {
                // check if the treeData has already been traversed before
                if (_alreadyVisitedIds.Contains(treeData.InteractionId))
                {
                    // if it has, then we need to find the node in the tree and add the treeData as a child to that node. TODO: Do I need to do that as well?
                    // var node = root.FindNode(treeData.Id);
                    // node.Children.Add(treeData);
                }
                else
                {
                    // if it has not been traversed before, then we can just add it to the root.
                    rootTreeData.Children.Add(treeData);
                    _alreadyVisitedIds.Add(treeData.InteractionId);
                }
            }

            if (shouldIgnore(root.InteractionId))
            {
                continue;
            }

            // loop over branches
            var branchResults = GrowBranches(root.InteractionId, _seed.Branches.HasBranches);
            // add branches to root children
            foreach (var branch in branchResults)
            {
                AddToRootChildren(root, branch);
            }

            var asBranchResults = GrowAsBranches(root.InteractionId, _seed.Branches.AsBranches);
            // add aSbranches to root children
            foreach (var asBranch in asBranchResults)
            {
                AddToRootChildren(root, asBranch);
            }

            GrowAllChildren(root.Children);
        }
    }


    private ICollection<InteractTreeDataRecursive> GrowBranches(long rootInteractionId,
        ICollection<RelationTypes> branches)
    {
        List<InteractTreeDataRecursive> allResults = new List<InteractTreeDataRecursive>();
        foreach (var branch in branches)
        {
            var results = GrowBranch(rootInteractionId, branch);
            allResults.AddRange(results);
        }

        return allResults;
    }

    private ICollection<InteractTreeDataRecursive> GrowAsBranches(long rootInteractionId,
        ICollection<AsRelationTypes> seedAsBranches)
    {
        List<InteractTreeDataRecursive> allResults = new List<InteractTreeDataRecursive>();
        foreach (var branch in seedAsBranches)
        {
            var results = GrowAsBranch(rootInteractionId, branch);
            allResults.AddRange(results);
        }

        return allResults;
    }


    private ICollection<InteractTreeDataRecursive> GrowBranch(long rootInteractionId, RelationTypes branchType)
    {
        List<InteractTreeDataRecursive> result = new List<InteractTreeDataRecursive>();


        switch (branchType)
        {
            case RelationTypes.ContextRelation:
                var interactions = _dbContext.ContextRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, interactions, result);
                break;
            case RelationTypes.SubjectRelation:
                var subjectRelations = _dbContext.SubjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, subjectRelations, result);
                break;
            case RelationTypes.FirstActRelation:
                var firstActRelations = _dbContext.FirstActRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, firstActRelations, result);
                break;
            case RelationTypes.ObjectRelation:
                var objectRelations = _dbContext.ObjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, objectRelations, result);

                break;
            case RelationTypes.SecondActRelation:
                var secondActRelations = _dbContext.SecondActRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, secondActRelations, result);
                break;
            case RelationTypes.IndirectObjectRelation:
                var indirectObjectRelations = _dbContext.IndirectObjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, indirectObjectRelations, result);
                break;
            case RelationTypes.SettingRelation:
                var settingRelations = _dbContext.SettingRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, settingRelations, result);
                break;
            case RelationTypes.PurposeRelation:
                var purposeRelations = _dbContext.PurposeRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, purposeRelations, result);
                break;
            case RelationTypes.ParallelRelation:
                var parallelRelations = _dbContext.ParallelRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, parallelRelations, result);
                break;
            case RelationTypes.ReferenceRelation:
                var referenceRelations = _dbContext.ReferenceRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, referenceRelations, result);
                break;
            case RelationTypes.TagRelation:
                var tagRelations = _dbContext.TagRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                GrowRelation(branchType, tagRelations, result);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
        }

        return result;
    }

    private ICollection<InteractTreeDataRecursive> GrowAsBranch(long genzhuId, AsRelationTypes branchType)
    {
        List<InteractTreeDataRecursive> result = new List<InteractTreeDataRecursive>();

        switch (branchType)
        {
            case AsRelationTypes.AsSubjectRelation:
                var genzhuHasChildren = _dbContext.Interactions
                    .Include(x => x.Subjects)
                    .AsNoTracking()
                    .Where(x => x.Subjects.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasChildren, result);
                break;
            case AsRelationTypes.AsFirstActRelation:
                var genzhuHasFirstAct = _dbContext.Interactions
                    .Include(x => x.FirstActs)
                    .AsNoTracking()
                    .Where(x => x.FirstActs.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasFirstAct, result);
                break;
            case AsRelationTypes.AsObjectRelation:
                var genzhuHasObject = _dbContext.Interactions
                    .Include(x => x.Objects)
                    .AsNoTracking()
                    .Where(x => x.Objects.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasObject, result);
                break;
            case AsRelationTypes.AsSecondActRelation:
                var genzhuHasSecondAct = _dbContext.Interactions
                    .Include(x => x.SecondActs)
                    .AsNoTracking()
                    .Where(x => x.SecondActs.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasSecondAct, result);
                break;
            case AsRelationTypes.AsIndirectObjectRelation:
                var genzhuHasIndirectObject = _dbContext.Interactions
                    .Include(x => x.IndirectObjects)
                    .AsNoTracking()
                    .Where(x => x.IndirectObjects.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasIndirectObject, result);
                break;
            case AsRelationTypes.AsSettingRelation:
                var genzhuHasSetting = _dbContext.Interactions
                    .Include(x => x.Settings)
                    .AsNoTracking()
                    .Where(x => x.Settings.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasSetting, result);
                break;
            case AsRelationTypes.AsPurposeRelation:
                var genzhuHasPurpose = _dbContext.Interactions
                    .Include(x => x.Purposes)
                    .AsNoTracking()
                    .Where(x => x.Purposes.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasPurpose, result);
                break;
            case AsRelationTypes.AsParallelRelation:
                var genzhuHasParallel = _dbContext.Interactions
                    .Include(x => x.Parallels)
                    .AsNoTracking()
                    .Where(x => x.Parallels.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasParallel, result);
                break;
            case AsRelationTypes.AsReferenceRelation:
                var genzhuHasReference = _dbContext.Interactions
                    .Include(x => x.References)
                    .AsNoTracking()
                    .Where(x => x.References.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasReference, result);
                break;
            case AsRelationTypes.AsContextRelation:
                var genzhuHasContext = _dbContext.Interactions
                    .Include(x => x.Contexts)
                    .AsNoTracking()
                    .Where(x => x.Contexts.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasContext, result);
                break;
            case AsRelationTypes.AsTagRelation:
                var genzhuHasCategory = _dbContext.Interactions
                    .Include(x => x.Tags)
                    .AsNoTracking()
                    .Where(x => x.Tags.Any(s => s.LinkedInteractionId == genzhuId));
                GrowAsRelation(branchType, genzhuHasCategory, result);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
        }


        return result;
    }

    private void GrowAsRelation(AsRelationTypes branchType, IQueryable<Interaction?> genzhuHasChildren,
        List<InteractTreeDataRecursive> result)
    {
        foreach (var interaction in genzhuHasChildren)
        {
            var child = InteractTreeDataRecursive.FromInteractionAsRelation(Counter++, interaction, branchType);
            result.Add(child);
        }
    }

    private void GrowRelation(RelationTypes relationTypes, IQueryable<Relation?> relations,
        List<InteractTreeDataRecursive> interactTreeDatas)
    {
        if (relations.Any())
        {
            foreach (var relation in relations)
            {
                var child = InteractTreeDataRecursive.FromInteractionRelation(Counter++, relation.LinkedInteraction,
                    relationTypes);
                interactTreeDatas.Add(child);
            }
        }
    }

    private void CheckMaxAndThrow(int? maxNodes)
    {
        if (maxNodes is null)
        {
            throw new NoMaxNodesException();
        }

        if (Counter > maxNodes + 1)
        {
            throw new ReachMaxNodeException($"Reach max nodes of {Counter}");
        }
    }
}

public class ReachMaxNodeException : Exception
{
    public ReachMaxNodeException(string message) : base(message)
    {
    }
}

public class NoMaxNodesException : Exception
{
    public NoMaxNodesException() : base("No max nodes")
    {
    }
}
