const crypto = require('crypto'); 

//AES ENCRYPTION FUNCTION
function  AesDataEncrypt (plain_data){
  const algo = 'aes-128-gcm';
  const key = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algo, key, iv);
  const encryptedData = Buffer.concat([cipher.update(Buffer.from(plain_data, 'utf-8', 'base64'))]);
  return {
    encryptedData,
    key,
    iv
  }
}

//AES DECRYPTION FUNCTION
function AesDataDecrypt(encrypted_data, key, iv, algo = 'aes-128-gcm'){
  const decipher = crypto.createDecipheriv(algo, key, iv);  
  const decryptedData = Buffer.concat([decipher.update(Buffer.from(encrypted_data, 'base64', 'utf-8'))]);

  return decryptedData;
}


module.exports = {
  AesDataDecrypt: AesDataDecrypt,
  AesDataEncrypt: AesDataEncrypt,
}

