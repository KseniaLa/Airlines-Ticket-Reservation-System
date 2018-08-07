using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class Companies
    {
        public Companies()
        {
            Tickets = new HashSet<Tickets>();
        }

        public int CompanyId { get; set; }
        public string NameRu { get; set; }
        public string NameEn { get; set; }

        public ICollection<Tickets> Tickets { get; set; }
    }
}
