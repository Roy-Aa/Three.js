import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const container = document.getElementById("canvas1");

if (container) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

// Camera controls -->

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far,);
camera.position.z = 2;
const scene = new THREE.Scene();

// Camera controls -->

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Camera controls -->

const geo = new THREE.TorusGeometry(1,1);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});

// Mesh om het object heen -->

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
mesh.add(wireMesh);

// Lines around the object -->

// Light controls -->

const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x0050ff);
scene.add(hemiLight)

scene.rotation.x += 33; // Draaien om de Y-as

// Light controls -->

function animate( t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.z = t * 0.0002;
    renderer.render(scene, camera);
    controls.update();
}
animate();

}