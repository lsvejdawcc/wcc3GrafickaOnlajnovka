let cnv,ctx;

function poNacteni() {
  document.addEventListener("keydown", stiskKlavesyDolu);

  cnv = document.getElementById("platno");
  ctx = cnv.getContext("2d");

  setInterval(kresleni, 10);
}

const KRUH_POLOMER = 50;
let kruhX = 300;
let kruhY = 80;
let kruhRychlostX = -4;

function kresleni() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.moveTo(0,0);
  ctx.lineTo(cnv.width, cnv.height);
  ctx.stroke();

  //plny obdelnik
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.rect(10, 200, 100, 60);
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

function stiskKlavesyDolu(udalost) {
  //console.log(udalost);
  if (udalost.key == "Enter") {
    odesliZpravu();
  }
}
