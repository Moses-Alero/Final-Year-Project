const path = require('path')
const http = require('http')
const express = require('express');
const socket = require('socket.io');
const {DateTime} = require('luxon')


const app = express();
const server = http.createServer(app)
const io = socket(server);

const port = process.env.PORT || 8000;

app.use(express.json())
const publicDirectory = path.join(__dirname, "../public")

app.use(express.static(publicDirectory));

io.on('connection',(socket)=>{
    // This function runs when a connection is made to the to the server.
    console.log("New Client connected to server...")
    
    socket.emit('ClientConnects',{
        name: "Moses",
        matNo: "ENG/COE/01700357"
    })

    socket.on('sentMessage',(message)=>{
        io.emit('message',generateMessage(message))
    })
})
server.listen(port,()=>{
    console.log(`Server is live on port ${port}`)
})

const dt = DateTime.now()
const generateMessage = (text)=>{
    return {
        text,
        timeCreated: dt.toLocaleString(DateTime.TIME_WITH_SECONDS)
    }
}
