using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
     public class Translation : Entity
     {
          [Required]
          public string Value { get; set; }
          
          public int? CityId { get; set; }

          public int? CompanyId { get; set; }

          [Required]
          public int LanguageId { get; set; }

          public virtual Language Language { get; set; }
     }
}
