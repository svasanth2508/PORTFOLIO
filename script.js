// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const iconMoon = themeToggle ? themeToggle.querySelector('.icon-moon') : null;
const iconSun = themeToggle ? themeToggle.querySelector('.icon-sun') : null;
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const revealEls = document.querySelectorAll('.reveal');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const spotlightCards = document.querySelectorAll('.spotlight-card');
const hudMouse = document.getElementById('hudMouse');
const hudScroll = document.getElementById('hudScroll');
const hudSection = document.getElementById('hudSection');
const hudDepth = document.getElementById('hudDepth');
const floatingTopBtn = document.getElementById('floatingTopBtn');
const backToTopLink = document.getElementById('backToTopLink');
const customCursor = document.getElementById('customCursor');
const mouseSpotlight = document.getElementById('mouseSpotlight');
const allSections = document.querySelectorAll('section[id]');

// Modal Elements
const resumeModal = document.getElementById('resumeModal');
const openResumeModalBtn = document.getElementById('openResumeModal');
const closeResumeModalBtn = document.getElementById('closeResumeModal');
const closeResumeModalBtn2 = document.getElementById('closeResumeModalBtn');
const heroResumeBtn = document.getElementById('heroResumeBtn');

const secapmsModal = document.getElementById('secapmsModal');
const secapmsArchBtn = document.getElementById('secapmsArchBtn');
const closeSecapmsModalBtn = document.getElementById('closeSecapmsModal');

const copyReadmeBtn = document.getElementById('copyReadmeBtn');
const readmeCode = document.getElementById('readmeCode');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// 2. Theme Persistence
function setTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  if (iconMoon && iconSun) {
    iconMoon.hidden = isLight;
    iconSun.hidden = !isLight;
  }
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
}
setTheme(localStorage.getItem('portfolio-theme') === 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('light'));
  });
}

// 3. Mobile Nav
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 4. Project Filter
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const category = card.dataset.category || '';
      if (filter === 'all' || category.includes(filter)) {
        card.classList.remove('hidden-project');
      } else {
        card.classList.add('hidden-project');
      }
    });
  });
});

// 5. Contact Form Reachability Handlers
const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim() || 'Visitor';
    const email = document.getElementById('email').value.trim() || 'Not provided';
    const message = document.getElementById('message').value.trim() || 'Hello Vasanth!';

    if (!message || message === 'Hello Vasanth!') {
      if (formStatus) {
        formStatus.style.color = '#ffab00';
        formStatus.textContent = '⚠️ Please enter a message before sending.';
      }
      return;
    }

    // Direct Mailto trigger to guarantee arrival at svasanth2508@gmail.com
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nContact: ${email}\n\nMessage:\n${message}\n\n---\nSent from Vasanth S Portfolio System`);
    const mailtoUrl = `mailto:svasanth2508@gmail.com?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.style.color = 'var(--signal)';
      formStatus.textContent = `⚡ Dispatching message directly to svasanth2508@gmail.com...`;
    }

    // Trigger email client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    setTimeout(() => {
      if (formStatus) formStatus.textContent = '✅ Email app opened! Vasanth will respond promptly to your message.';
    }, 1800);
  });
}

