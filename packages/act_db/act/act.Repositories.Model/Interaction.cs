using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace act.Services.Model;

/// <summary>
///     This describes the identity of the interaction. Three types identities: Entity (person, etc.), Act (interaction),
///     Source (Source for the interaction).
/// </summary>
/// <remarks>
///     <para>
///         Since the db is act-based and has no identity per se, this is only a convenient helper to identify a specific
///         kind of interaction: for something to exists, which means to claim an identity.
///     </para>
///     <para>
///         So <see cref="InteractionIdentity" />.Entity must be the creation act of the name.
///     </para>
/// </remarks>
public enum InteractionIdentity
{
    ENTITY,
    ACT,
    SOURCE
}

public class Interaction
{
    [Key] public int Id { get; set; }

    /// <summary>
    ///     unique Uuid for double checking
    /// </summary>
    public Guid Uuid { get; set; } = Guid.NewGuid();

    /// <summary>
    ///     The label of the interaction. This is freely defined, unlike <see cref="FirstAct" />. Should be short. If not unique,
    ///     use <see cref="Description" />.
    /// </summary>
    /// <remarks>
    ///     E.g. for a person: "Qian Xuesen"
    ///     for an event: "19th World Conference on Justice"
    ///     for a group: "A tourist group from Japan"
    /// </remarks>
    [Required]
    public string Label { get; set; }

    /// <summary>
    ///     Further describe what is not explained by <see cref="Label" />. This is more like metadata compared to
    ///     <see cref="Content" />.
    /// </summary>
    public string Description { get; set; } = string.Empty;


    /// <summary>
    ///     Convenient way to store the essential information of the interaction.
    ///     E.g. full text for reference.
    /// </summary>
    /// <remarks>
    ///     <para>
    ///         This, like properties, is included for pragmatic purposes, but provides a more stable, and temporary, reference
    ///         than the <see cref="Properties" />.
    ///     </para>
    ///     <para>
    ///     </para>
    /// </remarks>
    public string Content { get; set; } = string.Empty;

    /// <inheritdoc cref="InteractionIdentity" />
    public InteractionIdentity Identity { get; set; } = InteractionIdentity.ACT;

    /// <inheritdoc cref="Act" />
    [Required]
    public FirstAct FirstAct { get; set; }
    public int FirstActId { get; set; } = 1;
    
    public SecondAct? SecondAct { get; set; }
    public int? SecondActId { get; set; }


    /// <summary>
    ///     Start date of the interaction.
    /// </summary>

    public DateTime? Start { get; set; } = DateTime.MinValue;

    /// <summary>
    ///     End date of the interaction.
    /// </summary>
    public DateTime? End { get; set; } = DateTime.MinValue;


    /// <inheritdoc cref="Relation" />
    public virtual ICollection<ContextRelation> Contexts { get; set; } = new List<ContextRelation>();
    /// as contexts
    public virtual ICollection<ContextRelation> AsContexts { get; set; } = new List<ContextRelation>();  


    /// <inheritdoc cref="SubjectRelation" />
    public virtual ICollection<SubjectRelation> Subjects { get; set; } = new List<SubjectRelation>();
    
    /// as subject
    public virtual ICollection<SubjectRelation> AsSubjects { get; set; } = new List<SubjectRelation>();
    

    /// <inheritdoc cref="ParallelRelation" />
    public virtual ICollection<ParallelRelation> Parallels { get; set; } = new List<ParallelRelation>();
    /// as parallel
    public virtual ICollection<ParallelRelation> AsParallels { get; set; } = new List<ParallelRelation>();

    /// <inheritdoc cref="SubjectRelation" />
    public virtual ICollection<ObjectRelation> Objects { get; set; } = new List<ObjectRelation>();
    /// as object
    public virtual ICollection<ObjectRelation> AsObjects { get; set; } = new List<ObjectRelation>();

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<SettingRelation> Settings { get; set; } = new List<SettingRelation>();
    /// as setting
    public virtual ICollection<SettingRelation> AsSettings { get; set; } = new List<SettingRelation>();

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<PurposeRelation> Purposes { get; set; } = new List<PurposeRelation>();
    /// as purpose
    public virtual ICollection<PurposeRelation> AsPurposes { get; set; } = new List<PurposeRelation>();

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<IndirectObjectRelation> IndirectObjects { get; set; } =
        new List<IndirectObjectRelation>();
    /// as indirect object
    public virtual ICollection<IndirectObjectRelation> AsIndirectObjects { get; set; } =
        new List<IndirectObjectRelation>();

    /// <inheritdoc cref="ReferenceRelation" />
    public virtual ICollection<ReferenceRelation> References { get; set; }   = new List<ReferenceRelation>();
    /// as reference
    public virtual ICollection<ReferenceRelation> AsReferences { get; set; } = new List<ReferenceRelation>();

    /// <inheritdoc cref="Property" />
    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();


    /// <summary>
    ///     Set idenity to entity, and type to "to be" (i.e. typeid: 1).
    ///     For the most basic operation: Create a new entity interaction.
    /// </summary>
    public void SetEntityIdentityAndType()
    {
        Identity = InteractionIdentity.ENTITY;
        FirstActId = 1;
    }

    /// <summary>
    ///     Factory pattern, from label
    /// </summary>
    public static Interaction FromLabel(string label)
    {
        var interaction = new Interaction { Label = label };
        return interaction;
    }
}