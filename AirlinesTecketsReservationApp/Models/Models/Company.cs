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
          [MaxLength(50)]
          public string NameRu { get; set; }

          [Required]
          [MaxLength(50)]
          public string NameEn { get; set; }

          public virtual ICollection<Ticket> Tickets { get; set; }
     }
}
