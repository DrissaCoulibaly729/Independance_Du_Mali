// Author: Alfa

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const gravity = 0.05;
const friction = 0.99;
let particles = [];
let particleCount = 1000;
let mouse;

// Classe des particules de feux d'artifice
class Particle {
  constructor(x, y, r, color, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = velocity.x;
    this.dy = velocity.y;
    this.opacity = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.dy += gravity;
    this.dx *= friction;
    this.dy *= friction;
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= 0.01;
  }
}

// Animation des particules
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, .09)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, i) => {
    if (particle.opacity > 0) {
      particle.update();
    } else {
      particles.splice(i, 1);
    }
  });
}

// Fonction pour la première explosion unique
function firstExplosion(x = canvas.width / 2, y = canvas.height / 2) {
  let speed = 50;
  let angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(x, y, 2, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * speed,
        y: Math.sin(angleIncrement * i) * Math.random() * speed
      })
    );
  }
}

// Fonction pour les explosions répétées
function explode(x = canvas.width / 2, y = canvas.height / 2) {
  let speed = 40;
  let angleIncrement = (Math.PI * 2) / 100;

  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle(x, y, 2, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * speed,
        y: Math.sin(angleIncrement * i) * Math.random() * speed
      })
    );
  }
}

// Lancement de la première explosion unique au chargement
window.addEventListener('load', () => {
  firstExplosion(); // Explosion initiale
  animate(); // Commence l'animation continue

  // Commence les explosions répétées après la première
  setTimeout(() => {
    setInterval(() => {
      explode(Math.random() * canvas.width, Math.random() * canvas.height);
    }, 2000); // Explosion toutes les 2 secondes
  }, 3000); // Attends 3 secondes avant de commencer les explosions répétées

  // Compteur dynamique pour l'indépendance
  const currentYear = new Date().getFullYear();
  const independenceYear = 1960;
  const yearsOfIndependence = currentYear - independenceYear;

  const counterElement = document.getElementById('counter');
  counterElement.textContent = `${yearsOfIndependence} ans de fierté et de liberté`;
});
