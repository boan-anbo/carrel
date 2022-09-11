using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace act.Services.Model;

/// <summary>
///     This describes the *FLUID* identity of the interaction. Three types identities: Entity (person, etc.), Act (interaction),
///     Source (Source for the interaction).
/// 
/// </summary>
/// <remarks>
/// <para>
/// Fluidity is central to this property: it's only a suggestion, because any of these categories can and should be used interchangeably. E.g. a book can be a reference and an entity.
/// </para>
/// <para>
/// An act such as "to kill" can be both an entity when used in a sentence like "to kill is not good", or as a verb, "She kills him". 
/// </para>
///     <para>
///         Since the db is act-based and has no identity per se, this is only a convenient helper to identify a specific
///         kind of interaction: for something to exists, which means to claim an identity.
///     </para>
/// <para>
/// This is most useful to help, for example, limiting search scope: when you only wants what is usually used a acts. This could potentially be substituted by "as" properties.
/// </para>
/// <para>
/// TODO: add count properties of as the acts, entities, sources, etc. And use the count as a measure for the likelihood some interaction, such as to kill, is USUALLY used as an act.
/// </para>
///     <para>
///         So <see cref="InteractionIdentity" />.Entity must be the creation act of the name.
///     </para>
/// </remarks>
public enum InteractionIdentity
{
    ACT,
    ENTITY,
    INTERACTION,
    SOURCE,
    Category
}

public class Interaction
{
    public Interaction()
    {
    }

    /// <summary>
    /// Primary key
    /// </summary>
    [Key]
    public long Id { get; set; }

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
    [MaxLength(25)]
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

    /// <summary>
    /// A generated sentence basaed on the current relations
    /// </summary>
    public string Sentence { get; set; } = string.Empty;

    /// <inheritdoc cref="InteractionIdentity" />
    public InteractionIdentity Identity { get; set; } = InteractionIdentity.INTERACTION;


    /// <summary>
    ///     Start date of the interaction.
    /// </summary>

    public DateTime? Start { get; set; } = null;

    /// <summary>
    ///     End date of the interaction.
    /// </summary>
    public DateTime? End { get; set; } = null;

    /// <summary>
    /// Created
    /// </summary>
    public DateTime Created { get; set; } = DateTime.Now;

    /// <summary>
    /// Modified
    ///  </summary>
    public DateTime Modified { get; set; } = DateTime.Now;

    /// <summary>
    /// A general field for data objects such as file or photo.
    ///     </summary>
    public string? Data { get; set; } = null;


    /// <inheritdoc cref="Relation" />
    public virtual ICollection<ContextRelation> Contexts { get; set; } = new List<ContextRelation>();

    // Entity framework computed field. Count of contexts. With setter.
    public long ContextsCount
    {
        get => Contexts.Count;
        set {}
    }

    /// as contexts
    public virtual ICollection<ContextRelation> AsContexts { get; set; } = new List<ContextRelation>();

    // computed field of number of times the interaction is used AS first act in the DB. Should hold large number of first acts.
    public long AsContextsCount 
    {
        get => AsContexts.Count;
        set {}
    }

    /// <inheritdoc cref="Act"/>
    public virtual ICollection<FirstActRelation> FirstActs { get; set; } = new List<FirstActRelation>();
    
    public long FirstActsCount 
    {
        get => FirstActs.Count;
        set {}
    }

    // as first acts
    public virtual ICollection<FirstActRelation> AsFirstActs { get; set; } = new List<FirstActRelation>();
    
    // computed field of number of times the interaction is used AS first act in the DB. Should hold large number of first acts.
    public long AsFirstActsCount 
    {
        // get count from db
        get => AsFirstActs.Count;
        set {}
    }

    /// Link to Act: <see cref="Act"/>
    /// <inheritdoc cref="Act"/> 
    public virtual ICollection<SecondActRelation> SecondActs { get; set; } = new List<SecondActRelation>();
    
    public long SecondActsCount {
        get => SecondActs.Count;
        set {}
    }
     

    // as second acts
    public virtual ICollection<SecondActRelation> AsSecondActs { get; set; } = new List<SecondActRelation>();
        
    public long AsSecondActsCount {
        get => AsSecondActs.Count;
        set {}
    }

    
    /// <inheritdoc cref="SubjectRelation" />
    public virtual ICollection<SubjectRelation> Subjects { get; set; } = new List<SubjectRelation>();
    
    public long SubjectsCount {
        get => Subjects.Count;
        set {}
    }
    

    /// as subject
    public virtual ICollection<SubjectRelation> AsSubjects { get; set; } = new List<SubjectRelation>();

    public long AsSubjectsCount {
        get => AsSubjects.Count;
        set {}
    }

    /// <inheritdoc cref="ParallelRelation" />
    public virtual ICollection<ParallelRelation> Parallels { get; set; } = new List<ParallelRelation>();
     
    public long ParallelsCount {
        get => Parallels.Count;
        set {}
    }

    /// as parallel
    public virtual ICollection<ParallelRelation> AsParallels { get; set; } = new List<ParallelRelation>();
    
    public long AsParallelsCount {
        get => AsParallels.Count;
        set {}
    }

    /// <inheritdoc cref="SubjectRelation" />
    public virtual ICollection<ObjectRelation> Objects { get; set; } = new List<ObjectRelation>();
    
    public long ObjectsCount {
        get => Objects.Count;
        set {}
    }

    /// as object
    public virtual ICollection<ObjectRelation> AsObjects { get; set; } = new List<ObjectRelation>();
    
