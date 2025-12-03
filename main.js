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

const canvas = document.createElement('canvas');
canvas.width = 1;
canvas.height = 256;
const context = canvas.getContext('2d');


const gradient = context.createLinearGradient(0, 0, 0, 256);
gradient.addColorStop(0, '#b7d4ff');
gradient.addColorStop(0.5, '#e6c8ff');
gradient.addColorStop(1, '#ffcae8');

context.fillStyle = gradient;
context.fillRect(0, 0, 1, 256);

const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.LinearFilter;
texture.minFilter = THREE.LinearFilter;

const scene = new THREE.Scene();
scene.background = texture;

const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(8, 18, 16);

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

// responsive design.
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-toggle-btn');
const nowPlaying = document.getElementById('now-playing');

// play or stop the music
musicBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (music.paused) {
    music.play();
    nowPlaying.textContent = "Now Playing: Musique pour la tristesse de Xion";
  } else {
    music.pause();
    nowPlaying.textContent = "Paused";
  }
});

// starts to play the music if detects movement
window.addEventListener('load', () => {
  music.play().then(() => {
    nowPlaying.textContent = "Now Playing: Musique pour la tristesse de Xion";
  }).catch(() => {
    const startMusic = () => { 
      music.play().then(() => { nowPlaying.textContent = "Now Playing: Musique pour la tristesse de Xion"; })
        .catch(()=>{}); 
      window.removeEventListener('click', startMusic);
      window.removeEventListener('scroll', startMusic); 
    };
    window.addEventListener('click', startMusic);
    window.addEventListener('scroll', startMusic);
  });
});

// animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
