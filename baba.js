const WebSocket = require("ws"); //nacteni systemoveho modulu pro websockety

let wss; //promenna pro websocket server
exports.inicializuj = function(srv) {
  wss = new WebSocket.Server({ server: srv }); //vytvoreni websocket serveru
  wss.on("connection", poPripojeni); //
  setInterval(rozesliStav, 10);
}

function poPripojeni(ws) {
  ws.on("message", zpracujZpravu);
}

let pocitadlo = 0;
function rozesliStav() {
  pocitadlo++;
  //rozeslani stavu vsem pripojenym prohlizecum
  let json = JSON.stringify(pocitadlo);
  wss.clients.forEach(function each(client) {
    client.send(json);
  });
}

let hraci = []; //seznam hracu
function zpracujZpravu(z) {
  //console.log(z.toString());
  let o = JSON.parse(z);
  console.log(o);
  if (o.akce == "novyhrac") {
    let h = {};
    h.uid = o.uid;
    h.jmeno = o.jmeno;
    h.barva = o.barva;
    //stred hrace 
    h.x = Math.floor(600 * Math.random()); //nahodne cislo od 0 do 600
    h.y = Math.floor(400 * Math.random()); //nahodne cislo od 0 do 400
    hraci.push(h);
  }
  if (o.akce == "posun") {
      
  }
}
