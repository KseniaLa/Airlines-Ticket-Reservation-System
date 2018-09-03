﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class User : Entity
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Surname { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        public bool Confirmed { get; set; }

        [Required]
        public string Token { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
