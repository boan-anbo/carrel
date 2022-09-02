using System.ComponentModel.DataAnnotations;

namespace act.API.DataContracts
{
    /// <summary>
    /// User datacontract summary to be replaced
    /// </summary>
    public class InteractionDto
    {
        [DataType(DataType.Text)]
        public string Label { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Description { get; set; }


    }
}
