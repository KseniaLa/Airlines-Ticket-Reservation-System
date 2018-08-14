using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Language : Entity
    {
        [Required]
        [MaxLength(2)]
        public string Name { get; set; }

    }
}
