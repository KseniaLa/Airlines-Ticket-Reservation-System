using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class City : Entity
    {
        [Required]
        public int Rating { get; set; }

        [Required]
        public string Url { get; set; }

        public virtual ICollection<Translation> Translations { get; set; }
    }
}
