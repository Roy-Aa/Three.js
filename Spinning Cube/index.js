import * as THREE from "three";
import { OrbitControls} from "jsm/controls/OrbitControls.js"
const w = window.innerWidth;
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Camera controls -->

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far,);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);

// Camera controls -->

controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.BoxGeometry(1);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});

// Mesh om het object heen -->

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
mesh.add(wireMesh);

// Lines around the object -->

// Light controls -->

const hemiLight = new THREE.HemisphereLight(0x00ff99, 0x991100);
scene.add(hemiLight)

// Light controls -->

function animate( t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0005;
    mesh.rotation.x = t * 0.0005;
    renderer.render(scene, camera);
    controls.update();
}
animate();
