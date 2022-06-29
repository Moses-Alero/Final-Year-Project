import { AesDataEncrypt } from "../app/utils/Aes.js";
import RSA from "../app/utils/rsa.js";
import { hash } from "../app/utils/hash.js";
import qs from 'qs'

const socket = io();

const $messageInput = document.querySelector('#message-box');
const $message_div = document.querySelector('#messages');
const $messageTemplate = document.querySelector('#message-template').innerHTML;
const $button  = document.querySelector('#send-button');
const $sideBarTemplate = document.querySelector('#sidebar-template').innerHTML
//const $password = document.querySelector('#password');

const {username, roomName} = qs.parse(location.search, {ignoreQueryPrefix: true})
const autoScroll = () => {
    // New message element
    const $newMessage = $message_div.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $message_div.offsetHeight

    // Height of message_$message_div container
    const containerHeight = $message_div.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $message_div.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $message_div.scrollTop = $message_div.scrollHeight
    }
}

$button.addEventListener('click',(event)=>{
    event.preventDefault();
    if($messageInput.value != ''){
        //Encrypt Message using AES
            const AesEncrypt = AesDataEncrypt($messageInput.value);
             //Encrypt Key and Initialization Vector using RSA
             const RsaEncrypt = {
                 AesIV: AesEncrypt.iv,
                 AesKey: RSA.EncryptData(AesEncrypt.key)
             }
             //generate hash
             const messageHash = hash($messageInput.value);
     
             // Send Payload containing relevant data
             const payload = {
                 encryptedMessage: AesEncrypt.encryptedData,
                 encryptedAESData: RsaEncrypt,
                 messageHash
             };
     
             socket.emit('sendMessage',payload)
             $messageInput.value = '';
             $messageInput.focus();
        

    }
})

socket.on('ClientConnects', (welcomeMessage)=>{
    alert(welcomeMessage);
})
socket.on('message',(message)=>{
    let html = Mustache.render($messageTemplate, {
        username: message.username.toUpperCase(),
        message: message.text,
        timeCreated: message.timeCreated
    })
    $message_div.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render($sideBarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

socket.emit('join', {username, roomName}, (error)=>{
    if(error){
        alert(error);
        location.href ='/'
    }
})