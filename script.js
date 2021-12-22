let cnv,ctx;

function poNacteni() {
  document.addEventListener("keydown", stiskKlavesy);
  document.addEventListener("keyup", pusteniKlavesy);

  cnv = document.getElementById("platno");
  ctx = cnv.getContext("2d");
  ctx.font = "12px Verdana"; //pouzivam pri kresleni jen tento font

  //setInterval(kresleni, 10);
}

const KRUH_POLOMER = 50;
let kruhX = 300;
let kruhY = 80;
let kruhRychlostX = -4;

let hracY = 200;

function kresleni(data) {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  for (let hrac of data) { //data obsahuje seznam hracu
    ctx.beginPath();
    ctx.fillStyle = hrac.barva;
    ctx.arc(hrac.x, hrac.y, hrac.r, 0, 2*Math.PI);
    ctx.fill();

    if (hrac.maBabu) {
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.arc(hrac.x, hrac.y, hrac.r, 0, 2*Math.PI);
      ctx.stroke();
    }

    ctx.fillText(hrac.jmeno, hrac.x + hrac.r, hrac.y);
  }

}

let hracNahoru = false;
let hracDolu = false;
let hracVlevo = false;
let hracVpravo = false;

function stiskKlavesy(udalost) {
  if (udalost.key == "w") {
    hracNahoru = true;
  }
  if (udalost.key == "s") {
    hracDolu = true;
  }
  if (udalost.key == "a") {
    hracVlevo = true;
  }
  if (udalost.key == "d") {
    hracVpravo = true;
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
  if (udalost.key == "a") {
    hracVlevo = false;
  }
  if (udalost.key == "d") {
    hracVpravo = false;
  }
  posun();
}

const USERID = Date.now().toString(16); //nahodne, ale "unikatni"
const url = location.href.replace("http", "ws");
const connection = new WebSocket(url);
connection.onopen = () => {
};
connection.onmessage = e => {
    //console.log(e.data);
    kresleni(JSON.parse(e.data));
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
  obj.vlevo = hracVlevo;
  obj.vpravo = hracVpravo;
  connection.send(JSON.stringify(obj));
}