using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class PopularCity : Model
    {
          [Required]
          public int CityId { get; set; }

          [Required]
          public int Rating { get; set; }

          public City City { get; set; }
     }
}
