/* ==========================================
   ABDULLAH KHAN - PORTFOLIO SCRIPTS
   ========================================== */

// ---- Particle Background ----
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction - gentle repulsion
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x += (dx / dist) * force * 1.5;
                this.y += (dy / dist) * force * 1.5;
            }
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        ctx.fillStyle = isDark
            ? `rgba(16, 185, 129, ${this.opacity})`
            : `rgba(16, 185, 129, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const maxDist = 150;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
                const opacity = (1 - dist / maxDist) * 0.15;
                ctx.strokeStyle = isDark
                    ? `rgba(16, 185, 129, ${opacity})`
                    : `rgba(16, 185, 129, ${opacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

// ---- Typing Effect ----
const titles = [
    'IT Analyst',
    'Software Developer',
    'Python Developer',
    'AI Enthusiast',
    'Cloud Solutions',
    'Full Stack Developer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function typeEffect() {
    const current = titles[titleIndex];
    if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ---- Hamburger Menu ----
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Light mode only
document.documentElement.setAttribute('data-theme', 'light');

// ---- Navbar Scroll Effect ----
const desktopNav = document.getElementById('desktop-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        desktopNav.classList.add('scrolled');
    } else {
        desktopNav.classList.remove('scrolled');
    }
});

// ---- Scroll Reveal Animations ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- Skills Bar Animation ----
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            const fill = entry.target.querySelector('.skill-fill');
            fill.style.width = level + '%';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.3 });

skillItems.forEach(el => skillObserver.observe(el));

// ---- Contact Form ----
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ---- AI Chatbot ----
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('open');
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('open');
});

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    const typingEl = addTypingIndicator();

    // Simulate AI response delay
    setTimeout(() => {
        typingEl.remove();
        const response = generateResponse(text);
        addMessage(response, 'bot');
    }, 800 + Math.random() * 700);
}

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `chat-message ${type}`;
    div.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return div;
}

function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'chat-message bot typing';
    div.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return div;
}

