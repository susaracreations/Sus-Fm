import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Lavalink Server API Configuration
const LAVALINK_API_KEY = 'fsv0RfIosZeARdoF5dVxJhZfbdVMfSAoRZoeqVaYvUimMdFr';

// --- Mobile Menu Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            // Trigger reflow for transition
            void mobileMenu.offsetWidth;
            mobileMenu.classList.remove('opacity-0', 'scale-95');
        } else {
            mobileMenu.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    });
}

// --- Scroll Reveal Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});

// --- Magnetic Buttons ---
// Only enable on desktop
if (window.matchMedia("(hover: hover)").matches) {
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// --- Spotlight Card Effect ---
const spotlightCards = document.querySelectorAll('.spotlight-card');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- 3D Tilt Effect ---
const tiltCards = document.querySelectorAll('.tilt-card');

// Only enable tilt on devices that support hover (desktops) to prevent mobile jitter
if (window.matchMedia("(hover: hover)").matches) {
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// --- Modern Header: Sliding Pill Effect ---
const navLinks = document.querySelectorAll('.nav-link');
const navPill = document.getElementById('nav-pill');
const navContainer = document.querySelector('nav');

if (navContainer && navPill) {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const navRect = navContainer.getBoundingClientRect();
            
            // Calculate position relative to the container
            const left = rect.left - navRect.left;
            const width = rect.width;

            navPill.style.width = `${width}px`;
            navPill.style.transform = `translateX(${left}px)`;
            navPill.style.opacity = '1';
        });
    });

    navContainer.addEventListener('mouseleave', () => {
        navPill.style.opacity = '0';
    });
}

// --- Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (using animate for smoothness)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// --- Text Scramble Effect ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Scramble
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Discord Audio',
        'Music Quality',
        'Lavalink Speed',
        'Vibe Sessions'
    ];
    
    const el = document.querySelector('.scramble-text');
    if(el) {
        const fx = new TextScramble(el);
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };
        // Start after a small delay
        setTimeout(next, 1000);
    }
});

// --- Live Stats Counter Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, ''); 
            
            // Lower inc to slow and higher to slow
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
});

// --- Particle System (Reacts to Mouse & Simulated Beats) ---
const initParticles = () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    // Mouse interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150
    }
    
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Simulated Beat Pulse
    let pulse = 1;
    let beatFrame = 0;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.baseSize = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            // Pulse effect on size to simulate music beat
            ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            
            // Mouse Repulsion
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius) {
                if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 3;
                if (mouse.x > this.x && this.x > 10) this.x -= 3;
                if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 3;
                if (mouse.y > this.y && this.y > 10) this.y -= 3;
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }
    
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.4)' : 'rgba(167, 139, 250, 0.4)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7) && distance < 20000) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue * 0.05 + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        // Update Pulse (Simulated Beat)
        beatFrame++;
        if (beatFrame > 50) {
            pulse = 1.5; // Beat hit
            beatFrame = 0;
        }
        // Smooth decay
        if (pulse > 1) pulse -= 0.02;
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });
    
    init();
    animate();
};

document.addEventListener('DOMContentLoaded', initParticles);

// --- Testimonial Carousel ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonial-track');
    const slides = track ? Array.from(track.children) : [];
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    const updateSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-primary-blue', i === currentIndex);
            dot.classList.toggle('scale-125', i === currentIndex);
            dot.classList.toggle('bg-white/20', i !== currentIndex);
        });
    };

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => updateSlide(parseInt(e.target.dataset.index)));
    });

    setInterval(() => updateSlide(currentIndex + 1), 5000);
    updateSlide(0);
});

