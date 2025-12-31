const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const video = document.getElementById('romantic-video');
const music = document.getElementById('romantic-music');
const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

// Şarkı başlatma ve ekran geçişi
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 100);
    
    // Video ve Müzik Başlat
    video.play().catch(e => console.log("Video başlatılamadı:", e));
    music.volume = 0.5;
    music.play().catch(e => console.log("Müzik başlatılamadı:", e));
    
    startHeartRain();
});

// Kaçan Buton (Hayır Butonu)
const noBtn = document.getElementById('love-btn-no');
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Evet Butonu
const yesBtn = document.getElementById('love-btn-yes');
yesBtn.addEventListener('click', () => {
    alert('Biliyordum! Seni çok seviyorum Havin! ❤️❤️❤️');
    for(let i=0; i<50; i++) {
        createHeartAt(window.innerWidth / 2, window.innerHeight / 2);
    }
});

// Kalp Yağmuru Efekti
let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor(x, y, size, speedX, speedY) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || -50;
        this.size = size || Math.random() * 20 + 10;
        this.speedX = speedX || Math.random() * 2 - 1;
        this.speedY = speedY || Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.color = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${this.opacity})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > canvas.height + 50) {
            this.y = -50;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        // Kalp çizimi
        ctx.bezierCurveTo(
            this.x, this.y, 
            this.x - this.size / 2, this.y, 
            this.x - this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y, 
            this.x, this.y, 
            this.x, this.y + topCurveHeight
        );
        ctx.fill();
    }
}

function startHeartRain() {
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }
    animate();
}

function createHeartAt(x, y) {
    for(let i=0; i<5; i++) {
        hearts.push(new Heart(
            x, y, 
            Math.random() * 30 + 15, 
            Math.random() * 6 - 3, 
            Math.random() * 6 - 3
        ));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        
        // Çok fazla kalp birikmesini önlemek için bir sınır koyabiliriz
        if (hearts.length > 200) {
            hearts.shift();
        }
    });
    requestAnimationFrame(animate);
}