if (sendWhatsAppBtn) {
  sendWhatsAppBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim() || 'Visitor';
    const email = document.getElementById('email').value.trim() || 'Not provided';
    const message = document.getElementById('message').value.trim() || 'Hi Vasanth, I am reaching out from your portfolio.';

    const text = encodeURIComponent(`Hi Vasanth,\nMy name is ${name} (${email}).\n\nMessage:\n${message}`);
    const waUrl = `https://wa.me/917305753500?text=${text}`;

    if (formStatus) {
      formStatus.style.color = 'var(--signal)';
      formStatus.textContent = `⚡ Opening WhatsApp chat with Vasanth (+91 73057 53500)...`;
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

// 6. Resume Modal Handlers & Download Functionality
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
const printResumeBtn = document.getElementById('printResumeBtn');
const resumeStatus = document.getElementById('resumeStatus');

function openResume() {
  if (resumeModal) {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    if (resumeStatus) resumeStatus.textContent = '';
  }
}
function closeResume() {
  if (resumeModal) {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
  }
}
if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', openResume);
if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);
if (closeResumeModalBtn2) closeResumeModalBtn2.addEventListener('click', closeResume);

function generateResumeDocument() {

  return `
================================================================================
VASANTH S
ELECTRONICS & COMMUNICATION ENGINEERING UNDERGRADUATE
AI • COMPUTER VISION • EMBEDDED IoT • FULL-STACK
================================================================================

Email:
svasanth2508@gmail.com

GitHub:
https://github.com/svasanth2508

LinkedIn:
https://linkedin.com/in/vasanth-sakthivel-05ba25396

Institution:
VSB Engineering College, Karur, Tamil Nadu

Degree:
B.E. Electronics & Communication Engineering

Batch:
2025 – 2029

Current CGPA:
8.005 / 10.0


PROFILE
--------------------------------------------------------------------------------

Electronics and Communication Engineering undergraduate focused on building
intelligent engineering systems across Artificial Intelligence, Computer Vision,
Embedded Systems, IoT and Full-Stack Development.

Hands-on project experience includes AI-powered video analytics, automatic
number plate recognition, autonomous incident-resolution software,
ESP32 Edge-AI telemetry systems and smart-infrastructure applications.


TECHNICAL SKILLS
--------------------------------------------------------------------------------

Programming:
Python, C, C++, Java, JavaScript, TypeScript

AI & Computer Vision:
YOLO, PaddleOCR, OpenCV, PyTorch, Machine Learning Inference

Full-Stack:
React, TypeScript, FastAPI, Node.js, Express.js, REST APIs, Vite

Embedded & IoT:
ESP32, Arduino, ESP-NOW, MQTT, Sensor Integration, Edge Processing

Cloud & Tools:
Git, GitHub, Vercel, Render, Supabase, Postman, VS Code


EDUCATION
--------------------------------------------------------------------------------

Bachelor of Engineering
Electronics & Communication Engineering

VSB Engineering College
Karur, Tamil Nadu

2025 – 2029

Current CGPA:
8.005 / 10.0


EXPERIENCE
--------------------------------------------------------------------------------

Embedded Technologist Intern
Initz Technology, Coimbatore

• Worked on embedded systems and IoT applications.
• Developed experience with ESP32 and Arduino microcontrollers.
• Performed sensor integration and hardware interfacing.
• Assisted with testing, debugging and embedded-system development.


SELECTED ENGINEERING PROJECTS
--------------------------------------------------------------------------------


1. PLATESCOPE — AI-POWERED ANPR PLATFORM

Repository:
https://github.com/svasanth2508/PlateScope

AI-powered Automatic Number Plate Recognition platform that processes traffic
video, detects license plates using YOLO, recognizes registration numbers using
PaddleOCR and combines repeated observations across multiple frames.

Technology:
Python, YOLO, PaddleOCR, OpenCV, FastAPI, React, TypeScript


2. ASTRAGUARD

Repository:
https://github.com/svasanth2508/AstraGuard

Live:
https://astraguard-eight.vercel.app

Autonomous enterprise incident-resolution platform designed to detect anomalies,
perform root-cause analysis, evaluate remediation risk, execute safe actions,
verify recovery and learn from confirmed incidents.


3. RESILIENT_AI_SIH

Repository:
https://github.com/svasanth2508/RESILIENT_AI_SIH

Live:
https://resilient-ai-sih.vercel.app

ESP32 Edge-AI environmental monitoring system combining embedded telemetry,
edge processing and a cloud-connected monitoring dashboard.


4. SECAPMS — SMART EMERGENCY CORRIDOR

Repository:
https://github.com/svasanth2508/secapms-project

Live:
https://secapms-project.vercel.app

Smart Emergency Corridor and Ambulance Priority Management System designed
around embedded traffic-priority controllers and a real-time monitoring
platform.


ENGINEERING INTERESTS
--------------------------------------------------------------------------------

• Artificial Intelligence
• Computer Vision
• Embedded Systems
• Internet of Things
• Edge Intelligence
• Full-Stack Development
• Intelligent Automation
• Real-Time Systems


================================================================================
Generated ${new Date().toLocaleDateString()}
Vasanth S Engineering Portfolio
================================================================================
`;

}if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', () => {
    try {
      const content = generateResumeDocument();
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Vasanth_S_ECE_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);

      if (resumeStatus) {
        resumeStatus.style.color = '#00e676';
        resumeStatus.textContent = '✅ Resume downloaded successfully! (Vasanth_S_ECE_Resume.txt)';
      }
    } catch (err) {
      console.error('Resume download error:', err);
      if (resumeStatus) {
        resumeStatus.style.color = 'var(--alert)';
        resumeStatus.textContent = '⚠️ Download error. Attempting print view...';
      }
    }
  });
}

