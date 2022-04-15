
const socket = io()

const $messageInput = document.querySelector('#message-box');
const $message_div = document.querySelector('#messages')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $button  = document.querySelector('#send-button');

$button.addEventListener('click',(e)=>{
    e.preventDefault();
    socket.emit('sentMessage',$messageInput.value)
    $messageInput.value = '';
    $messageInput.focus();
})

socket.on('ClientConnects', (welcomeMessage)=>{
    console.log(welcomeMessage.name);
})
socket.on('message',(message)=>{
    let html = Mustache.render($messageTemplate, {
        message: message.text,
        timeCreated: message.timeCreated
    })
    $message_div.insertAdjacentHTML('beforeend',html)
})