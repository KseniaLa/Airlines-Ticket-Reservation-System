using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Company : Model
    {
          [Required]
          public int Stars { get; set; }

          public virtual ICollection<Ticket> Tickets { get; set; }
          public virtual ICollection<Translation> Translations { get; set; }
     }
}
