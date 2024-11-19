import * as THREE from "three";
import { LCCRender } from "./lcc-0.2.0";

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 10, 30); // Start further back for a better map/game perspective

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 3D model using LCCRender
const lccObj = LCCRender.load(
  {
    camera: camera,
    scene: scene,
    dataPath: "http://192.168.1.5:5173/LEGOPanda", // Adjust if different
    renderLib: THREE,
    canvas: renderer.domElement,
  },
  function (mesh) {
    console.log("Model loaded", mesh);
  },
  function (percent) {
    console.log("Model loaded: " + percent * 100 + "%");
  }
);

// Controls parameters
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

const moveSpeed = 0.5; // Movement speed
const rotationSpeed = 0.01; // Mouse rotation speed
const zoomSpeed = 0.2; // Zoom sensitivity

// Interaction state
const movement = { forward: false, backward: false, left: false, right: false };

// Mouse-based rotation
document.addEventListener("mousedown", (event) => {
  isDragging = true;
  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;

    // Rotate the scene around the Y-axis (horizontal rotation)
    scene.rotation.y -= deltaX * rotationSpeed;

    // Tilt the camera (vertical rotation) while clamping to prevent flipping
    camera.rotation.x -= deltaY * rotationSpeed;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Zoom using the mouse wheel
document.addEventListener("wheel", (event) => {
  const zoomDelta = event.deltaY * zoomSpeed;
  camera.position.z = Math.max(5, Math.min(100, camera.position.z + zoomDelta));
});

// Keyboard-based movement
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      movement.forward = true;
      break;
    case "KeyS":
    case "ArrowDown":
      movement.backward = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      movement.left = true;
      break;
    case "KeyD":
    case "ArrowRight":
      movement.right = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      movement.forward = false;
      break;
    case "KeyS":
    case "ArrowDown":
      movement.backward = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      movement.left = false;
      break;
    case "KeyD":
    case "ArrowRight":
      movement.right = false;
      break;
  }
});

// Maintain aspect ratio on window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Update the camera position based on movement
function updateMovement() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  direction.y = 0; // Keep movement in the XZ plane
  direction.normalize();

  if (movement.forward) camera.position.addScaledVector(direction, moveSpeed);
  if (movement.backward) camera.position.addScaledVector(direction, -moveSpeed);

  const strafeDirection = new THREE.Vector3(-direction.z, 0, direction.x);
  if (movement.left) camera.position.addScaledVector(strafeDirection, moveSpeed);
  if (movement.right) camera.position.addScaledVector(strafeDirection, -moveSpeed);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}

animate();
