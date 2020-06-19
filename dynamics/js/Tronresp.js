// Declaro Audios
let giroNaranja=new Audio();
giroNaranja.src= "../statics/media/track/move.ogg";
let giroAzul=new Audio();
giroAzul.src= "../statics/media/track/move2.wav";
let choque=new Audio();
choque.src= "../statics/media/track/collide.wav";
// Creo el Campo
for (var i = 0; i < 60; i++)
{
  var columna = document.createElement("div");
  columna.classList.add("columna");
  document.getElementsByClassName("campo")[0].appendChild(columna);
}
for (var i = 0; i < 60; i++)
{
  for (var n = 0; n < 60; n++)
  {
    var celda = document.createElement("div");
    celda.classList.add("celda");
    document.getElementsByClassName("campo")[0].children[i].appendChild(celda);
  }
}
// Función para obtener Cookies
function getCookie(cname)
{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Creación de Moto Naranja
function AparecerMotoNaranja()
{
  for (var i = 0; i < motoNaranja.length; i++)
  {
    var lugarNewNaranja = campo[motoNaranja[i][0]].children[motoNaranja[i][1]];
    lugarNewNaranja.classList.add("motoNaranja");
  }
}
// Creación de Moto Azul
function AparecerMotoAzul()
{
  for (var o = 0; o < motoAzul.length; o++)
  {
    var lugarNewAzul = campo[motoAzul[o][0]].children[motoAzul[o][1]];
    lugarNewAzul.classList.add("motoAzul");
  }
}
// Destrucción de Cabezas Moto Naranja
function DestruirMotoNaranja()
{
  for (var i = 0; i < motoNaranja.length; i++)
  {
    var lugarOldNaranja = campo[motoNaranja[i][0]].children[motoNaranja[i][1]];
    lugarOldNaranja.classList.remove("motoNaranja");
    lugarOldNaranja.classList.add("luzNaranja");
  }
}
// Destrucción de Cabezas Moto Azul
function DestruirMotoAzul()
{
  for (var l = 0; l < motoAzul.length; l++)
  {
    var lugarOldAzul = campo[motoAzul[l][0]].children[motoAzul[l][1]];
    lugarOldAzul.classList.remove("motoAzul");
    lugarOldAzul.classList.add("luzAzul");
  }
}
// Teclas del Naranja
function direccionN(event)
{
  let dir = event.keyCode;
  if ( dir == 37 && sentidoNaranja!= "Derecha")
  {
    sentidoNaranja= "Izquierda";
    giroNaranja.play();
  }else if (dir == 38 && sentidoNaranja!= "Abajo")
  {
    sentidoNaranja= "Arriba";
    giroNaranja.play();
  }else if (dir == 39 && sentidoNaranja!= "Izquierda")
  {
    sentidoNaranja= "Derecha";
    giroNaranja.play();
  }else if (dir == 40 && sentidoNaranja!= "Arriba")
  {
    sentidoNaranja= "Abajo";
    giroNaranja.play();
  }
}
// Teclas del Azul
function direccionA(event2)
{
  let dir2 = event.keyCode;
  if ( dir2 == 65 && sentidoAzul != "D")
  {
    sentidoAzul = "A";
    giroAzul.play();
  }else if (dir2 == 87 && sentidoAzul != "S")
  {
    sentidoAzul = "W";
    giroAzul.play();
  }else if (dir2 == 68 && sentidoAzul != "A")
  {
    sentidoAzul = "D";
    giroAzul.play();
  }else if (dir2 == 83 && sentidoAzul != "W")
  {
    sentidoAzul = "S";
    giroAzul.play();
  }
}
// Creación variable campo
var campo = document.getElementsByClassName("campo")[0].children;
// Obtener y declarar Cookies
var azulPuntos= getCookie("azulPuntos");
var naranjaPuntos= getCookie("naranjaPuntos");
if (azulPuntos=="")
{
  azulPuntos=0;
}
if (naranjaPuntos=="")
{
  naranjaPuntos=0;
}
// Declaración de atributos y variables de las motos
var velocidad=250;
var motoNaranja=[[55,55]];
var motoAzul=[[4,4]];
var sentidoNaranja;
var sentidoAzul;
var record = getCookie("record");
var ronda = getCookie("ronda");
var naranjaVive=true;
var azulVive=true;
// Función del Juego completo
function Juego(velocidad)
{
  document.getElementById("ronda").innerHTML = "ronda: "+ronda;
  document.getElementById("puntosNaranja").innerHTML = "PuntosNaranja: "+naranjaPuntos;
  document.getElementById("puntosAzul").innerHTML = "PuntosAzul: "+azulPuntos;
  window.setTimeout(()=>{
    DestruirMotoNaranja();
    DestruirMotoAzul();
    // Efecto Pacman y Sentido/Asignación de las Teclas y Audio
    var headNaranja = new Array;
    var headAzul = new Array;
    var headColNaranja;
    var headCelNaranja;
    var headColAzul;
    var headCelAzul;
    document.addEventListener("keydown", direccionN);
    document.addEventListener("keydown", direccionA);
    if (sentidoNaranja=="Abajo")
    {
      if (motoNaranja[0][1]== 59)
      {
        headCelNaranja=0;
      }else
      {
        headCelNaranja=motoNaranja[0][1]+1;
      }
      headColNaranja=motoNaranja[0][0];
    }else if (sentidoNaranja=="Arriba")
    {
      if (motoNaranja[0][1]==0)
      {
        headCelNaranja=59;
      }
      else
      {
        headCelNaranja=motoNaranja[0][1]-1;
      }
      headColNaranja=motoNaranja[0][0];
    }else if (sentidoNaranja=="Derecha")
    {
      if (motoNaranja[0][0]==59)
      {
        headColNaranja=0;
      }else
      {
        headColNaranja=motoNaranja[0][0]+1;
      }
      headCelNaranja=motoNaranja[0][1];
    }else if (sentidoNaranja=="Izquierda")
    {
      if (motoNaranja[0][0]==0)
      {
        headColNaranja=59;
      }else
      {
        headColNaranja=motoNaranja[0][0]-1;
      }
      headCelNaranja=motoNaranja[0][1];
    }
    else
    {
      headColNaranja=motoNaranja[0][0];
      headCelNaranja=motoNaranja[0][1];
    }
    if (sentidoAzul=="S")
    {
      if (motoAzul[0][1]== 59)
      {
        headCelAzul=0;
      }else
      {
        headCelAzul=motoAzul[0][1]+1;
      }
      headColAzul=motoAzul[0][0];
    }else if (sentidoAzul=="W")
    {
      if (motoAzul[0][1]==0)
      {
        headCelAzul=59;
      }
      else
      {
        headCelAzul=motoAzul[0][1]-1;
      }
      headColAzul=motoAzul[0][0];
    }else if (sentidoAzul=="D")
    {
      if (motoAzul[0][0]==59)
      {
        headColAzul=0;
      }else
      {
        headColAzul=motoAzul[0][0]+1;
      }
      headCelAzul=motoAzul[0][1];
    }else if (sentidoAzul=="A")
    {
      if (motoAzul[0][0]==0)
      {
        headColAzul=59;
      }else
      {
        headColAzul=motoAzul[0][0]-1;
      }
      headCelAzul=motoAzul[0][1];
    }
    else
    {
      headColAzul=motoAzul[0][0];
      headCelAzul=motoAzul[0][1];
    }
    headNaranja=[headColNaranja,headCelNaranja];
    headAzul=[headColAzul,headCelAzul];
    motoNaranja.unshift(headNaranja);
    motoAzul.unshift(headAzul);
    // Si el azul choca  al naranja, hace campeón al naranja y guarda puntos
    if (campo[motoNaranja[0][0]].children[motoNaranja[0][1]].classList.contains("luzAzul", "celda"))
    {
      for (var i = 0; i < motoNaranja.length; i++)
      {
        var lugarNewNaranja = campo[motoNaranja[i][0]].children[motoNaranja[i][1]];
        lugarNewNaranja.classList.add("explosion");
        document.querySelector(".congratulations2").style.display = "block";
      }
      console.log(velocidad);
      choque.play();
      if (velocidad>110)
      {
        velocidad-=20;
      }
      //   document.querySelector("congratulations").style.display = "block";
      console.log("Gana Azul");
      window.setTimeout(()=>
      {
        // alert("Te han reventado Naranja");
        // alert("Tu azulPuntos es de: "+azulPuntos+" Azul");
        if (record < azulPuntos)
        {
          document.cookie = "record="+azulPuntos;
          // alert("Nuevo record");
        }
        else
        {
          // alert("El record sigue siendo "+record)
        }
        // alert("Haz click en Aceptar para comenzar una nueva partida");
        // window.location.reload();
        var naranjaVive=false;
      }  , 3000);
      console.log("hola");
      azulPuntos++;
      document.cookie = "azulPuntos="+ azulPuntos;
     Juego.break();
    }
    // Si el azul choca  al naranja, hace campeón al naranja y guarda puntos
    else if (campo[motoAzul[0][0]].children[motoAzul[0][1]].classList.contains("luzNaranja", "celda")) //si el azul contiene/choca  al naranja
    {
      for (var o = 0; o < motoNaranja.length; o++)
      {
        var lugarNewAzul = campo[motoAzul[o][0]].children[motoAzul[o][1]];
        lugarNewAzul.classList.add("explosion");
        document.querySelector(".congratulations").style.display = "block";
      }
      console.log(velocidad);
      choque.play();
      if (velocidad>110)
      {
        velocidad-=20;
      }
      //   document.querySelector("congratulations2").style.display = "block";
      console.log("Gana Naranja");
      window.setTimeout(()=>
      {
        // alert("Te han reventado Azul");
        // alert("Tu azulPuntos es de: "+naranjaPuntos+" Naranja");
        if (record < naranjaPuntos)
        {
          document.cookie = "record="+naranjaPuntos;
          // alert("Nuevo record");
        }else
        {
          // alert("El record sigue siendo "+record)
        }
        // alert("Haz click en Aceptar para comenzar una nueva partida");
        // window.location.reload();
        var azulVive=false;
      }  , 90);
      console.log("hola3");
      naranjaPuntos++;
      document.cookie = "naranjaPuntos="+ naranjaPuntos;
      Juego.break();
    }
    else
    {
      motoNaranja.pop();
      motoAzul.pop();
    }
    // Si no hay choque, se juega
    if (naranjaVive==true && azulVive==true)
    {
      Juego(velocidad);
      AparecerMotoNaranja();
      AparecerMotoAzul()
    }
  }
  , velocidad);
}
// Contador de las rondas
ronda++;
document.cookie = "ronda="+ronda;
// Play al Juegp
Juego(velocidad);
