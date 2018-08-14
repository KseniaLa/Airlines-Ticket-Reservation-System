using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Order : Entity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int TicketId { get; set; }

        [Required]
        public int Count { get; set; }

        public virtual Ticket Ticket { get; set; }
        public virtual User User { get; set; }
    }
}
