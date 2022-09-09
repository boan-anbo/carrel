using act.Services.Model;

namespace InteractGraphLib;

public class InteractTreeSeed
{
    public InteractTreeSeed(ICollection<Interaction> roots, ICollection<RelationTypes> hasBranches,
        ICollection<AsRelationTypes> asBranches, InteractionTreeOpt opt)
    {
        Roots = roots;
        HasBranches = hasBranches;
        AsBranches = asBranches;
        MaxDepth = opt.MaxDepth ?? 0;
        MaxBranches = opt.MaxBranches ?? 2046;
    }
    public InteractTreeSeed(ICollection<Interaction> roots, ICollection<RelationTypes> hasBranches,
        ICollection<AsRelationTypes> asBranches)
    {
        Roots = roots;
        HasBranches = hasBranches;
        AsBranches = asBranches;
    }

    public ICollection<AsRelationTypes> AsBranches { get; set; }

    // the starting points of the tree
    public ICollection<Interaction> Roots { get; set; } = new List<Interaction>();

    // the maximum depth of the tree
    public int MaxDepth { get; set; } = 3;

    // specific branches to grow
    public ICollection<RelationTypes> HasBranches { get; set; } = new List<RelationTypes>();

    // the maximum number of nodes to grow
    public int? MaxBranches { get; set; } = null;
}

public class InteractionTreeOpt
{
    public int? MaxDepth { get; set; } = null;
    public int? MaxBranches { get; set; } = null;
}