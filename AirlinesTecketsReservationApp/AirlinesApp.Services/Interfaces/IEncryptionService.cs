﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.Services.Interfaces
{
    public interface IEncryptionService
    {
        string Encrypt(string plainText);
        string Decrypt(string cipherText);
    }
}
