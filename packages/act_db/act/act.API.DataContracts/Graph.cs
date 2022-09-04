using System;
using System.Collections.Generic;
using act.Services.Model;

namespace act.API.DataContracts;

public class Node<NODE_TYPE>
{
    public int Id { get; set; }
    public Guid Uuid { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public string Content { get; set; } 
    public NODE_TYPE Data { get; set; }
    
    public static  Node<Interaction> FromInteraction(Interaction interaction)
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
    public int Id { get; set; }
    public Guid Uuid { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public string Content { get; set; }
    public int Weight { get; set; }
    public EDGE_TYPE Data { get; set; }
    
    public int SourceId { get; set; }
    public int TargetId { get; set; }
    
    public static Edge<Relation> FromInteraction(Relation relation)
    {
        return new Edge<Relation>
        {
            Id = relation.Id,
            Uuid = relation.Uuid,
            Label = relation.Label,
            Description = relation.Description,
            Content = relation.Content,
            Weight = (int)relation.Weight,
            Data = relation,
            SourceId = relation.HostInteractionId,
            TargetId = relation.LinkedInteractionId
        };
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
         
            graph.Nodes.Add(Node<Interaction>.FromInteraction(hostInteraction));
            foreach (var relation in hostInteraction.Subjects)
            {
                graph.Edges.Add(Edge<Relation>.FromInteraction(relation));
                graph.Nodes.Add(Node<Interaction>.FromInteraction(relation.LinkedInteraction));
            }
            
            foreach (var relation in hostInteraction.Objects)
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
         
         return graph;
    }
    
}