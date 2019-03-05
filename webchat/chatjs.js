// utworz obiekt Websocket
// nawiaz polaczenie z serwerem
const serverUrl = 'ws://127.0.0.1:8001';
const ws = new WebSocket(serverUrl);

// oczekuj na wiadomosci z serwera
ws.addEventListener('message', onWSMsg);
function onWSMsg(msg) {
    console.log(msg);
}

document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    document.querySelector('#testMessage').addEventListener('click', sendWsMessage);
}

function sendWsMessage() {
    // wyslij wiadomosc do serwera
    ws.send('hej WebSocket');
}
