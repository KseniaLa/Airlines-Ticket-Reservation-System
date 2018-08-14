using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Language : Entity
    {
        [Required]
        [MaxLength(2)]
        public string Name { get; set; }

    }
}
