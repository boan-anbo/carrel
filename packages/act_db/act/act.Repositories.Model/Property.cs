using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace act.Services.Model
{
    /// <summary>
    /// Key/value pair attribute of an interaction.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Ideally, there should be no properties on interaction, because all properties are translatable to interactions, e.g. "name" can be "has the name of".
    /// </para>
    /// <para>
    /// Practically, it's convenient to build data incrementally, and use properties until the property became important enough to warrant a dedicated interaction.
    /// </para>
    /// <para>
    /// E.g. use "highest position" to store a person's highest position in an organization. 
    ///
    /// </para>
    /// <para>
    /// Later, if this person turns out to be important, and it's worthwhile to detail his career.
    /// </para>
    /// <para>
    /// We can change this to an interaction, e.g. in 1957, Person (Interaction::Person) A attained the position of B (Interaction::Position).
    /// </para>
    /// </remarks>
    public class Property
    {
        [Key()] public int Id { get; set; }

        public Guid Guid { get; set; } = Guid.NewGuid();

        public string Key { get; set; }

        public string Value { get; set; }


        public Interaction Interaction { get; set; }
        public int InteractionId { get; set; }
    }
}