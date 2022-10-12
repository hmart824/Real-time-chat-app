const socket = io();

const user_name = prompt("Enter your user name: ");
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message-area')

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
});

const sendMessage = (message)=>{
    let msg = {
        user: user_name,
        message: message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    //Send to server
    socket.emit('message', msg);
}

const appendMessage = (msg , type)=>{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type , 'message');
    mainDiv.innerHTML = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    messageArea.appendChild(mainDiv);
}


//Receive messages
socket.on('message', (msg)=>{
    appendMessage(msg , "incoming");
    scrollToBottom();
});

let scrollToBottom = ()=>{
    messageArea.scrollTop = messageArea.scrollHeight;
};
    
