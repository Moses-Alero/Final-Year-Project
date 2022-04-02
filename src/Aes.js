const crypto = require('crypto'); 
const { EncryptData, DecryptData } = require('./rsa');


//const DataToEncode = 'some secret text'; // utf-8
const algo = 'aes-128-gcm';

// Key bytes length depends on algorithm being used:
// 'aes-128-gcm' = 16 bytes
// 'aes-192-gcm' = 24 bytes
// 'aes-256-gcm' = 32 bytes
const key = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algo, key, iv);

//using RSA to encrypt the AES key
const encryptedKey = EncryptData(crypto.createDecipheriv(algo, key, iv))
// It's important to use the same authTag and IV that were used during encoding
const decipher = DecryptData(encryptedKey);

  function  AesDataEncrypt (plain_data){
   const encryptedData = Buffer.concat([
     cipher.update(Buffer.from(plain_data, 'utf-8')),
     cipher.final()
   ]);
  return encryptedData;
}


function AesDataDecrypt(encrypted_data){
  const authTag =  cipher.getAuthTag();
  EncryptData(authTag);
  decipher.setAuthTag(authTag);

  const decryptedData = Buffer.concat([
    decipher.update(encrypted_data),
    decipher.final()
  ]);

  return decryptedData;
}
module.exports = {
  key: key,
  AesDataDecrypt,
  AesDataEncrypt,
  encryptedKey
}


