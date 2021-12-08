let cnv,ctx;

function poNacteni() {
  document.addEventListener("keydown", stiskKlavesyDolu);

  cnv = document.getElementById("platno");
  ctx = cnv.getContext("2d");

  kresleni();
}

function kresleni() {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.moveTo(0,0);
  ctx.lineTo(cnv.width, cnv.height);
  ctx.stroke();

}

function stiskKlavesyDolu(udalost) {
  //console.log(udalost);
  if (udalost.key == "Enter") {
    odesliZpravu();
  }
}