function generateResponse(input) {
    const q = input.toLowerCase();

    // Knowledge base about Abdullah
    const responses = [
        {
            keywords: ['hello', 'hi', 'hey', 'sup', 'greet', 'salam', 'assalam'],
            answer: "Hey there! Welcome to Abdullah's portfolio. Feel free to ask me about his skills, experience, projects, or education!"
        },
        {
            keywords: ['skill', 'technolog', 'tech stack', 'programming', 'language', 'code'],
            answer: "Abdullah is skilled in <strong>Python, JavaScript, TypeScript, HTML/CSS, C, and SQL</strong>. He works with frameworks like <strong>React, Flask, Next.js, and Node.js</strong>, and has experience with <strong>Microsoft Azure, CI/CD pipelines, and REST APIs</strong>."
        },
        {
            keywords: ['experience', 'work', 'job', 'career', 'employ'],
            answer: "Abdullah is currently an <strong>IT Analyst at Canadian Heritage</strong>, building AI-driven solutions for the Artifacts Canada platform. Previously, he worked at <strong>AirMatrix</strong> (software dev & drone ops), <strong>Canada Revenue Agency</strong>, <strong>Delphi Technology</strong> (QA), and <strong>Khalid Hasan Professional Corporation</strong> (bookkeeping)."
        },
        {
            keywords: ['education', 'school', 'college', 'university', 'degree', 'diploma', 'study'],
            answer: "Abdullah graduated from <strong>Algonquin College</strong> in Aug 2025 with a <strong>Computer Programming Diploma</strong>. He also holds an Ontario Secondary School Diploma from West Carleton Secondary School."
        },
        {
            keywords: ['certif', 'certificate', 'certified'],
            answer: "Abdullah holds 4 certifications: <strong>Advanced Operations Pilot Certificate</strong> (Transport Canada), <strong>BI Dashboards with Power BI</strong> (Codecademy), <strong>Software Quality Assurance</strong> (Techno Canada), and <strong>Public Relations & Customer Management</strong> (Artech Accelerate)."
        },
        {
            keywords: ['project', 'portfolio', 'built', 'build', 'created', 'made'],
            answer: "Notable projects include: <strong>J2N x EPIC</strong> — a full-stack athlete combines platform at <a href='https://j2nxepic.com' target='_blank'>j2nxepic.com</a>, an <strong>AI-powered Bid Scraper</strong> using Flask + OpenAI API, backend services for <strong>Artifacts Canada</strong> with Azure cloud, and this <strong>portfolio website</strong> with AI chatbot and particle effects!"
        },
        {
            keywords: ['j2n', 'epic', 'combine', 'athlete', 'sport', 'drill', 'dash', 'jump', 'leaderboard'],
            answer: "Abdullah built <strong>J2N x EPIC</strong> (<a href='https://j2nxepic.com' target='_blank'>j2nxepic.com</a>) — a full-stack athlete performance analytics and competitive combines platform. It features event registration, countdown timers, leaderboard rankings, and performance tracking across standardized drills like the 40-yard dash, shuttle, vertical jump, and more!"
        },
        {
            keywords: ['contact', 'email', 'reach', 'hire', 'phone', 'call'],
            answer: "You can reach Abdullah at <strong>akhan.ak48@gmail.com</strong> or call <strong>613-255-6997</strong>. He's based in <strong>Kanata, Ontario, Canada</strong>. Or just use the contact form on this page!"
        },
        {
            keywords: ['ai', 'artificial intelligence', 'machine learning', 'openai', 'ml'],
            answer: "Abdullah has hands-on AI experience! At <strong>Canadian Heritage</strong>, he supports AI-driven solutions for cultural heritage data. At <strong>AirMatrix</strong>, he integrated <strong>OpenAI's API</strong> for intelligent bid categorization. He's passionate about building practical AI-powered tools."
        },
        {
            keywords: ['azure', 'cloud', 'devops', 'pipeline', 'deploy'],
            answer: "Abdullah works extensively with <strong>Microsoft Azure</strong> — including Functions, VMs, Storage Accounts, Data Lake, and Blob Storage. He designs <strong>CI/CD pipelines</strong> using Azure DevOps and GitHub Actions for automated testing and deployments."
        },
        {
            keywords: ['python', 'flask', 'selenium', 'automat'],
            answer: "Python is one of Abdullah's strongest languages! He's built <strong>Flask web apps</strong>, automated workflows with <strong>Selenium</strong>, integrated APIs (OpenAI, Google Sheets), and built backend services for data processing pipelines."
        },
        {
            keywords: ['drone', 'airmatrix', 'pilot', 'flight'],
            answer: "Abdullah has a unique background in drone technology! He holds a <strong>Transport Canada Advanced Operations Pilot Certificate</strong> and worked as a Field Technician at AirMatrix, operating drones, using radar systems, and performing hardware maintenance."
        },
        {
            keywords: ['security', 'clearance', 'government', 'reliability'],
            answer: "Abdullah holds a valid <strong>Government of Canada Reliability Status</strong> security clearance, qualifying him for work involving sensitive and classified information in federal environments."
        },
        {
            keywords: ['language', 'speak', 'fluent', 'urdu', 'hindi', 'english'],
            answer: "Abdullah is fluent in <strong>English, Urdu, and Hindi</strong> — making him effective in diverse and multicultural team environments."
        },
        {
            keywords: ['current', 'now', 'present', 'today', 'doing'],
            answer: "Abdullah is currently working as an <strong>IT Analyst – Software Solutions</strong> at <strong>Canadian Heritage (PCH)</strong> in a hybrid role, building REST APIs and supporting AI-driven solutions for the Artifacts Canada platform."
        },
        {
            keywords: ['location', 'where', 'live', 'based', 'city', 'kanata', 'ottawa'],
            answer: "Abdullah is based in <strong>Kanata, Ontario, Canada</strong> (part of the Ottawa area)."
        },
        {
            keywords: ['who', 'about', 'tell me about', 'introduce', 'yourself'],
            answer: "Abdullah Khan is an analytical, detail-oriented <strong>IT professional</strong> based in Kanata, ON. He specializes in software development, AI-driven solutions, and cloud platforms. Currently at Canadian Heritage, he brings experience from multiple industries including government, drone tech, and finance."
        }
    ];

    // Find best match
    let bestMatch = null;
    let bestScore = 0;

    for (const r of responses) {
        let score = 0;
        for (const kw of r.keywords) {
            if (q.includes(kw)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = r;
        }
    }

    if (bestMatch && bestScore > 0) {
        return bestMatch.answer;
    }

    // Default responses
    const defaults = [
        "Great question! You can ask me about Abdullah's <strong>skills</strong>, <strong>experience</strong>, <strong>projects</strong>, <strong>education</strong>, or <strong>certifications</strong>. What would you like to know?",
        "I'm not sure about that specific topic, but I can tell you about Abdullah's <strong>technical skills</strong>, <strong>work experience</strong>, <strong>AI projects</strong>, or <strong>how to contact him</strong>!",
        "Hmm, try asking about Abdullah's <strong>experience at Canadian Heritage</strong>, his <strong>AI & automation projects</strong>, or his <strong>cloud computing skills</strong>!"
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
}

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
