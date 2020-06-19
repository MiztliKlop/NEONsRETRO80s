//Declarar las variables
var modal2 = document.getElementById("myModal2");
var btn = document.getElementById("img2");
var span = document.getElementsByClassName("close2")[0];

//Cueando se da click en el modal2 se cierra
btn.onclick = function() {
  modal2.style.display = "flex";
}

// Cuando se da click en el span, se cierra el modal 2
span.onclick = function() {
  modal2.style.display = "none";
}

// Cuando se da click en cualquier parte fuera del modal2 se cierra
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

//Se definen las variables del modal 3
var modal3 = document.getElementById("myModal3");
var btn = document.getElementById("img3");
var span = document.getElementsByClassName("close3")[0];

//Cuando se da click en cualquier parte del modal 3 se cierra
btn.onclick = function() {
  modal3.style.display = "flex";
}

// Cuando el iusurio cierra con el tache el modal 3
span.onclick = function() {
  modal3.style.display = "none";
}

// Cuando se cierra, se sale del modal3
window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}

//Obtener las variables
var modal1 = document.getElementById("myModal1");

var btn = document.getElementById("img");

var span = document.getElementsByClassName("close")[0];

//Cuando el ususrio hace click abre el modal 2
btn.onclick = function() {
  modal1.style.display = "flex";
}

// Cuando se da click en el span se cierra el modal
span.onclick = function() {
  modal1.style.display = "none";
}

// Cuando se da click fuera del modal1, se cierra
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}
