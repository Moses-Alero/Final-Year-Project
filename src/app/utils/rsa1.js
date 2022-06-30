const crypto = require('crypto');
const constants = require('constants')
const nodeRsa = require('node-rsa');

const keys = new nodeRsa().generateKeyPair(1024);
keys.setOptions({encryptionScheme: 'pkcs1'})
const publicKey = keys.exportKey('public');
const privateKey = keys.exportKey('private');


const EncryptKey = (data)=>{
    const encryptedData = crypto.publicEncrypt({
        key: publicKey,
        padding: constants.RSA_PKCS1_PADDING
    },
    data)
        
    return encryptedData.toString('ascii');
}
const DecryptKey = (data)=>{
    const encryptedData = crypto.publicEncrypt({
        key: privateKey,
        padding: constants.RSA_PKCS1_PADDING
    },
    data)
        
    return encryptedData.toString('ascii');
}

module.exports = { 
    EncryptKey,
    DecryptKey
}