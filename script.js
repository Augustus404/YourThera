const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 40; // Fewer particles for "falling stars" feel

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class FallingStar {
    constructor() {
        this.init();
    }

    init() {
        // Randomly start from top area
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;

        // Falling down and slightly to the side
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = 1 + Math.random() * 2; // Fast fall speed

        this.length = 10 + Math.random() * 30; // Length of the star trail
        this.size = 0.5 + Math.random() * 1;
        this.opacity = 0;
        this.maxOpacity = 0.1 + Math.random() * 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Fade in as they fall into view
        if (this.y > 0 && this.opacity < this.maxOpacity) {
            this.opacity += 0.01;
        }

        // Reset if off screen
        if (this.y > canvas.height) {
            this.init();
        }
    }

    draw() {
        // Draw the star head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 185, 154, ${this.opacity})`;
        ctx.fill();

        // Draw the trail
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.vx * 10, this.y - this.vy * 10);
        gradient.addColorStop(0, `rgba(201, 185, 154, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(201, 185, 154, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * this.length, this.y - this.vy * this.length);
        ctx.stroke();
    }
}

function createStars() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new FallingStar());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

createStars();
animate();