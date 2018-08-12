using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Translation : Model
    {
          [Required]
          public string Value { get; set; }

          public virtual Language Language { get; set; }
     }
}
