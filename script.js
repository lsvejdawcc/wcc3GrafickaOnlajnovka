function poNacteni() {
  document.addEventListener("keydown", stiskKlavesyDolu);
}

function stiskKlavesyDolu(udalost) {
  //console.log(udalost);
  if (udalost.key == "Enter") {
    odesliZpravu();
  }
}
