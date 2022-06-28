const nodeRsa = require('node-rsa');

const roomKeyPairs = [];


const generateKeys = (roomName)=>{
    if(!roomName) return ({error: `Room Name is required`});
     roomName = roomName.trim().toLowerCase()
    const roomExists = roomKeyPairs.find((room)=>{
        return room.roomName === roomName;
    });
    if(roomExists) return;
    const keys = new nodeRsa().generateKeyPair(1024);
    keys.setOptions({encryptionScheme: 'pkcs1'})
    const keyPairData = {
        roomName,
        privateKey: keys.exportKey('private'),
        publicKey: keys.exportKey('public')
    }
    roomKeyPairs.push(keyPairData)
}

const getKeys = (roomName) =>{
     for(let i=0; i<roomKeyPairs.length; i++){
        if(roomKeyPairs[i].roomName === roomName){
            return {
                privateKey: roomKeyPairs[i].privateKey,
                publicKey: roomKeyPairs[i].publicKey
            };
        }
     }
}

const removeKeyPairs = (roomName)=>{
   const keyPairsIndex = roomKeyPairs.findIndex((room)=>{
        return room.roomName === roomName;
   });
   if(keyPairsIndex !== -1) return roomKeyPairs.splice(keyPairsIndex,1)[0];
   return;
}



module.exports = {
    roomKeyPairs,
    generateKeys,
    getKeys,
    removeKeyPairs
}