// --- Utility function for API Exponential Backoff (MANDATORY FOR API CALLS) ---
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (error) {
            if (i === maxRetries - 1) {
                console.error('All retries failed.', error);
                throw error;
            }
            const delay = Math.pow(2, i) * 1000;
            // console.log(`Retry attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// --- Firebase & Application Logic ---
const firebaseConfig = {
    apiKey: "AIzaSyDTuXzi7Clh0jeNO72mY6arh8pO4-m6Zv0",
    authDomain: "susfm-fef66.firebaseapp.com",
    databaseURL: "https://susfm-fef66-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "susfm-fef66",
    storageBucket: "susfm-fef66.firebasestorage.app",
    messagingSenderId: "772122910920",
    appId: "1:772122910920:web:1b548a9118fb45146ac5fd",
    measurementId: "G-LZHG2GKSH3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// --- Ultra Modern Loader Sequence (5 Seconds) ---
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('initial-loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderStatus = document.getElementById('loader-status');
    const loaderPercent = document.getElementById('loader-percent');

    if (!loader) return;

    // Animation Steps
    const sequence = [
        { time: 500, progress: 15, text: "LOADING ASSETS..." },
        { time: 1500, progress: 45, text: "CONNECTING TO LAVALINK..." },
        { time: 2800, progress: 70, text: "SYNCING DATABASE..." },
        { time: 3800, progress: 85, text: "CALIBRATING AUDIO ENGINE..." },
        { time: 4500, progress: 95, text: "FINALIZING SETUP..." },
        { time: 5000, progress: 100, text: "ACCESS GRANTED" }
    ];

    // Execute Sequence
    sequence.forEach(step => {
        setTimeout(() => {
            if (loaderBar) loaderBar.style.width = `${step.progress}%`;
            if (loaderPercent) loaderPercent.innerText = `${step.progress}%`;
            if (loaderStatus) {
                loaderStatus.innerText = step.text;
                loaderStatus.classList.add('glitch-effect');
                setTimeout(() => loaderStatus.classList.remove('glitch-effect'), 200);
            }
        }, step.time);
    });

    // Remove Loader after 5.5s (Sequence + Buffer)
    setTimeout(() => {
        loader.style.transition = "all 0.8s cubic-bezier(0.7, 0, 0.3, 1)";
        loader.style.transform = "translateY(-100%)";
        loader.style.opacity = "0";
        
        // Cleanup DOM
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 5500);
});

// --- Realtime Bot Status Updates ---
const statusRef = ref(db, 'botStatus');
const streamsRef = ref(db, 'dailyStreams');

// 1. Handle Bot Status & Guild Count
onValue(statusRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
        const statusContainer = document.getElementById('status-container');
        const statusText = document.getElementById('status-text');
        const statusIndicator = document.getElementById('status-indicator');
        const serverCount = document.getElementById('server-count');
        const pingCount = document.getElementById('ping-count');
        const cpuCount = document.getElementById('cpu-count');
        const totalPlayedCount = document.getElementById('total-played-count');
        const uptimeText = document.getElementById('uptime-text');
        const memoryText = document.getElementById('memory-text');
        const memoryBar = document.getElementById('memory-bar');
        const playingCount = document.getElementById('playing-count');
        const listenerCount = document.getElementById('listener-count');
        
        const widgetTitle = document.getElementById('widget-title');
        const widgetArtist = document.getElementById('widget-artist');
        const widgetThumbnail = document.getElementById('widget-thumbnail');

        // Update Online Status & Colors
        if (data.online) {
            statusContainer.classList.remove('text-red-500');
            statusContainer.classList.add('text-neon-green');
            statusIndicator.classList.remove('bg-red-500');
            statusIndicator.classList.add('bg-neon-green');
            statusText.innerText = "BOT ONLINE";
        } else {
            statusContainer.classList.remove('text-neon-green');
            statusContainer.classList.add('text-red-500');
            statusIndicator.classList.remove('bg-neon-green');
            statusIndicator.classList.add('bg-red-500');
            statusText.innerText = "MAINTENANCE";
        }

        // Update Server Count (with flash effect)
        if (data.guildCount) {
            const currentVal = serverCount.innerText;
            const newVal = data.guildCount.toLocaleString();
            if (currentVal !== newVal) {
                serverCount.innerText = newVal;
                triggerUpdateAnim(serverCount);
            }
        }

        // Update CPU Usage
        if (data.cpuUsage) {
            cpuCount.innerText = data.cpuUsage;
        }

        // Update Total Played
        if (data.totalPlayed) {
            totalPlayedCount.innerText = data.totalPlayed.toLocaleString();
        }

        // Update Uptime
        if (data.uptime) uptimeText.innerText = data.uptime;

        // Update Memory
        if (data.memoryUsage) {
            memoryText.innerText = data.memoryUsage;
            const memVal = parseFloat(data.memoryUsage);
            const memMax = 512; // Assuming 512MB max for visual bar
            const memPct = Math.min((memVal / memMax) * 100, 100);
            if(memoryBar) memoryBar.style.width = `${memPct}%`;
        }

        // Update Active Players & Listeners
        if (data.playingCount !== undefined) playingCount.innerText = data.playingCount;
        if (data.totalListeners !== undefined) listenerCount.innerText = data.totalListeners;

        // Update Ping
        if (data.ping) {
            pingCount.innerText = data.ping + " ms";
            // Color coding for ping
            if (data.ping < 50) pingCount.className = "text-2xl font-display font-bold text-neon-green";
            else if (data.ping < 150) pingCount.className = "text-2xl font-display font-bold text-yellow-400";
            else pingCount.className = "text-2xl font-display font-bold text-red-500";
        } else {
            pingCount.innerText = "-- ms";
        }

        // Update Now Playing Widget
        if (data.currentTrack) {
            let title = data.currentTrack.title || "Unknown Track";
            if(widgetTitle) widgetTitle.innerText = title;
            if(widgetArtist) widgetArtist.innerText = data.currentTrack.author || "Unknown Artist";
            if(widgetThumbnail) widgetThumbnail.src = data.currentTrack.thumbnail || "https://i.ibb.co/PGPGx0jq/sus-fm.gif";
        } else {
            if(widgetTitle) widgetTitle.innerText = "Waiting for requests...";
            if(widgetArtist) widgetArtist.innerText = "Sus FM";
            if(widgetThumbnail) widgetThumbnail.src = "https://i.ibb.co/PGPGx0jq/sus-fm.gif";
        }
    }
}, (error) => {
    console.error("Error reading bot status:", error);
});

