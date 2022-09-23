using act.Services.Model;

namespace InteractGraphLib;

public abstract class InteractTreeData
{
    public string Id { get; set; }

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
}

public partial class InteractTreeDataRecursive : InteractTreeData
{
    public ICollection<InteractTreeDataRecursive> Children { get; set; } = new List<InteractTreeDataRecursive>();

    public static InteractTreeDataRecursive FromInteractionRelation(int id, Interaction interaction,
        RelationTypes? relationType)
    {
        return new InteractTreeDataRecursive
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

    public static InteractTreeDataRecursive FromInteractionAsRelation(int id, Interaction interaction,
        AsRelationTypes? relationType)
    {
        return new InteractTreeDataRecursive
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

    public static InteractTreeDataRecursive FromRootInteraction(int i, Interaction interaction)
    {
        return new InteractTreeDataRecursive
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

public class InteractTreeDataFlatChild : InteractTreeData
{
    public string? ParentId { get; set; }

    public static InteractTreeDataFlatChild FromInteractTreeDataRecursive(
        InteractTreeDataRecursive interactTreeDataRecursive, string parentId)
    {
        return new InteractTreeDataFlatChild
        {
            Id = interactTreeDataRecursive.Id,
            X = interactTreeDataRecursive.X,
            Y = interactTreeDataRecursive.Y,
            InteractionId = interactTreeDataRecursive.InteractionId,
            RelationType = interactTreeDataRecursive.RelationType,
            AsRelationType = interactTreeDataRecursive.AsRelationType,
            Status = interactTreeDataRecursive.Status,
            Label = interactTreeDataRecursive.Label,
            Description = interactTreeDataRecursive.Description,
            Content = interactTreeDataRecursive.Content,
            Direction = interactTreeDataRecursive.Direction,
            ParentId = parentId
        };
    }
}

public class InteractTreeDataFlat : InteractTreeData
{
    // similar to InteractTreeDataRecursive but without the Children property

    public ICollection<InteractTreeDataFlatChild> Children { get; set; } = new List<InteractTreeDataFlatChild>();

    // children count
    public int ChildrenCount { get; set; }

    public static ICollection<InteractTreeDataFlat> FromInteractTreeDataRecursive(
        ICollection<InteractTreeDataRecursive> interactTreeDataRecursives)
    {
        // convert interactTreeDataRecursives to InteractTreeDataFlat recursively

        var roots = new List<InteractTreeDataFlat>();

        foreach (var interactTreeDataRecursive in interactTreeDataRecursives)
        {
            var root = new InteractTreeDataFlat
            {
                Id = interactTreeDataRecursive.Id,
                X = interactTreeDataRecursive.X,
                Y = interactTreeDataRecursive.Y,
                InteractionId = interactTreeDataRecursive.InteractionId,
                RelationType = interactTreeDataRecursive.RelationType,
                AsRelationType = interactTreeDataRecursive.AsRelationType,
                Status = interactTreeDataRecursive.Status,
                Label = interactTreeDataRecursive.Label,
                Description = interactTreeDataRecursive.Description,
                Content = interactTreeDataRecursive.Content,
                Direction = interactTreeDataRecursive.Direction,
            };

            if (interactTreeDataRecursive.isRoot)
            {
                root.isRoot = true;
            }

            // recursively convert children

            // inner recursive function
            void ConvertChildren(ICollection<InteractTreeDataRecursive> children, string parentId)
            {
                foreach (var child in children)
                {
                    var flatChild = InteractTreeDataFlatChild.FromInteractTreeDataRecursive(child, parentId);
                    root.Children.Add(flatChild);
                    ConvertChildren(child.Children, child.Id);
                }
            }

            ConvertChildren(interactTreeDataRecursive.Children, interactTreeDataRecursive.Id);

            root.ChildrenCount = root.Children.Count;

            roots.Add(root);
        }



        return roots;
    }

}
