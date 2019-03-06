document.addEventListener('DOMContentLoaded', appStart);

// utworz obiekt Websocket
// nawiaz polaczenie z serwerem
const serverUrl = 'ws://127.0.0.1:8001';
const ws = new WebSocket(serverUrl);

let btnSendMessage;
let writtenMessage;
let chatDiv;

// oczekuj na wiadomosci z serwera
ws.addEventListener('message', onWSMessage);
ws.addEventListener('open', onWSOpen);
ws.addEventListener('close', onWSClose);
ws.addEventListener('error', onWSError);

function btnDisabled() {
    btnSendMessage.disabled = true;
}

function onWSMessage(msg) {
    console.log('WS message', msg);
    addMessageToChat(msg.data, false);
}

function onWSOpen(msg) {
    console.log('WS open', msg);
}

function onWSClose(msg) {
    console.log('WS close', msg);
    btnDisabled();
}

function onWSError(msg) {
    console.log('WS error', msg);
}

function appStart() {
    btnSendMessage = document.querySelector('#btnMessage');
    btnSendMessage.addEventListener('click', btnSendMessageClicked);
}

function btnSendMessageClicked() {
    const msg = document.querySelector('#message').value;
    
    
    sendWsMessage(msg);
    addMessageToChat(msg, true);
    clearMessageInput();
}

function addMessageToChat(message, isSent) {
    chatWindow = document.querySelector('#chat');
    const msgDiv = document.createElement('div');
    msgDiv.innerText = message;
    if (isSent) {
    msgDiv.classList.add('sent-message');
    } else {
        msgDiv.classList.add('received-message');
    }
    chatWindow.appendChild(msgDiv);
}

function clearMessageInput() {
    document.querySelector('#message').value = '';
}

function sendWsMessage(msg) {
    // wyslij wiadomosc do serwera
    ws.send(msg);
}

