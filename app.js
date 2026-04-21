
// "unique" id? no
// sorry for the cringe name lol
const randomNum = Math.floor(Math.random() * 1000);
const peer = new Peer('test-id-' + Math.floor(Math.random() * 1000), { // random id generation
  config: {
    'iceServers': [
      { urls: 'stun:stun.l.google.com:19302' }, 
      { urls: 'stun:stun1.l.google.com:19302' }                        // stun servers to fix device communication i think
    ]
  }
});

// share ur id to be even more vulnerable yay
peer.on('open', (id) => {
  document.getElementById('my-id').innerText = id;
});


peer.on('connection', (incomingConn) => {
  conn = incomingConn;
  setupChat();
});


function connectToPeer() {
  const remoteId = document.getElementById("peerIdInput").value;
  conn = peer.connect(remoteId);
  setupChat();
}


function setupChat() {
  conn.on('data', (data) => {
   
    document.getElementById("output").innerHTML += "<div>Peer sent: " + data + "</div>";
  });
}


function inject() {
  const userInput = document.getElementById("xssInput").value;
  
  // show it on screen
  document.getElementById("output").innerHTML += "<div>You: " + userInput + "</div>";

  // If connected, send input to peer
  if (conn && conn.open) {
    conn.send(userInput);
  }


}

