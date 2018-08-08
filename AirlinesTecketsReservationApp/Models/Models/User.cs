using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
     public class User : Model
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
          public byte[] PasswordHash { get; set; }

          [Required]
          public byte[] PasswordSalt { get; set; }

          [Required]
          public bool IsAdmin { get; set; }

          public virtual ICollection<Order> Order { get; set; }
     }
}
