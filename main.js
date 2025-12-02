// funcionalidad secciones
document.querySelectorAll('#sidebar .section').forEach(section => {
  const header = section.querySelector('h2');
  header.addEventListener('click', () => {
    const content = section.querySelector('.section-content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

// funcionalidad de botones dentro de secciones
document.querySelectorAll('.project-toggle').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const content = button.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
      button.classList.remove('open');
    } else {
      content.style.display = 'block';
      button.classList.add('open');
    }
  });
});

// three.js
const container = document.getElementById("model-viewer");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const loader = new THREE.GLTFLoader();
loader.load(
  'assets/models/roomportfolio.glb',
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// responsive design
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
