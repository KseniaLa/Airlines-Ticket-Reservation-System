using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Company : Entity
    {
        [Required]
        public int Stars { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<Translation> Translations { get; set; }
    }
}
