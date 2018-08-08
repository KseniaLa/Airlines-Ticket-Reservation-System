using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class CompanyTranslate : Model
    {
          [Required]
          public int CompanyId { get; set; }

          [Required]
          [MaxLength(50)]
          public string Name { get; set; }

          [Required]
          public int LanguageId { get; set; }

          public Company Company { get; set; }
          public Language Language { get; set; }
     }
}
