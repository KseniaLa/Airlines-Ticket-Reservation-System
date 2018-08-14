using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Translation : Entity
    {
        [Required]
        public string Value { get; set; }

        public virtual Language Language { get; set; }
    }
}
