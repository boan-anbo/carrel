﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace act.Services.Model;

/// <summary>
/// </summary>
public enum RelationTypes
{
    ContextRelation,
    SubjectRelation,
    ObjectRelation,
    IndirectObjectRelation,
    SettingRelation,
    PurposeRelation,
    ParallelRelation,
    ReferenceRelation
}

/// <summary>
///     Represents the weight of a relation between two interactions.
/// </summary>
/// <remarks>
///     Practically, this is used to decide whether to load a certain relation or not when user can specify the threshold
///     for loading relations.
/// </remarks>
public enum RelationWeight
{
    /// <summary>
    ///     Extreme option, only use intentionally to a relation that is always loaded
    /// </summary>
    Must,
    MostImportant,
    VeryImportant,
    Important,
    SomewhatImportant,

    /// <summary>
    ///     Default option.
    /// </summary>
    NotImportant,

    /// <summary>
    ///     Extreme option, only use intentionally to hide a relation that never appears on any graph.
    /// </summary>
    Never
}

/// <summary>
///     The relations links an interaction with its subject interactions (usually entities).
/// </summary>
/// <remarks>
///     <para>
///         Host <see cref="Interaction" /> = Because the country was building a new China, Qian Xuesen and Xu Guozhi
///         established the first OR office in China for cybernetics research and economic planning, in order to contribute
///         to economics.
///     </para>
///     ===
///     <para>
///         Setting <see cref="Interaction" /> with <see cref="SettingRelation" /> 1 = the country was building a new China
///     </para>
///     <para>
///         Subject <see cref="Interaction" /> with <see cref="SubjectRelation" /> 1 = Qian Xuesen (which is defined as an
///         interaction with the label of Qian Xuesen who has the type of interaction of to be)
///     </para>
///     <para>
///         Subject <see cref="Interaction" /> with <see cref="SubjectRelation" /> 2 = Xu Guozhi
///     </para>
///     <para>
///         (Direct) object <see cref="Interaction" /> with  <see cref="ObjectRelation" /> 1 = OR office
///     </para>
///     <para>
///         Indirect object <see cref="Interaction" /> with <see cref="IndirectObjectRelation" /> 1 = cybernetics
///     </para>
///     <para>
///         Indirect object <see cref="Interaction" /> with <see cref="IndirectObjectRelation" /> 2 = economic planning
///     </para>
///     <para>
///         Setting <see cref="Interaction" /> with  <see cref="SettingRelation" /> 1 = China
///     </para>
///     <para>
///         Purpose <see cref="Interaction" /> with  <see cref="PurposeRelation" /> 1 = economic contribution
///     </para>
///     <para>
///         ===
///     </para>
///     <para>
///         Reference <see cref="Interaction" /> with <see cref="ReferenceRelation" /> 1 = usually not part of the content
///         but supporting sources. See <see cref="ReferenceRelation" />
///     </para>
///     <para>
///         Parallel <see cref="Interaction" /> with <see cref="ParallelRelation" /> 1 = another interaction that is
///         related to this.
///     </para>
/// </remarks>
public abstract class Relation
{
    /// constrcutor
    /// Id primary key
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    ///     Unique identifier for the relation.
    /// </summary>
    public Guid Uuid { get; set; } = Guid.NewGuid();

    /// <summary>
    ///     Label of the relation, unlike, Label on <see cref="Interaction" /> is optional, because its position, e.g. as
    ///     subject relation is already self-explanatory to certain extent. When this is not enough, use
    ///     <see cref="Description" />, or <see cref="Content" /> to progressively describe the relation.
    /// </summary>
    public string Label { get; set; } = string.Empty;

    /// <summary>
    ///     Meta description of the relation.
    /// </summary>
    /// <remarks>
    ///     For instance, when someone is marked having a very important relation to as the subject of an interaction, it's
    ///     worth noting why is that, e.g. Qian played a leading role in first proposing the idea will be a good description of
    ///     a important subject relation.
    /// </remarks>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    ///     Further describe what is not explained by <see cref="Label" />. This is more like metadata compared to
    ///     <see cref="Content" />.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    public RelationTypes Type { get; set; }

