using act.Services.Model;
using Microsoft.Extensions.Options;

namespace InteractGraphLib;

public class InteractTreeSeed
{
    public bool Validate()
    {
        if (Option == null)
        {
            throw new InteractTreeSeedInvalidException("Option is null");
        }

        if (Option.MaxBranches == null)
        {
            throw new InteractTreeSeedInvalidException("Option.MaxBranches is null");
        }

        if (Branches == null)
        {
            throw new InteractTreeSeedInvalidException("Branches is null");
        }

        if (Branches.HasBranches == null)
        {
            throw new InteractTreeSeedInvalidException("Branches.HasBranches is null");
        }
        
        if (Branches.AsBranches == null)
        {
            throw new InteractTreeSeedInvalidException("Branches.AsBranches is null");
        }
        

        return true;
    }

    public InteractTreeSeed(Branches branches)
    {
        Branches = branches;
        Validate();
    }

    public InteractTreeSeed(Branches branches, InteractionTreeOpt option)
    {
        Branches = branches;
        Option = new InteractionTreeOpt
        {
            MaxDepth = option.MaxDepth ?? default,
            MaxBranches = option.MaxDepth ?? default,
        };

        Validate();
    }

    public InteractionTreeOpt Option { get; set; } = new InteractionTreeOpt();


    public Branches Branches { get; set; } = new Branches();

    /// <summary>
    /// If there are any has or as branches, then this will be true
    /// </summary>
    /// <returns></returns>
    public bool HasAnyBranches()
    {
        return Branches.HasBranches.Any() || Branches.AsBranches.Any();
    }

    /// <summary>
    /// Populate branches with all relations
    /// </summary>
    public void PopulateBranches()
    {
        if (!HasAnyBranches())
        {
            // add All RelationTypes to HasBranches
            Branches.HasBranches = Enum.GetValues(typeof(RelationTypes)).Cast<RelationTypes>().ToList();
            Branches.AsBranches = Enum.GetValues(typeof(AsRelationTypes)).Cast<AsRelationTypes>().ToList();
        }
    }
}

public class Branches
{
    // the starting points of the tree
    public long[] Roots { get; set; } = new long[] { };

    /// <summary>
    /// The <see cref="AsRelationTypes"/> to traverse.
    /// </summary>
    public ICollection<AsRelationTypes>? AsBranches { get; set; } = new List<AsRelationTypes>();

    /// <summary>
    /// The <see cref="RelationTypes"/> to traverse.
    ///  </summary>
    public ICollection<RelationTypes>? HasBranches { get; set; } = new List<RelationTypes>();

    /// <summary>
    /// The kinds of nodes of branches to grow/filter. Defaults to any branchs.
    /// </summary>
    /// <remarks>
    /// <para>
    /// A has two interactions associated with it:
    /// </para>
    ///
    /// <para>
    /// the first associated interaction B (which is decided by the <see cref="AsBranches"/> and <see cref="HasBranches"/>) has the <see cref="FirstActRelation"/> of D (e.g. has the children of).</para> 
    /// <para>
    /// the second associated interactions has the first act of B (e.g. has lived in).
    /// </para>
    /// <para>
    /// In this case, if we are only interested in those associated interactions with the first act D (has the children of), then we can specify them in <see cref="BranchFilterNodes"/>. Then it will ignore those associations with the first act of B (has lived in).
    /// </para>
    /// </remarks>
    public ICollection<Interaction>? BranchFilterNodes { get; set; } = new List<Interaction>();
}

/// <summary>
/// An interaction grow/filter with lookahead depth.
/// </summary>
public class BranchFilterNode
{
    /// <summary>
    /// The id of an interaction to grow/filter.
    /// </summary>
    public long FilterNodeId { get; set; }

    /// <summary>
    /// How many layers of interactions to look ahead for. E.g. 1 means only looking for the immediate neighboring interactions, and 2 means looking for the interactions of the immediate neighboring interactions. Defaults to 3.
    /// </summary>
    public int? LookAheadDepth { get; set; } = 3;
}

public class InteractionTreeOpt
{
    public int? MaxDepth { get; set; } = null;

    /// <summary>
    /// Max number of nodes to generate
    /// </summary>
    public int? MaxBranches { get; set; } = 2046;
}

// seed invalid exception
public class InteractTreeSeedInvalidException : Exception
{
    public InteractTreeSeedInvalidException(string message) : base(message)
    {
        Console.WriteLine(message);
    }
}