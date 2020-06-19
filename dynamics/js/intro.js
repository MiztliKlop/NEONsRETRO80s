/*Se almacena en variables las dimensiones de la ventana*/
var w = window.innerWidth;
var h = window.innerHeight;

var intro = document.getElementsByClassName("intro")[0];
var historia = document.getElementsByClassName("historia")[0];
var parrafos = document.getElementsByClassName("parrafos")[0];
var sonido = document.getElementById("sonido");


intro.style.fontSize = w / 30 + "px";
historia.style.fontSize = w / 20 + "px";
parrafos.style.height = h + "px";
//Agregar los eventos que sucederan
//El canvas se adapta al tamanño de la pantalla
window.addEventListener("resize", function() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  intro.style.fontSize = w / 30 + "px";
  historia.style.fontSize = w / 18 + "px";
  parrafos.style.height = h + "px";

  inicio();
  estrellas();

});
//Funcion para redireccionar al juego
function redireccionar(){
window.location.href ="../templates/BlastarWars.html";
}
//Funcion para que se vean los parrafos
function animar() {
  intro.className = 'intro texto_intro animacion_intro';
  historia.className = 'historia texto_historia animacion_historia';
  setTimeout('sonido.play()',6000);
  setTimeout ("redireccionar()", 47000);
}
/*Obtener el fondo del canvas*/
var canvas = document.getElementById('snow');
var ctx = canvas.getContext('2d');

canvas.width = w;
canvas.height = h;

var num = 100;
var tamaño = 2;
var elementos = [];

inicio();
estrellas();
//Funcion para iniciar
function inicio() {
  for (var i = 0; i < num; i++) {
    elementos[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      tamaño: Math.random() * tamaño
    }
  }
}
//Funcion para generar las estrellas
function estrellas() {
  ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < num; i++) {
    var e = elementos[i];
    ctx.beginPath();
    ctx.fillStyle = "#ff6";
    ctx.arc(e.x, e.y,e.tamaño,0,2*Math.PI);
    ctx.fill();
  }
}
