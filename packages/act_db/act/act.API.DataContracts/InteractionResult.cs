using act.Services.Model;

namespace act.API.DataContracts;

public enum InteractionResultType
{
    /// <summary>
    /// Only the essential interaction properties are returned.
    /// </summary>
    ScalarInteraction,

    /// <summary>
    /// With owned relations, i.e. relations that are actively linked to it. 
    /// </summary>
    /// <remarks>
    /// <para>
    /// E.g. Interaction(A likes B) has a relation to SubjectRelation("A") and ObjectRelation("B") returned.
    /// </para>
    /// </remarks>
    FullInteraction,

    /// <summary>
    ///  With owned relations and all reverse relations that are linked to it.
    ///  </summary>
    ///  <remarks>
    /// <para>
    /// E.g. Interaction(A) has the SubjectRelation("A"), which is added when another interactions, Interaction(A likes B) was created, returned even though itself has no owning relations. such as A is a girl.
    /// </para>
    /// <para>
    ///  This is the most expensive option.
    /// </para>
    /// </remarks>
    FullInteractionWithAllRelations
}

public class InteractionResult
{
    public InteractionResultType ResultType { get; set; } = InteractionResultType.ScalarInteraction;
    public Interaction Interaction { get; set; }
    public Graph<Relation, Interaction> Graph { get; set; }

    public InteractionResult(Interaction interaction, InteractionResultType interactionResultType)
    {
        ResultType = interactionResultType;
        Interaction = interaction;
        Graph = Graph<Relation, Interaction>.FromInteraction(interaction);
    }
}