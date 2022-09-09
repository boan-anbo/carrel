using act.Services.Model;

namespace InteractGraphLib;

public class InteractTreeData
{
    public string Id { get; set; }

    public ICollection<InteractTreeData> Children { get; set; } = new List<InteractTreeData>();

    public bool isRoot { get; set; } = false;

    /// <summary>
    /// 坐标X
    /// </summary>
    public int? X { get; set; }

    public BranchDirection Direction { get; set; } = BranchDirection.None;

    public int? Y { get; set; }

    public long InteractionId { get; set; }

    public RelationTypes? RelationType { get; set; } = null;

    public AsRelationTypes? AsRelationType { get; set; } = null;

    /// <summary>
    /// 节点当前的状态
    /// </summary>
    public ElementStatus? Status { get; set; }

    public string Label { get; set; } = "Node";
    
    public string? Description { get; set; } = null;
    
    public string? Content { get; set; } = null;

    public static InteractTreeData FromInteractionRelation(int id, Interaction interaction, RelationTypes? relationType)
    {
        return new InteractTreeData
        {
            Id = id.ToString(),
            X = null,
            Y = null,
            InteractionId = interaction.Id,
            RelationType = relationType,
            Status = new ElementStatus(),
            Label = interaction.Label,
            Description = interaction.Description,
            Content = interaction.Content,
            Direction = BranchDirection.FromParent
        };
    }

    public static InteractTreeData FromInteractionAsRelation(int id, Interaction interaction,
        AsRelationTypes? relationType)
    {
        return new InteractTreeData
        {
            Id = id.ToString(),
            X = null,
            Y = null,
            InteractionId = interaction.Id,
            AsRelationType = relationType,
            Status = new ElementStatus(),
            Label = interaction.Label,
            Description = interaction.Description,
            Content = interaction.Content,
            Direction = BranchDirection.ToParent
        };
    }

    public static InteractTreeData FromRootInteraction(int i, Interaction interaction)
    {
        return new InteractTreeData
        {
            Id = i.ToString(),
            X = null,
            Y = null,
            InteractionId = interaction.Id,
            isRoot = true,
            Status = new ElementStatus(),
            Label = interaction.Label,
            Description = interaction.Description,
            Content = interaction.Content
        };
    }
}