if (printResumeBtn) {
  printResumeBtn.addEventListener('click', () => {
    try {
      if (resumeStatus) {
        resumeStatus.style.color = 'var(--signal)';
        resumeStatus.textContent = '⚡ Opening print / PDF save dialog...';
      }
      window.print();
    } catch (err) {
      console.warn('window.print unavailable in sandbox, triggering text resume download fallback', err);
      if (downloadResumeBtn) downloadResumeBtn.click();
    }
  });
}

// 7. SECAPMS Architecture Modal
if (secapmsArchBtn) {
  secapmsArchBtn.addEventListener('click', () => {
    if (secapmsModal) {
      secapmsModal.classList.add('open');
      secapmsModal.setAttribute('aria-hidden', 'false');
    }
  });
}
if (closeSecapmsModalBtn) {
  closeSecapmsModalBtn.addEventListener('click', () => {
    if (secapmsModal) {
      secapmsModal.classList.remove('open');
      secapmsModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Close modals when clicking overlay background
window.addEventListener('click', (e) => {
  if (e.target === resumeModal) closeResume();
  if (e.target === secapmsModal && secapmsModal) {
    secapmsModal.classList.remove('open');
    secapmsModal.setAttribute('aria-hidden', 'true');
  }
});

// 8. Copy Readme Snippet
if (copyReadmeBtn && readmeCode) {
  copyReadmeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(readmeCode.textContent).then(() => {
      copyReadmeBtn.textContent = 'Copied! ✓';
      setTimeout(() => { copyReadmeBtn.textContent = 'Copy Markdown'; }, 2500);
    }).catch(() => {
      copyReadmeBtn.textContent = 'Copied!';
    });
  });
}

// 9. Interactive Mouse Tracking & Custom Cursor
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Update HUD
  if (hudMouse) {
    hudMouse.textContent = `X: ${Math.round(mouseX)} | Y: ${Math.round(mouseY)}`;
  }

  // Update Custom Cursor Position
  if (customCursor) {
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  }

  // Update Mouse Ambient Spotlight
  if (mouseSpotlight) {
    mouseSpotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }

  // Card Spotlight & 3D Tilt calculation
  if (!prefersReducedMotion) {
    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Tilt if mouse is hovering card
      if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      } else {
        card.style.transform = '';
      }
    });
  }
});

// 10. Return to Top Event Handlers
function handleScrollToTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

if (floatingTopBtn) floatingTopBtn.addEventListener('click', handleScrollToTop);
if (backToTopLink) backToTopLink.addEventListener('click', handleScrollToTop);

document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', handleScrollToTop);
});

// 11. Comprehensive Telemetry & Scroll Update
function updateTelemetry() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const pageHeight = document.documentElement.scrollHeight;
  const viewHeight = window.innerHeight;
  const maxScroll = Math.max(1, pageHeight - viewHeight);
  const scrollPercent = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));

  // Update Scroll Position & Percentage
  if (hudScroll) {
    hudScroll.textContent = `${Math.round(scrollTop)}px (${scrollPercent}%)`;
  }

  // Update Total Page Height / Depth
  if (hudDepth) {
    hudDepth.textContent = `${Math.round(pageHeight)}px`;
  }

  // Active Section Detector
  let currentSection = '#hero';
  const scrollThreshold = scrollTop + viewHeight / 3;

  allSections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollThreshold >= top && scrollThreshold < top + height) {
      currentSection = `#${sec.id}`;
    }
  });

  if (hudSection) {
    hudSection.textContent = currentSection;
  }

  // Toggle Floating Top Button Visibility
  if (floatingTopBtn) {
    if (scrollTop > 250) {
      floatingTopBtn.classList.add('visible');
    } else {
      floatingTopBtn.classList.remove('visible');
    }
  }
}

window.addEventListener('scroll', updateTelemetry, { passive: true });
window.addEventListener('resize', updateTelemetry, { passive: true });
document.addEventListener('DOMContentLoaded', updateTelemetry);
window.addEventListener('load', updateTelemetry);
updateTelemetry();

// 10. Interactive High-Tech Particle Canvas System
const canvas = document.getElementById('mouseCanvas');
if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const particleCount = Math.floor(Math.min(width, height) / 18);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Render particles & connect to mouse
    const maxConnectDist = 140;

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 225, 255, ${p.alpha})`;
      ctx.fill();

      // Connect particle to mouse cursor if close
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxConnectDist) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        const lineAlpha = (1 - dist / maxConnectDist) * 0.45;
        ctx.strokeStyle = `rgba(0, 225, 255, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Connect particle to neighbor particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        const pdx = p2.x - p.x;
        const pdy = p2.y - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 114, 255, ${(1 - pdist / 90) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateCanvas();
}
