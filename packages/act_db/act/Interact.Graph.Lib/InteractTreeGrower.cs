using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace InteractGraphLib;

public class InteractTreeGrower
{
    private readonly InteractTreeSeed _seed;

    /// <summary>
    /// A collection of all the nodes in the tree that has been traversed and should not be traversed again to prevent infinite loops.
    /// </summary>
    private ICollection<long> _alreadyVisitedIds = new List<long>();

    /// <summary>
    /// Counter
    /// </summary>
    public int _Counter = 0;

    private readonly ActDbContext _dbContext;

    public InteractTreeGrower(
        ActDbContext dbContext,
        InteractTreeSeed seed
    )
    {
        _dbContext = dbContext;
        _seed = seed;
    }


    private void ClearAlreadyVisitedIds()
    {
        _alreadyVisitedIds = new List<long>();
    }

    public ICollection<InteractTreeData> Grow()
    {
        // Create a list of all the nodes that are in the tree
        ClearAlreadyVisitedIds();
        // start with the roots.
        var roots = _seed.Roots;
        List<InteractTreeData> allOffshoots =
            roots.Select(x => InteractTreeData.FromRootInteraction(_Counter++, x)).ToList();
        // loop over roots
        GrowAllChildren(allOffshoots);

        return allOffshoots;
    }

    public void GrowAllChildren(ICollection<InteractTreeData> rootTreeData)
    {
        foreach (var root in rootTreeData)
        {
            void addToRootChildren(InteractTreeData root, InteractTreeData treeData)
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
                    root.Children.Add(treeData);
                    _alreadyVisitedIds.Add(treeData.InteractionId);
                }
            }

            // loop over branches 
            var branchResults = GrowBranches(root.InteractionId, _seed.HasBranches);
            // add branches to root children
            foreach (var branch in branchResults)
            {
                addToRootChildren(root, branch);
            }

            var asBranchResults = GrowAsBranches(root.InteractionId, _seed.AsBranches);
            // add aSbranches to root children
            foreach (var asBranch in asBranchResults)
            {
                addToRootChildren(root, asBranch);
            }

            GrowAllChildren(root.Children);
        }
    }


    public ICollection<InteractTreeData> GrowBranches(long rootInteractionId, ICollection<RelationTypes> branches)
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

        void Grow(RelationTypes relationTypes, IQueryable<Relation?> relations,
            List<InteractTreeData> interactTreeDatas)
        {
            if (relations.Any())
            {
                foreach (var relation in relations)
                {
                    var child = InteractTreeData.FromInteractionRelation(_Counter++, relation.LinkedInteraction,
                        relationTypes);
                    interactTreeDatas.Add(child);
                }
            }
        }

        switch (branchType)
        {
            case RelationTypes.ContextRelation:
                var interactions = _dbContext.ContextRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, interactions, result);
                break;
            case RelationTypes.SubjectRelation:
                var subjectRelations = _dbContext.SubjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, subjectRelations, result);
                break;
            case RelationTypes.FirstActRelation:
                var firstActRelations = _dbContext.FirstActRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, firstActRelations, result);
                break;
            case RelationTypes.ObjectRelation:
                var objectRelations = _dbContext.ObjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, objectRelations, result);

                break;
            case RelationTypes.SecondActRelation:
                var secondActRelations = _dbContext.SecondActRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, secondActRelations, result);
                break;
            case RelationTypes.IndirectObjectRelation:
                var indirectObjectRelations = _dbContext.IndirectObjectRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, indirectObjectRelations, result);
                break;
            case RelationTypes.SettingRelation:
                var settingRelations = _dbContext.SettingRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, settingRelations, result);
                break;
            case RelationTypes.PurposeRelation:
                var purposeRelations = _dbContext.PurposeRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, purposeRelations, result);
                break;
            case RelationTypes.ParallelRelation:
                var parallelRelations = _dbContext.ParallelRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, parallelRelations, result);
                break;
            case RelationTypes.ReferenceRelation:
                var referenceRelations = _dbContext.ReferenceRelations
                    .Include(x => x.LinkedInteraction)
                    .Where(x => x.HostInteractionId == rootInteractionId);
                Grow(branchType, referenceRelations, result);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
        }

        return result;
    }

    private ICollection<InteractTreeData> GrowAsBranch(long genzhuId, AsRelationTypes branchType)
    {
        List<InteractTreeData> result = new List<InteractTreeData>();

        void Grow(AsRelationTypes relationTypes, IQueryable<Interaction?> interactions,
            List<InteractTreeData> interactTreeDatas)
        {
            foreach (var interaction in interactions)
            {
                var child = InteractTreeData.FromInteractionAsRelation(_Counter++, interaction, relationTypes);
                interactTreeDatas.Add(child);
            }
        }

        switch (branchType)
        {
            case AsRelationTypes.AsSubjectRelation:
                var genzhuHasChildren = _dbContext.Interactions
                    .Include(x => x.Subjects)
                    .AsNoTracking()
                    .Where(x => x.Subjects.Any(s => s.LinkedInteractionId == genzhuId));
                Grow(branchType, genzhuHasChildren, result);
                break;
            default:
                // unimplemented
                throw new ArgumentOutOfRangeException(nameof(branchType), branchType, null);
                break;
        }

        ;

        return result;
    }
}