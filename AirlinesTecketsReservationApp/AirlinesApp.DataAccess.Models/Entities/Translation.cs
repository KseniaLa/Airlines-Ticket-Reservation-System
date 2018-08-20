using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Translation : Entity
    {
        [Required]
        public string Value { get; set; }

        public virtual Language Language { get; set; }
        public virtual City City { get; set; }
        public virtual Company Company { get; set; }
    }
}
