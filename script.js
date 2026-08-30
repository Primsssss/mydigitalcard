// 1. Interactive Accent Color Switcher via Avatar Tap
const colorPalettes = [
    { primary: '#38bdf8', accent: '#818cf8' }, // Cyber Blue
    { primary: '#ec4899', accent: '#8b5cf6' }, // Neon Pink
    { primary: '#10b981', accent: '#06b6d4' }, // Emerald Green
    { primary: '#a855f7', accent: '#ec4899' }, // Electric Purple
    { primary: '#f59e0b', accent: '#ef4444' }  // Sunset Gold
];

let colorIndex = 0;

function changeAccentColor() {
    playClickSound();
    colorIndex = (colorIndex + 1) % colorPalettes.length;
    const selected = colorPalettes[colorIndex];

    document.documentElement.style.setProperty('--primary-glow', selected.primary);
    document.documentElement.style.setProperty('--accent-glow', selected.accent);
}

// 2. Tab Switching Logic
function switchTab(tabName) {
    playClickSound();
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. Dark / Light Mode Toggle
function toggleTheme() {
    playClickSound();
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// 4. Dynamic Time Greeting
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (hour < 12) greetingEl.innerHTML = '☕ GOOD MORNING';
    else if (hour < 18) greetingEl.innerHTML = '☀️ GOOD AFTERNOON';
    else greetingEl.innerHTML = '🌙 GOOD EVENING';
}
updateGreeting();

// 5. Typewriter Effect
const textArray = ["Web Developer", "Tech Enthusiast", "Student & Creator"];
let textIndex = 0;
let charIndex = 0;
const typewriterEl = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterEl.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterEl.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 500);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 800);
    playBootSound();
});

// 6. Sound & Vibration Effects
function playSound(freq, type, duration) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

function playBootSound() { playSound(440, 'sine', 0.5); }
function playClickSound() { vibratePhone(); playSound(600, 'triangle', 0.1); }
function vibratePhone() { if ("vibrate" in navigator) navigator.vibrate(35); }

// 7. Music Player Logic
const music = document.getElementById('bg-music');
const playIcon = document.getElementById('play-icon');
const musicText = document.getElementById('music-text');
const disc = document.getElementById('disc');
const visualizer = document.getElementById('visualizer');

function toggleMusic() {
    playClickSound();
    if (music.paused) {
        music.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        musicText.textContent = "Pause Track";
        disc.classList.add('spinning');
        visualizer.classList.add('playing');
    } else {
        music.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        musicText.textContent = "Play Track";
        disc.classList.remove('spinning');
        visualizer.classList.remove('playing');
    }
}

// 8. Background Particles
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 25; i++) particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();