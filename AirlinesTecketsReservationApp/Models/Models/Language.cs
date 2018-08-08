﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Language : Model
    {
          [Required]
          [MaxLength(2)]
          public string Name { get; set; }

     }
}
