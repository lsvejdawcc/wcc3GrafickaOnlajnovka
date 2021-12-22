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

function rozesliStav() {
  //posun hracu
  for (let h of hraci) {
    if (h.nahoru) {
        h.y = h.y - 2;
    }
    if (h.dolu) {
        h.y = h.y + 2;
    }
    if (h.vlevo) {
        h.x = h.x - 2;
    }
    if (h.vpravo) {
        h.x = h.x + 2;
    }
  }      
  //rozeslani stavu vsem pripojenym prohlizecum
  let json = JSON.stringify(hraci);
  wss.clients.forEach(function each(client) {
    client.send(json);
  });
}

const POLOMER_HRACE = 10;
let hraci = []; //seznam hracu
function zpracujZpravu(z) {
  //console.log(z.toString());
  let o = JSON.parse(z);
  console.log(o);
  if (o.akce == "novyhrac") {
/*
{
  "uid": "nmcbzxmbc",
  "akce": "novyhrac",
  "jmeno": "Bobik",
  "barva": "green"
}
*/      
    let h = {};
    h.uid = o.uid;
    h.jmeno = o.jmeno;
    h.barva = o.barva;
    //stred hrace 
    h.x = Math.floor(600 * Math.random()); //nahodne cislo od 0 do 600
    h.y = Math.floor(400 * Math.random()); //nahodne cislo od 0 do 400
    h.r = POLOMER_HRACE;
    h.nahoru = false;
    h.dolu = false;
    h.vlevo = false;
    h.vpravo = false;
    hraci.push(h);
  }
  if (o.akce == "posun") {
/*
{
  "uid": "nmcbzxmbc",
  "akce": "posun",
  "nahoru": true,
  "dolu": false,
  "vlevo": false,
  "vpravo": false
}
*/      
    for (let h of hraci) {
        if (h.uid == o.uid) {
            h.nahoru = o.nahoru;
            h.dolu = o.dolu;
            h.vlevo = o.vlevo;
            h.vpravo = o.vpravo;
            break;
        }
    }
      
  }
}
