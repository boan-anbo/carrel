using System;
using System.Collections.Generic;
using act.Services.Model;

namespace act.API.DataContracts;

public class Node<NODE_TYPE>
{
    public long Id { get; set; }
    public Guid Uuid { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public string Content { get; set; }
    public NODE_TYPE Data { get; set; }

    public static Node<Interaction> FromInteraction(Interaction interaction)
    {
        return new Node<Interaction>
        {
            Id = interaction.Id,
            Uuid = interaction.Uuid,
            Label = interaction.Label,
            Description = interaction.Description,
            Content = interaction.Content,
            Data = interaction
        };
    }
}

public class Edge<EDGE_TYPE>
{
    public string Id { get; set; }
    public Guid? Uuid { get; set; }

    /// <summary>
    /// Temporary id for the convenience of being used in, e.g., cytoscape.js, as HTML id.
    /// Defaults to 'edge_' + index.
    /// </summary>
    public string DisplayId { get; set; }

    public string Label { get; set; }
    public string Description { get; set; }
    public string Content { get; set; }
    public long Weight { get; set; }
    public EDGE_TYPE Data { get; set; }

    public long SourceId { get; set; }
    public long TargetId { get; set; }

    public static Edge<Relation> FromInteraction(Relation relation)
    {
        return new Edge<Relation>
        {
            Id = relation.Uuid.ToString(),
            Uuid = relation.Uuid,
            Label = relation.Label.Length > 0 ? relation.Label : relation.Type.ToDescriptionString(),
            Description = relation.Description,
            Content = relation.Content,
            Weight = (int)relation.Weight,
            Data = relation,
            SourceId = relation.HostInteractionId,
            TargetId = relation.LinkedInteractionId
        };
    }

    /// <summary>
    /// Set display id by providing the index of the edge in the list.
    ///  </summary>
    public void SetDisplayId(int index)
    {
        DisplayId = "edge_" + index;
    }
}

/// <summary>
/// 
/// </summary>
/// <typeparam name="NODE_TYPE">Node generic type</typeparam>
/// <typeparam name="EDGE_TYPE">Edge generic type</typeparam>
public class Graph<NODE_TYPE, EDGE_TYPE>
{
    public Guid Uuid { get; set; }

    public ICollection<Node<EDGE_TYPE>> Nodes { get; set; }
    public ICollection<Edge<NODE_TYPE>> Edges { get; set; }

    public static Graph<Relation, Interaction> FromInteraction(Interaction hostInteraction)
    {
        var graph = new Graph<Relation, Interaction>
        {
            Uuid = Guid.NewGuid(),
            Nodes = new List<Node<Interaction>>(),
            Edges = new List<Edge<Relation>>()
        };

        // Iterate over all the entities involved in the interaction.
        
        // add the host interaction first.
        graph.Nodes.Add(Node<Interaction>.FromInteraction(hostInteraction));
        
        foreach (var relation in hostInteraction.Subjects)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }
        
        foreach (var relation in hostInteraction.FirstActs)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.Objects)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }
        
        foreach (var relation in hostInteraction.SecondActs)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.Parallels)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.Contexts)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.Settings)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.IndirectObjects)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.Purposes)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        foreach (var relation in hostInteraction.References)
        {
            graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
            graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
        }

        /// interate over edges and set display id
        var index = 0;
        foreach (var edge in graph.Edges)
        {
            edge.SetDisplayId(index);
            index++;
        }

        return graph;
    }
}