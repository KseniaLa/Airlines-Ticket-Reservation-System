using System;
using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class IpAddress : Entity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string IpAddr { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public virtual User User { get; set; }
    }
}
