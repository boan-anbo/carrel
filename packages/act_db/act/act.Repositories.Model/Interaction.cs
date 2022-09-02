using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace act.Services.Model
{
    public class Interaction
    {
        [Key()] public int Id { get; set; }
        
        /// <summary>
        /// unique Uuid for double checking
        /// </summary>
        public Guid Uuid { get; set; } = Guid.NewGuid();

        /// <summary>
        /// The label of the interaction. This is freely defined, unlike <see cref="Type"/>. Should be short. If not unique, use <see cref="Description"/>.
        /// </summary>
        ///
        /// <remarks>
        /// E.g. for a person: "Qian Xuesen"
        /// for an event: "19th World Conference on Justice"
        /// for a group: "A tourist group from Japan"
        /// </remarks>
        [Required]
        public string Label { get; set; }

        /// <summary>
        /// Further describe what is not explained by <see cref="Label"/>.
        /// </summary>
        public string Description { get; set; } = String.Empty;
        
        


        /// <inheritdoc cref="InteractionIdentity" />
        public InteractionIdentity Identity { get; set; } = InteractionIdentity.ACT;

        /// <inheritdoc cref="InteractionType"/>
        [Required]
        public InteractionType Type { get; set; }

        public int TypeId { get; set; } = 1;
        
        /// <summary>
        /// Start date of the interaction.
        /// </summary>
        
        public DateTime? Start { get; set; } = DateTime.MinValue;
        
        /// <summary>
        /// End date of the interaction.
        /// </summary>
        public DateTime? End { get; set; } = DateTime.MinValue;
        
        

        /// <summary>
        /// The subject of interaction.
        /// </summary>
        public virtual ICollection<SubjectRelation> Subjects { get; set; }

        /// <summary>
        /// Related interactions for the current interaction.
        /// </summary>
        public virtual ICollection<ParallelRelation> Related { get; set; }
        public virtual ICollection<ObjectRelation> Objects { get; set; }
        
        /// <inheritdoc cref="Property"/>
        public virtual ICollection<Property> Properties { get; set; }

        // TODO the initializer for type.
        public void GetDefaultType(SubjectRelation subject)
        {
            
        }
        
        
        /// <summary>
        /// Set idenity to entity, and type to "to be" (i.e. typeid: 1).
        /// For the most basic operation: Create a new entity interaction.
        /// </summary>
        public void SetEntityIdentityAndType()
        {
            Identity = InteractionIdentity.ENTITY;
            TypeId = 1;
        }
        
        /// <summary>
        /// Factory pattern, from label
        /// </summary>
        public static Interaction FromLabel(string label)
        {
            var interaction = new Interaction {Label = label};
            return interaction;
        }
    }
    
}