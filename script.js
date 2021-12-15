let cnv,ctx;

function poNacteni() {
  document.addEventListener("keydown", stiskKlavesy);
  document.addEventListener("keyup", pusteniKlavesy);

  cnv = document.getElementById("platno");
  ctx = cnv.getContext("2d");

  //setInterval(kresleni, 10);
}

const KRUH_POLOMER = 50;
let kruhX = 300;
let kruhY = 80;
let kruhRychlostX = -4;

let hracY = 200;

function kresleni() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.moveTo(0,0);
  ctx.lineTo(cnv.width, cnv.height);
  ctx.stroke();

  //plny obdelnik ("hrac")
  if (hracNahoru) {
    hracY = hracY - 2;
  }
  if (hracDolu) {
    hracY = hracY + 2;
  }
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.rect(10, hracY, 100, 60);
  ctx.fill();

  //kruh
  kruhX = kruhX + kruhRychlostX;
  if (kruhX - KRUH_POLOMER <= 0) {
    kruhRychlostX = -1 * kruhRychlostX;
  }
  if (kruhX + KRUH_POLOMER >= cnv.width) {
    kruhRychlostX = -1 * kruhRychlostX;
  }
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.arc(kruhX, kruhY, KRUH_POLOMER, 0, 2*Math.PI);
  ctx.fill();

}

let hracNahoru = false;
let hracDolu = false;

function stiskKlavesy(udalost) {
  if (udalost.key == "w") {
    hracNahoru = true;
  }
  if (udalost.key == "s") {
    hracDolu = true;
  }
  posun();
}

function pusteniKlavesy(udalost) {
  if (udalost.key == "w") {
    hracNahoru = false;
  }
  if (udalost.key == "s") {
    hracDolu = false;
  }
  posun();
}

const USERID = Date.now().toString(16); //nahodne, ale "unikatni"
const url = 'ws://localhost:8080/';
const connection = new WebSocket(url);
connection.onopen = () => {
};
connection.onmessage = e => {
    console.log(e.data);
    //tady bude zobrazeni stavu hry v prohlizeci
};
connection.onerror = error => {
    console.log(`WebSocket error: ${JSON.stringify(error, 
         ["message", "arguments", "type", "name"])}`);
};

function pripojit() {
  let obj = {};
  obj.uid = USERID;
  obj.akce = "novyhrac";
  obj.jmeno = document.getElementById("jmeno").value;
  obj.barva = document.getElementById("barva").value;
  connection.send(JSON.stringify(obj));

}

function posun() {
  let obj = {};
  obj.uid = USERID;
  obj.akce = "posun";
  obj.nahoru = hracNahoru;
  obj.dolu = hracDolu;
  obj.vlevo = false;
  obj.vlpravo = false;
  connection.send(JSON.stringify(obj));
}