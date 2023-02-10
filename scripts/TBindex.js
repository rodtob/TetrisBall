import * as THREE from 'three';
import {THREEx} from 'threex';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const titulocambia = document.getElementById('titulo');

function fadeout() {
  titulocambia.classList.toggle('fade-out');
}

var camera,
  keyboard,
  renderer,
  scene,
  light,
  geometry,
  material,
  lacabra,
  piso,
  mpiso,
  pisomaterial,
  physics_stats,
  table,
  intersect_plane,
  table_material,
  ground,
  setMousePosition,
  mouse_position,
  box,
  sphere_material,
  borde_left,
  borde_right,
  box1,
  box2,
  piso,
  cubo,
  mtrap,
  trap,
  prectangular,
  transparente,
  materialClip,
  cliprombo_material,
  nuevapelota,
  cristal,
  impulse,
  frames,
  tet2_material,
  rombo,
  tet1_material,
  pivot,
  Lpivot,
  pDerecha,
  pIzq,
  puntos,
  latimeLine,
  scoreboard,
    impusle,
    controls,
    ground_material,
    paleta_material,
    pivot_material,
    botonL,
    botonLp,
    botonR,
    botonRp,
    sphere,
    techo,
    otrorombo,

  score = { player1: 0 };

var keyboard = {};

scoreboard = document.getElementById('scoreBoard');

var tri;
var raycaster = new THREE.Raycaster();
//BASE

function init() {
  frames = 0;

  puntos = 0;
  impusle = new THREE.Vector3();
  impusle.set(0, 0, 0);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  controls.enableKeys = false;

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  scene = new Physijs.Scene();
  scene.setGravity(new THREE.Vector3(0, -3, 0));
  scene.addEventListener(
    'update',

    function () {
      scene.simulate(undefined, 1);
      impusle = new THREE.Vector3();
      impusle.set(0, 0, 0);
      sphere.applyCentralImpulse(impusle);
    }
  );

  light = new THREE.SpotLight(0xffffff, 0.5);
  light.intensity = 2;

  var spotLightHelper = new THREE.SpotLightHelper(light);
  scene.add(light);

  light.position.set(0, 10, 20);

  //MATERIALES

  materialClip = new THREE.MeshLambertMaterial({
    color: 0x80ee10,
    shininess: 10,
  });

  cliprombo_material = new Physijs.createMaterial(
    materialClip,
    6, // friction
    0.2 // restitution
  );

  ground_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0x2348888 }),
    6, // friction
    0.2 // restitution
  );

  paleta_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0xab76db }),
    6, // friction
    3 // restitution
  );

  pivot_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0xef46db }),
    6, // friction
    0.2 //restitution
  );

  tet1_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0xac5861 }),
    6, // hfriction
    0.2 // restitution
  );

  tet2_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0x9265ba }),
    6,
    0.2
  );

  transparente = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.3,
  });

  sphere_material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0xab76db }),
    2, // slippery
    7 // bounciness
  );

  //OBJETOS

  rombo = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 2, 0.5),
    cliprombo_material,
    0
  );

  botonL = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 2, 0.5),
    paleta_material,
    0
  );
  botonLp = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 0.5),
    cliprombo_material,
    0
  );
  botonL.add(botonLp);
  botonLp.position.z = 0.5;

  botonR = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 2, 0.5),
    paleta_material,
    0
  );
  botonRp = new Physijs.BoxMesh(
    new THREE.BoxGeometry(1, 1, 0.5),
    cliprombo_material,
    0
  );
  botonR.add(botonRp);
  botonRp.position.z = 0.5;

  sphere = new Physijs.SphereMesh(
    new THREE.SphereBufferGeometry(0.4, 0.4, 5),
    sphere_material,
    0
  );

  pIzq = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2.5, 0.5, 1, 5, 5, 5),
    paleta_material,
    1
  );

  pDerecha = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2.5, 0.5, 1, 5, 5, 5),
    paleta_material,
    1
  );

  cubo = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    pivot_material,
    0
  );

  pivot = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.5, 0.5, 1),
    pivot_material,
    0
  );

  Lpivot = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.5, 0.5, 1),
    pivot_material,
    0
  );

  piso = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(14, 3, 1),
    tet2_material,
    0
  );

  box = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(5, 0.2, 5),
    ground_material,
    0
  );

  cristal = new Physijs.BoxMesh(
    new THREE.BoxGeometry(14, 19, 0.2),
    transparente,
    0
  );

  techo = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(14, 1, 1),
    ground_material,
    0
  );

  borde_left = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.3, 20, 2),
    ground_material,
    0
  );

  borde_right = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.3, 20, 2),
    ground_material,
    0
  );

  borde_right.position.set(7.2, 0, 1);
  borde_left.position.set(-7.2, 0, 1);
  techo.position.set(0, 9.5, 1);

  botonR.position.set(8.2, -5.4, 1);
  botonL.position.set(-8.2, -5.4, 1);
  scene.add(botonL);
  scene.add(botonR);

  scene.add(borde_left);
  scene.add(techo);
  scene.add(borde_right);
  cristal.position.z = 1;
  rombo.rotation.z = 0.785398;
  rombo.position.set(0, 4.5, 1);
  box.position.set(0, 0, 0.5);
  cristal.position.z = 1.5;
  box.rotation.x = Math.PI / 2;
  box.scale.set(3, 1, 4);
  sphere.position.set(-3, 3, 1);
  scene.add(box);
  pivot.position.set(3.7, -4.5, 1);
  pivot.rotation.z = 0.2;
  Lpivot.scale.set(-1, 1, -1);
  Lpivot.position.set(-3.7, -4.5, 1);
  pIzq.position.set(1.6, 0, 0);
  pDerecha.position.set(-1.6, 0, 0);
  Lpivot.scale.set(1, -1, 1);
  Lpivot.rotation.z = -0.2;
  piso.position.set(0, -8.3, 1);

  cubo.position.set(-6.5, -4, 1);
  Lpivot.add(pIzq);
  pivot.add(pDerecha);
  scene.add(pivot);
  scene.add(Lpivot);
  scene.add(piso);
  scene.add(rombo, cristal);
  scene.add(cristal);

  camera.position.z = 30;
  scene.add(light, light.target, camera, ground);

  //LADOizq
  crearRombos(4, 0.4, -6, 3.4, 0.35);
  crearRombos(3, 0.4, -6, -2.8, 0.35);
  crearRombos(1, 1, -5.3, -6, 2);
  crearRombos(1, 0.7, -6, 0, 2);

  //LADOder
  crearRombos(4, 0.4, 6, 3.4, 0.35);
  crearRombos(3, 0.4, 6, -2.8, 0.35);
  crearRombos(1, 1, 5.3, -6, 2);
  crearRombos(1, 0.7, 6, 0, 2);

  //INTERACTIVIDAD

  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

  domEvents.addEventListener(botonR, 'click', (event) => {
    moverPderecha();
  });

  domEvents.addEventListener(botonL, 'click', (event) => {
    moverPizquierda();
  });

  latimeLine = new TimelineMax();

  animate();
}

