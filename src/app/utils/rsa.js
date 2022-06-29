const crypto = require('crypto');
const constants = require('constants')
const nodeRsa = require('node-rsa');

const keys = new nodeRsa().generateKeyPair(1024);
keys.setOptions({encryptionScheme: 'pkcs1'})
const publicKey = keys.exportKey('public');
const privateKey = keys.exportKey('private');


const EncryptData = (data)=>{
    
    
    return data;
}

const DecryptData = (data)=>{
 
    
    return data;
}

module.exports = {
    EncryptData,
    DecryptData
}


