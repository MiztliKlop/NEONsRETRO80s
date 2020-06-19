/*Se obtiene el canvas del documento*/
var canvas = document.getElementById("myCanvas");
/*Se obtiene el contexto del canvas*/
var ctx = canvas.getContext("2d");
/*Se define el radio de la bola*/
var bolaRadius = 10;
/* Declarar las variables X y Y en base a la longitud y altura del canvas*/
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
/*Se definen las dimensiones de la raqueta, así como su posición*/
var raquetaHeight = 20;
var raquetaWidth = 80;
var raquetaX = (canvas.width - raquetaWidth) / 2;
/*Se definirán los eventos como un valor booloeano*/
var rightPressed = false;
var leftPressed = false;
/*Se definen el numero de filas y de columnas para definir la cantidad de ladrillos*/
var ladrilloRowCount = 11;
var ladrilloColumnCount = 11;
/*Se definen las dimensiones de los ladrillos*/
var ladrilloWidth = 75;
var ladrilloHeight = 20;
/*Separación que habrá entre los ladrillos*/
var ladrilloPadding = 10;
var ladrilloOffsetTop = 30;
var ladrilloOffsetLeft = 30;
/*Arreglo de los ladrillos*/
var ladrillos = [];
for (var c = 0; c < ladrilloColumnCount; c++) {
    ladrillos[c] = [];
    for (var r = 0; r < ladrilloRowCount; r++) {
        ladrillos[c][r] = {x: 0, y: 0, status: 1};
    }
}
/*Se asigna la cookie para almacenar el puntaje*/
var puntaje=getCookie("puntaje");
/*Se redefine el puntaje para que este inicie de 0*/
var puntaje=0;
/*Número de ladrillos golpeados que son definidos para 0*/
var ladrillosHit = 0;
var ladrillosHitPerLive = 0;
/*Número de vidas */
var Vidas = 3;
/*Función que devuelve la cookie*/
function getCookie(cname)
  {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  /*Función que va a dibujar la bola*/
function drawbola() {
    ctx.beginPath();
    ctx.arc(x, y, bolaRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
/*Función que dibuja a la raqueta*/
function drawraqueta() {
    ctx.beginPath();
    ctx.rect(raquetaX, canvas.height - raquetaHeight, raquetaWidth, raquetaHeight);
    ctx.fillStyle = "#00ffff";
    ctx.fill();
    ctx.closePath();
}
/*Funcion para dibujar a los ladrilllos*/
function drawladrillos() {
    for (var c = 0; c < ladrilloColumnCount; c++) {
        for (var r = 0; r < ladrilloRowCount; r++) {
            if (ladrillos[c][r].status == 1) {
                var ladrilloX = (c * (ladrilloWidth + ladrilloPadding)) + ladrilloOffsetLeft;
                var ladrilloY = (r * (ladrilloHeight + ladrilloPadding)) + ladrilloOffsetTop;
                ladrillos[c][r].x = ladrilloX;
                ladrillos[c][r].y = ladrilloY;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY, ladrilloWidth, ladrilloHeight);
                ctx.fillStyle = "#FFE100";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
/*Funcion que dibuja al Puntaje*/
function drawPuntaje() {
    ctx.font = "27px Monoton-Regular";
    ctx.fillStyle = "white";
    ctx.fillText("Puntaje:" + puntaje, 8, 25)
}
/*Funcion para restar las vidas*/
function drawVidas() {
    ctx.font = "27px Monoton-Regular";
    ctx.fillStyle = "white";
    ctx.fillText("Vidas: " + Vidas, canvas.width - 200, 25)
}
/*Función que dibujará el campo de juego totalmente*/
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawladrillos();
  drawraqueta();
  drawbola();
  drawPuntaje();
  drawVidas();
  collisionDetection();

  if (x + dx > canvas.width - bolaRadius || x + dx < bolaRadius) {
    dx = -dx;
  }
  if (y + dy < bolaRadius + bolaRadius) {
    dy = -dy;
  }
  else if (y + dy > canvas.height - bolaRadius) {
    if (x > raquetaX && x < raquetaX + raquetaWidth && y + dy > canvas.height - raquetaHeight * 2) {
      dy = -dy - 0.2;
    }
    else {
      Vidas--;
      ladrillosHitPerLive = 0;
      if (!Vidas) {
        document.querySelector(".game-over").style.display = "block";
        return;
        function del_cookie() {
          document.cookie = 'roundcube_sessauth' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
        del_cookie("puntaje");
      }
      else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        raquetaX = (canvas.width - raquetaWidth) / 2;
      }
    }
  }
  x += dx;
  y += dy;

  if (rightPressed) {
    raquetaX += 5;
    if (raquetaX + raquetaWidth > canvas.width) {
      raquetaX = canvas.width - raquetaWidth;
    }
  }
  else if (leftPressed) {
    raquetaX -= 5;
    if (raquetaX < 0) {
      raquetaX = 0;
    }
  }
  requestAnimationFrame(draw);
}
/*Eventos de acuerdo a las teclas que se presionan*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/*Función para generar el movimiento de la pelota a la derecha*/
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
/*Función para generar el movimiento de la pelota a la izquierda*/
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
    }
}
draw();
/*Funcion para detectar colisiones y que aumente el puntaje*/
function collisionDetection() {
  for (var c = 0; c < ladrilloColumnCount; c++) {
    for (var r = 0; r < ladrilloRowCount; r++) {
      var b = ladrillos[c][r];
        if (b.status == 1) {
          if (x > b.x && x < b.x + ladrilloWidth && y > b.y && y < b.y + ladrilloHeight) {
            dy = -dy;
            b.status = 0;
            ladrillosHit++;
            ladrillosHitPerLive++;
            puntaje++;
            document.cookie = puntaje;
            /*puntaje+=ladrillosHitPerLive;*/
            if (ladrillosHit == ladrilloRowCount * ladrilloColumnCount) {
              document.querySelector(".congratulations").style.display = "block";
              drawbola.break();
              function del_cookie() {
                document.cookie = 'roundcube_sessauth' +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
              }
              del_cookie("puntaje");
              return;
          }
        }
      }
    }
  }
}