//FUNCIONES

function moverboton(boton) {
  latimeLine.to(boton.position, 0.5, { z: 1.2, ease: Expo.easeOut });
  latimeLine.to(boton.position, 0.5, { z: 1, ease: Expo.easeOut });
}

function crearRombos(cantidad, tamano, lugarx, lugary, espacioentre) {
  var j = 0;
  for (var i = 0; i < cantidad; i++) {
    otrorombo = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 2, 0.5),
      paleta_material,
      0
    );

    lugary += espacioentre;
    otrorombo.position.y = i + lugary;
    otrorombo.position.z = 1;
    otrorombo.position.x = lugarx;
    otrorombo.scale.set(tamano, tamano, tamano);
    otrorombo.rotation.z = 0.785398;
    scene.add(otrorombo);
  }
}

function moverPderecha() {
  latimeLine.to(pivot.rotation, 0.1, { z: -1.4, ease: Expo.easeOut });
  latimeLine.to(pivot.rotation, 1.1, { z: 0.2, ease: Expo.easeOut });
}

function moverPizquierda() {
  latimeLine.to(Lpivot.rotation, 0.1, { z: 1.4, ease: Expo.easeOut });
  latimeLine.to(Lpivot.rotation, 1.1, { z: -0.2, ease: Expo.easeOut });
}

function moverPalancas() {
  pDerecha.__dirtyRotation = true;
  pivot.__dirtyRotation = true;
  pIzq.__dirtyRotation = true;
  Lpivot.__dirtyRotation = true;
  pDerecha.__dirtyPosition = true;
  pivot.__dirtyPosition = true;
  pIzq.__dirtyPosition = true;
  Lpivot.__dirtyPosition = true;
  botonL.__dirtyPosition = true;
  botonR.__dirtyPosition = true;
}

