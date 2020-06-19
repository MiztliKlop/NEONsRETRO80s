/*Se definen las constantes para las teclas*/
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
/*Se definen como constantes las dimensiones del juego*/
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
/*Se definen las constantes ligadas a la interfaz del juego */
const Halconm_WIDTH = 20;
const Halconm_MAX_SPEED = 600.0;
const LASER_MAX_SPEED = 300.0;
const LASER_MAX_SPEED_Halconm = 200.0;
const LASER_COOLDOWN = 0.5;

const cazas_PER_ROW = 11;
const caza_HORIZONTAL_PADDING = 80;
const caza_VERTICAL_PADDING = 70;
const caza_VERTICAL_SPACING = 80;
const caza_COOLDOWN = 5.0;
/*Se define la cookie del puntaje*/
var puntaje=getCookie("puntaje");

/* En un arreglo se define el estado del juego*/
const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  HalconmX: 0,
  HalconmY: 0,
  HalconmCooldown: 0,
  lasers: [],
  cazas: [],
  cazaLasers: [],
  gameOver: false

};
/*Función para obtener la cookie*/
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
/*Funcion para intersectar las rectas*/
function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
/*Funcion para dar posiciones*/
function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}
/*Funcion para mover el halcon */
function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}
/*Funcion para generar un nuemro random*/
function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}
/*Función para crear al halcon*/
function createHalconm($container) {
  GAME_STATE.HalconmX = GAME_WIDTH / 2;
  GAME_STATE.HalconmY = GAME_HEIGHT - 50;
  const $Halconm = document.createElement("img");
  $Halconm.src = "../statics/media/img/halcon.png";
  $Halconm.className = "Halconm";
  $container.appendChild($Halconm);
  setPosition($Halconm, GAME_STATE.HalconmX, GAME_STATE.HalconmY);
}
/*Función para destruir al halcon*/
function destroyHalconm($container, Halconm) {
  $container.removeChild(Halconm);
  GAME_STATE.gameOver = true;
  const audio = new Audio("../statics/media/track/explosion.mp3");
  audio.play();
}
/*Funcion para modificar la posicion del halcon*/
function updateHalconm(dt, $container) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.HalconmX -= dt * Halconm_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.HalconmX += dt * Halconm_MAX_SPEED;
  }

  GAME_STATE.HalconmX = clamp(
    GAME_STATE.HalconmX,
    Halconm_WIDTH,
    GAME_WIDTH - Halconm_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.HalconmCooldown <= 0) {
    createLaser($container, GAME_STATE.HalconmX, GAME_STATE.HalconmY);
    GAME_STATE.HalconmCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.HalconmCooldown > 0) {
    GAME_STATE.HalconmCooldown -= dt;
  }

  const Halconm = document.querySelector(".Halconm");
  setPosition(Halconm, GAME_STATE.HalconmX, GAME_STATE.HalconmY);
}
/*Función para crear el laser del halcon*/
function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "../statics/media/img/laser-green-11.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  const audio = new Audio("../statics/media/track/blaster.mp3");
  audio.play();
  setPosition($element, x, y);
}
/*Función para actualizar los lasers*/
function updateLasers(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED_Halconm;
    if (laser.y < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const cazas = GAME_STATE.cazas;
    for (let j = 0; j < cazas.length; j++) {
      const caza = cazas[j];
      if (caza.isDead) continue;
      const r2 = caza.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        destroycaza($container, caza);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}
/*Función para destruir los lasers*/
function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}
/*Función para crear el caza*/
function createcaza($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "../statics/media/img/caza.png";
  $element.className = "caza";
  $container.appendChild($element);
  const caza = {
    x,
    y,
    cooldown: rand(0.5, caza_COOLDOWN),
    $element
  };
  GAME_STATE.cazas.push(caza);
  setPosition($element, x, y);
}
/*Función para actualizar el Caza*/
function updatecazas(dt, $container) {
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const cazas = GAME_STATE.cazas;
  for (let i = 0; i < cazas.length; i++) {
    const caza = cazas[i];
    const x = caza.x + dx;
    const y = caza.y + dy;
    setPosition(caza.$element, x, y);
    caza.cooldown -= dt;
    if (caza.cooldown <= 0) {
      createcazaLaser($container, x, y);
      caza.cooldown = caza_COOLDOWN;
    }
  }
  GAME_STATE.cazas = GAME_STATE.cazas.filter(e => !e.isDead);
}

/*Funcion para crear las explosiones*/
function createExplosion($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "../statics/media/img/dcaza.png";
  $element.className = "explosion";
  const laser = { x, y, $element };
  $container.appendChild($element);
  GAME_STATE.cazaLasers.push(laser);
  setPosition($element, x, y);
}
/*Funcion para destruir el caza*/
function destroycaza($container, caza) {
  $container.removeChild(caza.$element);
  const audio = new Audio("../statics/media/track/expcaza.m4a");
  audio.play();
  puntaje++;
  document.getElementById("Puntuacion").innerHTML= "Puntaje="+ (puntaje*405);
  document.cookie = (puntaje*405);
  caza.isDead = true;
  var cazas = GAME_STATE.cazas;
  for (let i = 0; i < cazas.length; i++) {
    var caza = cazas[i];
    var x = Math.floor((Math.random()*(caza.x)));
    var y = caza.y;
  }
  createExplosion($container, x, y);
  setInterval(createExplosion,10000*20);
}

/*Funcion para generar los lasers*/
function createcazaLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "../statics/media/img/laser-red-5.png";
  $element.className = "caza-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.cazaLasers.push(laser);
  const audio = new Audio("../statics/media/track/sfx-laser1.ogg");
  audio.play();
  setPosition($element, x, y);
}
/*Funcion para actualizar los cazas*/
function updatecazaLasers(dt, $container) {
  const lasers = GAME_STATE.cazaLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const Halconm = document.querySelector(".Halconm");
    const r2 = Halconm.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Halconm was hit
      destroyHalconm($container, Halconm);
      break;
    }
  }
  GAME_STATE.cazaLasers = GAME_STATE.cazaLasers.filter(e => !e.isDead);
}
/*Funcion para posicionar el halcon*/
function init() {
  const $container = document.querySelector(".game");
  createHalconm($container);

  const cazaSpacing =
    (GAME_WIDTH - caza_HORIZONTAL_PADDING * 2) / (cazas_PER_ROW - 1);
  for (let j = 0; j < 4 ; j++) {
    const y = caza_VERTICAL_PADDING + j * caza_VERTICAL_SPACING;
    for (let i = 0; i < cazas_PER_ROW; i++) {
      const x = i * cazaSpacing + caza_HORIZONTAL_PADDING;
      createcaza($container, x, y);
    }
  }

}
/*Funcion para cuando gane el caza*/
function HalconmHasWon() {
  return GAME_STATE.cazas.length === 0;
}
/*Funcion para actualizar*/
function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  if (GAME_STATE.gameOver) {
    const audio = new Audio("../statics/media/track/darkside.mp3");
    audio.play();
    function del_cookie() {
    document.cookie = 'roundcube_sessauth' +
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
     }
    del_cookie("puntaje");
    document.querySelector(".game-over").style.display = "block";
    return;
  }
  /*Si el halcon gana hará el if*/
  if (HalconmHasWon()) {
    const audio = new Audio("../statics/media/track/chewbacca.mp3");
    audio.play();
    document.querySelector(".congratulations").style.display = "block";
    function del_cookie() {
    document.cookie = 'roundcube_sessauth' +
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
     }
    del_cookie("puntaje");
    return;
  }
  const $container = document.querySelector(".game");
  updateHalconm(dt, $container);
  updateLasers(dt, $container);
  updatecazas(dt, $container);
  updatecazaLasers(dt, $container);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}
/*Funcion para las teclas*/
function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
}
/*Funcion para las teclas*/
function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}
init();
/*Eventos de las teclas*/
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
