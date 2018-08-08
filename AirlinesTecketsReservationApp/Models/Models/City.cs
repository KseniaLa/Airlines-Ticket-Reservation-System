using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
     public class City : Model
    {
          [Required]
          public int Rating { get; set; }

          public virtual ICollection<Translation> Translations { get; set; }
     }
}