function moverCamara() {
  camera.position.z = 24;
  camera.position.y = 1;
  camera.rotation.x = -0.0003;
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

function keyLeft(event) {
  keyboard[event.keyCode] = true;
}

function keyRight(event) {
  keyboard[event.keyCode] = false;
}

function generarPelota() {
  nuevapelota = new Physijs.SphereMesh(
    new THREE.SphereBufferGeometry(0.4, 20, 20),
    sphere_material,
    3
  );

  var num = Math.floor(Math.random() * 5) + 1;
  num *= Math.floor(Math.random() * 1.5) == 1 ? 1 : -1;
  nuevapelota.position.set(num, 6, 1);

  return scene.add(nuevapelota);
}

function updateScoreBoard() {
  scoreBoard.innerHTML = 'Score: ' + score.player1;
  scoreBoard.style.position = 'absolute';
}

function mensajeGanaste() {
  scoreBoard.innerHTML = 'Ganaste';
  scoreBoard.style.fontsize = '20%';
}

function addPoint() {
  score.player1 += 1;
}

function golpeColor(obj1, obj2, obj3, colore) {
  box1 = new THREE.Box3().setFromObject(obj1);

  box2 = new THREE.Box3().setFromObject(obj2);

  box1.expandByScalar(1.2);

  var intersects = box1.intersectsBox(box2);
  if (intersects && obj3.material.color != colore) {
    obj3.material.color.setHex(colore);
  } else {
    obj3.material.color.setHex(0x992073);
  }
}

function inter(obj1, obj2) {
  box1 = new THREE.Box3().setFromObject(obj1);

  box2 = new THREE.Box3().setFromObject(obj2);

  var intersects = box1.intersectsBox(box2);

  if (intersects) {
    score.player1 -= 1;
    sacarynpelota();
    if (frames % 2 == 0) {
      btron(1, Math.random() * 2, -1, 0x8f34eb);
    } else if (frames % 3 == 0) {
      btrin(1, Math.random() * 2, -1, 0x992073);
    } else {
      barrita(1, Math.random() * 2, -1, 0xffec40);
    }
  }
}

function crearCubo(colore) {
  var geo = new THREE.BoxGeometry(0.46, 0.46, 0.46);

  var material = new Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: colore }),
    6, // high friction
    0.1 // low restitution
  );

  var ncubo = new Physijs.BoxMesh(geo, material, 1);

  return ncubo;
}

function barrita(tamano, x, y, colore) {
  var group = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.1, 0.1, 0.1),
    pivot_material,
    1
  );
  for (var i = 0; i < 4; i++) {
    var barrita = crearCubo(colore);
    barrita.position.x = 0;
    barrita.position.y = i / 2;
    group.add(barrita);
  }
  group.scale.set(tamano, tamano, tamano);
  group.position.set(x, y, 1);
  group.rotation.z = 0;

  scene.add(group);
}

function btrin(tamano, x, y, colore) {
  var group = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.1, 0.1, 0.1),
    tet2_material,
    0.2
  );
  for (var i = 0; i < 3; i++) {
    var btrin = crearCubo(colore);
    btrin.position.x = 0;
    btrin.position.y = i / 2;

    group.add(btrin);
  }
  var eldearriba = crearCubo(colore);
  eldearriba.position.x = -0.5;
  group.add(eldearriba);
  group.scale.set(tamano, tamano, tamano);
  group.position.set(x, y, 1);
  scene.add(group);
}

function btron(tamano, x, y, colore) {
  var group = new Physijs.BoxMesh(
    new THREE.BoxBufferGeometry(0.1, 0.1, 0.1),
    pivot_material,
    1
  );
  for (var i = 0; i < 3; i++) {
    var btrin = crearCubo(colore);
    btrin.position.x = 0;
    btrin.position.y = i / 2;
    group.add(btrin);
  }

  var eldearriba = crearCubo(colore);
  eldearriba.position.x = -0.5;
  eldearriba.position.y = 0.5;
  group.add(eldearriba);
  group.scale.set(tamano, tamano, tamano);
  group.position.set(x, y, 1);

  scene.add(group);
}

function sacarynpelota() {
  scene.remove(nuevapelota);
  generarPelota();
}

//LOOP

function animate() {
  scene.simulate();

  scene.addEventListener('update', moverPalancas);

  if (frames == 0) {
    generarPelota();
  }

  if (nuevapelota != undefined) {
    nuevapelota.applyCentralImpulse(impusle);
  }
  golpeColor(rombo, nuevapelota, rombo, 0xf7ed2d);
  inter(piso, nuevapelota);

  updateScoreBoard();
  if (score.player1 > 400) {
    mensajeGanaste();
  }

  scene.addEventListener('update', function () {
    scene.simulate(undefined, 2);
  });

  renderer.render(scene, camera);
  frames += 1;
  requestAnimationFrame(animate);
}

window.onload = init;
