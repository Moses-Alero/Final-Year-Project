const RSA = require('node-rsa');
let key = new RSA ({b: 1024});

const EncryptData = (data)=>{
    var encryptedData = key.encrypt(data, 'base64');
    return encryptedData 
}

const DecryptData = (data)=>{
    var decryptedData = key.decrypt(data, 'utf8');
    return decryptedData;
}

module.exports = {
    EncryptData,
    DecryptData
}


