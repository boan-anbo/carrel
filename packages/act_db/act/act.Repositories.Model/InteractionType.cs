using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace act.Services.Model
{
    /// <summary>
    /// The nature of the interaction
    /// </summary>
    /// <remarks>
    /// <para>
    /// The DB is act-based, so there is no 'entities'.
    /// Instead, an entity is defined as a act of existence just like any other interactions.
    /// </para>
    /// <para>
    /// The foundational act of is "to be", i.e. our way of saying "to have the identity of".
    /// </para>
    /// <para>
    /// A typical interaction is Interaction A, as the subject, is the parent of Interaction B, as the object.
    /// </para>
    /// </remarks>
    public class InteractionType
    {
        [Key()] public int Id { get; set; }

        public Guid Guid { get; set; } = Guid.NewGuid();

        /// <summary>
        /// The nature of the interaction type.
        /// </summary>
        /// <remarks>
        /// <para>This can be static relation name, such as Interaction A is the parent of Interaction B, then the name: "is the parent of"
        /// </para>
        /// <para>
        /// However, a better name is "mothers", "fathers", or "gives birth to", which is an act, rather than a description of relationship.
        /// </para>
        /// <para>
        /// This has many advantages, one of which is it is easy to date, e.g. "A started to work on B", and "A finished B" can be easily distinguishable can each have a different date and are linked together through the related relations.
        /// </para>
        /// <para>
        /// Another is it is usually most descriptive of the nature of the relationship. 
        /// </para>
        /// </remarks>
        public string Label { get; set; }

        /// <summary>
        /// When the name is not descriptive enough for grasp nature of the interaction, this is the description to spell out what is meant by the name.
        /// </summary>
        public string Description { get; set; }


        /// <summary>
        /// Interactions of this type.
        /// </summary>
        public virtual ICollection<Interaction> Interactions { get; set; }
    }
    
}