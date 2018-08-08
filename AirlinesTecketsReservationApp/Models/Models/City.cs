﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class City : Model
    {
          [Required]
          public int Rating { get; set; }

          public virtual ICollection<CityTranslate> CityTranslates { get; set; }
     }
}
