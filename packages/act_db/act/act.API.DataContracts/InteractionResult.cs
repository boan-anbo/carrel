using act.Services.Model;

namespace act.API.DataContracts;

public class InteractionResult
{
    public Interaction Interaction { get; set; }
    public Graph<Relation, Interaction> Graph { get; set; }
    
    public InteractionResult(Interaction interaction)
    {
        Interaction = interaction;
        Graph = Graph<Relation, Interaction>.FromInteraction(interaction);
    }
}