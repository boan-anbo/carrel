using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace InteractGraphLib;

public interface IInteractTreeGrower
{
    ICollection<InteractTreeData> Grow();

    // constructor
}

public class InteractTreeGrower : IInteractTreeGrower
{
    private readonly InteractTreeSeed _seed;

    /// <summary>
    /// Max number of nodes to generate
    /// </summary>
    public int _maxNodes = 2046;


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
            CheckMaxAndThrow(_maxNodes);
            _counter = value;
        }
    }

    private readonly InteractDbContext _dbContext;
    private int _counter = 0;
    private List<InteractTreeData> _allOffshoots;

    public InteractTreeGrower(
        InteractDbContext dbContext,
        InteractTreeSeed seed
    )
    {
        _dbContext = dbContext;
        _seed = seed;
    }


    public void Reset()
    {
        _alreadyVisitedIds = new List<long>();
        Counter = 0;
        _allOffshoots = new List<InteractTreeData>();
    }

    public ICollection<InteractTreeData> Grow()
    {
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
                InteractTreeData rootData = InteractTreeData.FromRootInteraction(Counter++, root);
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

    private void GrowAllChildren(ICollection<InteractTreeData> rootTreeData)
    {
        foreach (var root in rootTreeData)
        {
            void AddToRootChildren(
                InteractTreeData rootTreeData,
                InteractTreeData treeData
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


    private ICollection<InteractTreeData> GrowBranches(long rootInteractionId, ICollection<RelationTypes> branches)
    {
        List<InteractTreeData> allResults = new List<InteractTreeData>();
        foreach (var branch in branches)
        {
            var results = GrowBranch(rootInteractionId, branch);
            allResults.AddRange(results);
        }

        return allResults;
    }

    private ICollection<InteractTreeData> GrowAsBranches(long rootInteractionId,
        ICollection<AsRelationTypes> seedAsBranches)
    {
        List<InteractTreeData> allResults = new List<InteractTreeData>();
        foreach (var branch in seedAsBranches)
        {
            var results = GrowAsBranch(rootInteractionId, branch);
            allResults.AddRange(results);
        }

        return allResults;
    }


    private ICollection<InteractTreeData> GrowBranch(long rootInteractionId, RelationTypes branchType)
    {
        List<InteractTreeData> result = new List<InteractTreeData>();


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
            default:
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
        }

        return result;
    }

    private ICollection<InteractTreeData> GrowAsBranch(long genzhuId, AsRelationTypes branchType)
    {
        List<InteractTreeData> result = new List<InteractTreeData>();

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
            default:
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
        }


        return result;
    }

    private void GrowAsRelation(AsRelationTypes branchType, IQueryable<Interaction?> genzhuHasChildren,
        List<InteractTreeData> result)
    {
        foreach (var interaction in genzhuHasChildren)
        {
            var child = InteractTreeData.FromInteractionAsRelation(Counter++, interaction, branchType);
            result.Add(child);
        }
    }

    private void GrowRelation(RelationTypes relationTypes, IQueryable<Relation?> relations,
        List<InteractTreeData> interactTreeDatas)
    {
        if (relations.Any())
        {
            foreach (var relation in relations)
            {
                var child = InteractTreeData.FromInteractionRelation(Counter++, relation.LinkedInteraction,
                    relationTypes);
                interactTreeDatas.Add(child);
            }
        }
    }

    private void CheckMaxAndThrow(int maxNodes)
    {
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