const AES  =  require('./utils/Aes');
const  { hash } = require('./utils/hash');

const textToEncode = "Linear Programming (LP) or Linear Optimization can be defined as a problem of maximizing or minimizing a linear function subject to linear constraints."
const encryptedMessage = AES.AesDataEncrypt(textToEncode);
const authHash = hash(textToEncode);

const JSON_DATA = {
    encryptedMessage,
    encryptedAESKey: AES.encryptedKey,
    hash: authHash
}

/* TODO:
    Set  Receiver side decryption,
    Create Design & Frontend end for User Interface
    Develop Backend for duplex communication between client and Server
*/ 