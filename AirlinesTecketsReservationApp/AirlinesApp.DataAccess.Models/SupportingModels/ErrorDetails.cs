﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace AirlinesApp.DataAccess.Models.SupportingModels
{
    public class ErrorDetails
    {
         public int StatusCode { get; set; }
         public string Message { get; set; }


         public override string ToString()
         {
              return JsonConvert.SerializeObject(this);
         }
     }
}