// Initialization
AOS.init({ duration: 1000 });

// Remove Loader
window.addEventListener('load', () => {
    document.querySelector('.loader').style.display = 'none';
});

// THREE.JS - CINEMATIC STARFIELD & CORE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Background Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Geometric CAD Core (Dodecahedron)
const geometry = new THREE.DodecahedronGeometry(15, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true, transparent: true, opacity: 0.1 });
const core = new THREE.Mesh(geometry, material);
scene.add(core);

// Animation
function animate() {
    requestAnimationFrame(animate);
    core.rotation.x += 0.002;
    core.rotation.y += 0.002;
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
}

// GSAP Cinematic Entrance
gsap.from(".glitch-text", { duration: 2, opacity: 0, y: 50, ease: "power4.out", delay: 0.5 });
gsap.from(".reveal-text", { duration: 1.5, opacity: 0, letterSpacing: "20px", ease: "power3.out", delay: 0.8 });

// Parallax Scroll Effect
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    camera.position.z = 30 + scroll * 0.02;
    core.rotation.z = scroll * 0.001;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
// IMAGE MODAL FUNCTIONS
function openModal(imageSrc) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImage").src = imageSrc;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
