const path = require('path')
const http = require('http')
const express = require('express');
const socket = require('socket.io');
const AES = require('./utils/Aes.js');
const RSA = require('./utils/rsa.js');
const {hash} = require('./utils/hash.js');
const {DateTime} = require('luxon');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users.js');
const { EncryptKey } = require('./utils/rsa1.js');



const app = express();
const mainServer = http.createServer(app)
const io = socket(mainServer);

const port = process.env.PORT || 8000;

app.use(express.json())
const publicDirectory = path.join(__dirname, "../public")

app.use(express.static(publicDirectory));

io.on('connection',(socket)=>{
    // This function runs when a connection is made to the to the server.
    
    socket.on('join', ({username, roomName}, callback) =>{
        const {error, user} = addUser({id: socket.id, username, roomName});
        if(error) return callback(error)

        socket.join(user.roomName)                   

        socket.broadcast.to(user.roomName).emit('ClientConnects', `${user.username} has joined ${user.roomName}`)
        io.to(user.roomName).emit('roomData', {
            room: user.roomName,
            users: getUsersInRoom(user.roomName)
        })

        callback();
    })    
        socket.on('sendMessage',(payload)=>{
            const  user = getUser(socket.id)
            socket.broadcast.to(user.roomName).emit('proof', generateMessage2(user.username,payload) )
            io.to(user.roomName).emit('message',generateMessage(user.username,payload))
    })
    
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
    
        if(user){
            io.to(user.roomName).emit('ClientConnects', `${user.username} has left`)
            io.to(user.rooName).emit('roomData', {
                room: user.roomName,
                users: getUsersInRoom(user.roomName)
            })
        }
    })
})


mainServer.listen(port,()=>{})

const generateMessage = (username,payload)=>{
    const dt = DateTime.now()
    //RECEIVER SIDE
    //decrypt AESKeyData
    const RsaDecrypt = {
        decryptedAesIV: payload.encryptedAESData.AesIV,
        decryptedAesKey: RSA.DecryptData(payload.encryptedAESData.AesKey)
    }
    //decrypt AESEncrypted message
    const AesDecrypt = AES.AesDataDecrypt(payload.encryptedMessage, RsaDecrypt.decryptedAesKey, RsaDecrypt.decryptedAesIV);

    //confirm message integrity
    const RHash = hash(AesDecrypt.toString('utf-8'));
    if(RHash !== payload.messageHash) return new Error('Invalid Message');
    return {
        username,
        text: AesDecrypt.toString('utf-8'),
        timeCreated: dt.toLocaleString(DateTime.TIME_WITH_SECONDS)
    };
}

const generateMessage2 = (username,payload)=>{
    //RECEIVER SIDE
    //decrypt AESKeyData
    const RsaDecrypt = {
        decryptedAesIV: payload.encryptedAESData.AesIV,
        decryptedAesKey: RSA.DecryptData(payload.encryptedAESData.AesKey)
    }
    //decrypt AESEncrypted message
    const AesDecrypt = AES.AesDataDecrypt(payload.encryptedMessage, RsaDecrypt.decryptedAesKey, RsaDecrypt.decryptedAesIV);
    //confirm message integrity
    const RHash = hash(AesDecrypt.toString('utf-8'));
    return {
        Sender: username,
        decryptedAesKey: payload.encryptedAESData.AesKey.toString('ascii'),
        ReceivedEncryptedMessage: payload.encryptedMessage.toString('ascii'), 
        DecryptedMessage: AesDecrypt.toString('utf-8'),
        GeneratedHash: RHash
    };
}