    public long AsObjectsCount {
        get => AsObjects.Count;
        set {}
    }

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<SettingRelation> Settings { get; set; } = new List<SettingRelation>();
    
    public long SettingsCount   {
        get => Settings.Count;
        set {}
    }

    /// as setting
    public virtual ICollection<SettingRelation> AsSettings { get; set; } = new List<SettingRelation>();
    
    public long AsSettingsCount     {
        get => AsSettings.Count;
        set {}
    }

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<PurposeRelation> Purposes { get; set; } = new List<PurposeRelation>();
    
    public long PurposesCount {
        get => Purposes.Count;
        set {}
    }

    /// as purpose
    public virtual ICollection<PurposeRelation> AsPurposes { get; set; } = new List<PurposeRelation>();
    
    public long AsPurposesCount {
        get => AsPurposes.Count;
        set {}
    }

    /// <inheritdoc cref="SettingRelation" />
    public virtual ICollection<IndirectObjectRelation> IndirectObjects { get; set; } =
        new List<IndirectObjectRelation>();
    
    public long IndirectObjectsCount {
        get => IndirectObjects.Count;
        set {}
    }

    /// as indirect object
    public virtual ICollection<IndirectObjectRelation> AsIndirectObjects { get; set; } =
        new List<IndirectObjectRelation>();
    
    public long AsIndirectObjectsCount {
        get => AsIndirectObjects.Count;
        set {}
    }

    /// <inheritdoc cref="ReferenceRelation" />
    public virtual ICollection<ReferenceRelation> References { get; set; } = new List<ReferenceRelation>();
    
    public long ReferencesCount {
        get => References.Count;
        set {}
    }

    /// as reference
    public virtual ICollection<ReferenceRelation> AsReferences { get; set; } = new List<ReferenceRelation>();
    
    public long AsReferencesCount   {
        get => AsReferences.Count;
        set {}
    }
    
    // category
    public virtual ICollection<CategoryRelation> Categories { get; set; } = new List<CategoryRelation>();
    
    public long CategoriesCount {
        get => Categories.Count;
        set {}
    }
    
    // as category
    
    public virtual ICollection<CategoryRelation> AsCategories { get; set; } = new List<CategoryRelation>();
    
    public long AsCategoriesCount {
        get => AsCategories.Count;
        set {}
    }
        

    /// <inheritdoc cref="Property" />
    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
    
    public long PropertiesCount {
        get => Properties.Count;
        set {}
    }


    /// <summary>
    ///     Set idenity to entity, and type to "to be" (i.e. typeid: 1).
    ///     For the most basic operation: Create a new entity interaction.
    /// </summary>
    public void SetEntityIdentityAndType()
    {
        Identity = InteractionIdentity.ENTITY;
    }

    /// <summary>
    ///     Factory pattern, from label
    /// </summary>
    public static Interaction FromLabel(string label)
    {
        var interaction = new Interaction { Label = label };
        return interaction;
    }
    
    /// <summary>
    ///  Factory pattern from label and identiy
    ///  </summary>
    public static Interaction FromLabelAndIdentity(string label, InteractionIdentity identity)
    {
        var interaction = new Interaction { Label = label, Identity = identity };
        return interaction;
    }

    /// <summary>
    /// Update sentence based on current entities and relations
    ///  </summary>
    public void UpdateSentence()
    {
        var sb = new StringBuilder();
        var contexts = this.Contexts.Select(s => s.LinkedInteraction.Label).ToList();
        var subjects = this.Subjects.Select(s => s.LinkedInteraction.Label).ToList();
        var firstActs = this.FirstActs.Select(s => s.LinkedInteraction.Label).ToList();
        var objects = this.Objects.Select(s => s.LinkedInteraction.Label).ToList();
        var secondActs = this.SecondActs.Select(s => s.LinkedInteraction.Label).ToList();
        var indirectObjects = this.IndirectObjects.Select(s => s.LinkedInteraction.Label).ToList();
        var settings = this.Settings.Select(s => s.LinkedInteraction.Label).ToList();
        var purposes = this.Purposes.Select(s => s.LinkedInteraction.Label).ToList();
        var parallels = this.Parallels.Select(s => s.LinkedInteraction.Label).ToList();
        var references = this.References.Select(s => s.LinkedInteraction.Label).ToList();

        if (contexts.Any())
        {
            sb.Append("In the context(s) of");
            // for each loop with index
            foreach (var (label, index) in contexts.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, contexts.Count - 1);
            }
        }

        if (subjects.Any())
        {
            // for each loop with index
            foreach (var (label, index) in subjects.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, subjects.Count - 1);
            }
        }

        if (objects.Any())
        {
            // for each loop with index
            foreach (var (label, index) in objects.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, objects.Count - 1);
            }
        }
        
        if (firstActs.Any())
        {
            // for each loop with index
            foreach (var (label, index) in firstActs.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, firstActs.Count - 1);
            }
        }

        if (settings.Any())
        {
            if (sb.Length > 0)
            {
                sb.Append(' ');
                sb.Append("in the setting(s) of");
            }

            // for each loop with index
            foreach (var (label, index) in settings.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, settings.Count - 1);
            }
        }


        Sentence = sb.ToString().Trim();
    }

    private static StringBuilder SentenceClauseBuilder(int index, StringBuilder sb, string label, int lastIndex)
    {
        if (index > 1)
        {
            sb.Append(',');
        }

        // if it's the last index
        if (index > 0 && index == lastIndex)
        {
            sb.Append(" and");
        }

        sb.Append(' ');
        sb.Append(label);
        return sb;
    }
}