// 2. Handle Streams (Calculate Total)
onValue(streamsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Fallback: If botStatus doesn't have totalPlayed, we might use this, 
        // but we are prioritizing botStatus.totalPlayed in the new UI.
        // We keep this calculation in case we want to restore the daily chart later.
        // Sum up all values in the dailyStreams object
        const totalStreams = Object.values(data).reduce((sum, count) => sum + count, 0);
        // console.log("Total calculated streams:", totalStreams);
    }
}, (error) => {
    console.error("Error reading streams:", error);
});

// Helper to trigger CSS animation
function triggerUpdateAnim(element) {
    element.classList.remove('updated');
    void element.offsetWidth; // Trigger reflow
    element.classList.add('updated');
}

// --- Simulation Script (For Testing) ---
// Call startSimulation() in the console to test the effects!
window.startSimulation = () => {
    console.log("Starting local simulation...");
    
    setInterval(() => {
        const serverCount = document.getElementById('server-count');
        const cpuCount = document.getElementById('cpu-count');
        const totalPlayedCount = document.getElementById('total-played-count');
        const pingCount = document.getElementById('ping-count');
        const playingCount = document.getElementById('playing-count');
        
        // Simulate random increments
        let currentServers = parseInt(serverCount.innerText.replace(/,/g, '')) || 14000;
        let currentCpu = parseFloat(cpuCount.innerText) || 12.5;
        let currentPlayed = parseInt(totalPlayedCount.innerText.replace(/,/g, '')) || 150;
        let currentPing = Math.floor(Math.random() * (60 - 20 + 1) + 20); // Random ping 20-60ms
        
        currentServers += Math.floor(Math.random() * 5);
        currentCpu = Math.max(0, Math.min(100, currentCpu + (Math.random() - 0.5) * 5)).toFixed(2);
        currentPlayed += Math.floor(Math.random() * 2);

        serverCount.innerText = currentServers.toLocaleString();
        cpuCount.innerText = currentCpu + "%";
        totalPlayedCount.innerText = currentPlayed.toLocaleString();
        pingCount.innerText = currentPing + " ms";
        playingCount.innerText = Math.floor(Math.random() * 5) + 1;

        triggerUpdateAnim(serverCount);
        triggerUpdateAnim(totalPlayedCount);
    }, 2000); // Update every 2 seconds
};

// --- Draggable Music Widget ---
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('music-widget');
    if (!widget) return;

    let isDragging = false;
    let startX, startY;

    // Set initial cursor style
    widget.style.cursor = 'grab';

    widget.addEventListener('mousedown', (e) => {
        isDragging = true;
        widget.style.cursor = 'grabbing';
        
        // Disable transitions and animations during drag for direct control
        widget.style.transition = 'none';
        widget.classList.remove('animate-float');

        // Calculate offset from mouse to element top-left
        const rect = widget.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;

        // Prevent default to avoid text selection
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Calculate new position
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        // Apply position (switching from bottom/right to top/left positioning)
        widget.style.left = `${x}px`;
        widget.style.top = `${y}px`;
        widget.style.bottom = 'auto';
        widget.style.right = 'auto';
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        widget.style.cursor = 'grab';
        
        // Re-enable transitions for hover effects
        widget.style.transition = 'all 0.3s ease';
    });
});

// --- Background Music Player Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const bgWidget = document.getElementById('bg-music-widget');
    const bgAudio = document.getElementById('bg-audio');
    const playIcon = document.getElementById('bg-play-icon');
    const pauseIcon = document.getElementById('bg-pause-icon');
    const visualizerBars = document.querySelectorAll('#bg-visualizer div');
    
    if (bgWidget && bgAudio) {
        bgAudio.volume = 0.2; // Default low volume

        const togglePlay = () => {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    bgWidget.classList.add('border-neon-purple/50');
                    // Start visualizer animation
                    visualizerBars.forEach((bar, index) => {
                        bar.style.animation = `music-bar-anim ${0.5 + index * 0.2}s ease-in-out infinite alternate`;
                    });
                }).catch(e => console.log("Audio play failed:", e));
            } else {
                bgAudio.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                bgWidget.classList.remove('border-neon-purple/50');
                // Stop visualizer animation
                visualizerBars.forEach(bar => {
                    bar.style.animation = 'none';
                });
            }
        };

        bgWidget.addEventListener('click', togglePlay);
    }
});