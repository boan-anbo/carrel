using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace act.Services.Model
{
    public class Relation
    {
        [Key]
        public int Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        
        /// <summary>
        /// The weight of the relation, determines whether the relation should be loaded.
        /// </summary>
        public int Weight { get; set; } = 0;
        
        public virtual Interaction HostInteraction { get; set; }
        public int HostInteractionId { get; set; }
        public virtual Interaction LinkedInteraction { get; set; }
        public int LinkedInteractionId { get; set; }
    }
}
