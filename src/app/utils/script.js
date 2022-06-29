const AES = require('./Aes.js');
const RSA = require('./rsa.js');
const {hash} = require('./hash.js');
const { generateKeys, getKeys } = require('./keys.js');


// SENDER SIDE
    const text ='Hello'
    const room = 'edsu 1'
    console.log({messageToBeEncrypted: text})
    generateKeys(room)
    //Encrypt Message using AES
    const AesEncrypt = AES.AesDataEncrypt(text);
    const key = getKeys(room)
    //Encrypt Key and Initialization Vector using RSA
    const RsaEncrypt = {
        AesIV: AesEncrypt.iv,
        AesKey: RSA.EncryptData(AesEncrypt.key)
    }
    //generate hash
    const messageHash = hash(text);

    // Send Payload containing relevant data
    const payload = {
        encryptedMessage: AesEncrypt.encryptedData,
        encryptedAESData: RsaEncrypt,
        messageHash
    }
    
    console.log({encryptedMessage: AesEncrypt.encryptedData.toString('binary'),
        encryptedAESData: RsaEncrypt.AesKey.toString('binary'),
        messageHash});
    setTimeout(() => {
         //RECEIVER SIDE

    //decrypt AESKeyData
    const RsaDecrypt = {
        decryptedAesIV: payload.encryptedAESData.AesIV,
        decryptedAesKey: RSA.DecryptData(payload.encryptedAESData.AesKey)
    }
    console.log({
        decryptedAesIV: payload.encryptedAESData.AesIV,
        decryptedAesKey: RSA.DecryptData(payload.encryptedAESData.AesKey)
    });
    //decrypt AESEncrypted message
    const AesDecrypt = AES.AesDataDecrypt(payload.encryptedMessage, RsaDecrypt.decryptedAesKey, RsaDecrypt.decryptedAesIV);

    //confirm message integrity
    const RHash = hash(AesDecrypt.toString('utf-8'));
    if(RHash !== payload.messageHash){
        console.error('Invalid Message');
    }else console.log(AesDecrypt.toString('utf-8'));
    }, 5000);
   
