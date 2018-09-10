using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using AirlinesApp.Config;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
    public class ConfirmationService : IEncryptionService, IScopedService
    {
        private readonly string _initVector;
        private readonly string _key;
        private readonly int _keySize;

        public ConfirmationService(IConfig config)
        {
            _initVector = config.InitVector;
            _key = config.Key;
            _keySize = config.KeySize;
        }

        public string Encrypt(string plainText)
        {
            byte[] initVectorBytes = Encoding.UTF8.GetBytes(_initVector);
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(_key, null);
            byte[] keyBytes = password.GetBytes(_keySize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream();
            CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);
            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
            cryptoStream.FlushFinalBlock();
            byte[] cipherTextBytes = memoryStream.ToArray();
            memoryStream.Close();
            cryptoStream.Close();
            return EncodeBase64(Convert.ToBase64String(cipherTextBytes));
        }

        public string Decrypt(string cipherText)
        {
            byte[] initVectorBytes = Encoding.UTF8.GetBytes(_initVector);
            cipherText = DecodeBase64(cipherText);
            byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(_key, null);
            byte[] keyBytes = password.GetBytes(_keySize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
            CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            byte[] plainTextBytes = new byte[cipherTextBytes.Length];
            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
            memoryStream.Close();
            cryptoStream.Close();
            return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
        }

         private string EncodeBase64(string input)
         {
              char[] padding = { '=' };
              return input.TrimEnd(padding).Replace('+', '-').Replace('/', '_');
          }

         private string DecodeBase64(string input)
         {
              string result = input.Replace('_', '/').Replace('-', '+');
              switch (input.Length % 4)
              {
                   case 2: result += "=="; break;
                   case 3: result += "="; break;
              }

              return result;
         }
    }
}