    /// <summary>
    ///     The weight of the relation, determines whether the relation should be loaded.
    /// </summary>
    public RelationWeight Weight { get; set; } = RelationWeight.NotImportant;

    /// <summary>
    ///     The A of the A-B relation
    /// </summary>
    public virtual Interaction HostInteraction { get; set; }

    public int HostInteractionId { get; set; }

    /// <summary>
    ///     The B of the A-B relation. Usually only this side is loaded because it's usually loaded as part of the A entity.
    /// </summary>
    public virtual Interaction LinkedInteraction { get; set; }

    public int LinkedInteractionId { get; set; }

    public static T Create<T>(
        int Id, Guid uuid,
        int hostInteractionId, 
        int linkedInteractionId, 
        RelationTypes type, 
        string label,
        string description, 
        string content, 
        RelationWeight weight
        ) where T : Relation, new()
    {
        var relation = new T
        {
            Id = Id,
            Uuid = uuid,
            HostInteractionId = hostInteractionId,
            LinkedInteractionId = linkedInteractionId,
            Type = type,
            Label = label,
            Description = description,
            Content = content,
            Weight = weight
        };
        return relation;
    }
}

/// <summary>
///     Direct object relation.
/// </summary>
public class ObjectRelation : Relation
{
}

/// <summary>
///     Describe an relation between sources and an interaction.
/// </summary>
/// <remarks>
///     <para>
///         Common sources are books, articles, websites, etc.
///     </para>
/// </remarks>
public class ReferenceRelation : Relation
{
}

/// <summary>
///     Describe the spatial or temporal setting of the host interaction.
/// </summary>
/// <remarks>
///     <para>
///         Setting interaction is the C in "A does B in C".
///     </para>
///     <para>
///         The first snow festival starts in 1930 in Harbin: Harbin is the interaction entity with setting relation to the
///         first snow festival starts---the host interaction.
///     </para>
/// </remarks>
public class SettingRelation : Relation
{
}

/// <summary>
///     The subject and object relations links an interaction with its subject iteractions (usually entities).
/// </summary>
/// <remarks>
///     <para>
///         For example:
///     </para>
///     <para>
///         Host interaction = Qian Xuesen and Xu Guozhi established the first OR office in China.
///     </para>
///     <para>
///         Subject interaction 1 = Qian Xuesen (which is defined as an interaction with the label of Qian Xuesen who has
///         the type of interaction of to be)
///     </para>
///     <para>
///         Subject interaction 2 = Xu Guozhi
///     </para>
///     <para>
///         Object interaction 1 = OR office
///     </para>
///     <para>
///         Setting interaction 1 = China
///     </para>
/// </remarks>
public class SubjectRelation : Relation
{
}

/// <summary>
///     Describe the result or purpose
/// </summary>
public class PurposeRelation : Relation
{
}

/// <summary>
///     To describe a parallel relations between the host interaction and its related interactions.
/// </summary>
/// <remarks>
///     <para>
///         An example of parallel relation is the relationship between the beginning and finishing act of something, e.g.
///         "A begins working on B" has as its parallel interactions "A finishes working on B".
///     </para>
///     <para>
///         In each interactions, A has the subject relation, and B has the object relation.
///     </para>
/// </remarks>
public class ParallelRelation : Relation
{
}

/// <summary>
///     Causes or larger contexts that explains the background of the host interaction.
/// </summary>
public class ContextRelation : Relation

{
}

/// <summary>
///     Equivalent as indirect object in language syntax. In practice, use this relation to describe the more objects not
///     covered by direct <see cref="ObjectRelation" />. See <see cref="Relation" /> for more details.
/// </summary>
public class IndirectObjectRelation : Relation
{
}