/* ── COLOURS ── */
const COLORS = ['#ff00f2', '#00ffee', '#ff8c00', '#ff0055', '#aaff00'];

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  spawnParticle(e.clientX, e.clientY);
});

/* ── CURSOR TRAIL PARTICLES ── */
function spawnParticle(x, y) {
  const p    = document.createElement('div');
  p.className = 'particle';
  const size  = Math.random() * 12 + 4;
  p.style.cssText = [
    `left: ${x}px`,
    `top: ${y}px`,
    `width: ${size}px`,
    `height: ${size}px`,
    `background: ${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
    `box-shadow: 0 0 ${size}px currentColor`,
    'transform: translate(-50%, -50%)',
  ].join(';');
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 600);
}

/* ── CLICK BURSTS ── */
const BURST_WORDS = ['TEKINN!', '😱', 'BLÖNDAL', 'AUDDI', 'WTF', 'ÞÚ!!', 'GILSARI', '!!!!!'];

document.addEventListener('click', e => {
  const b    = document.createElement('div');
  b.className = 'burst';
  b.textContent = BURST_WORDS[Math.floor(Math.random() * BURST_WORDS.length)];
  b.style.cssText = [
    `left: ${e.clientX}px`,
    `top: ${e.clientY}px`,
    `color: ${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
  ].join(';');
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 700);
});

/* ── ANIMATED CANVAS BACKGROUND ── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H;
const orbs   = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
  orbs.push({
    x:     Math.random() * 1920,
    y:     Math.random() * 1080,
    r:     Math.random() * 80 + 20,
    dx:    (Math.random() - 0.5) * 2,
    dy:    (Math.random() - 0.5) * 2,
    hue:   Math.random() * 360,
    dh:    (Math.random() - 0.5) * 3,
    alpha: Math.random() * 0.4 + 0.1,
  });
}

function drawBackground() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, W, H);

  for (const o of orbs) {
    o.x += o.dx; o.y += o.dy; o.hue += o.dh;
    if (o.x < -o.r)  o.x = W + o.r;
    if (o.x > W + o.r) o.x = -o.r;
    if (o.y < -o.r)  o.y = H + o.r;
    if (o.y > H + o.r) o.y = -o.r;

    const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
    grad.addColorStop(0, `hsla(${o.hue},100%,60%,${o.alpha})`);
    grad.addColorStop(1, `hsla(${o.hue},100%,60%,0)`);
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  requestAnimationFrame(drawBackground);
}
drawBackground();

/* ── FLOATING QUOTES ── */
let quoteTexts = [];

function spawnQuote() {
  if (!quoteTexts.length) return;

  const el      = document.createElement('div');
  el.className  = 'quote';
  el.textContent = quoteTexts[Math.floor(Math.random() * quoteTexts.length)];

  const size   = Math.random() * 1.6 + 0.7;
  const startX = Math.random() * window.innerWidth;
  const endX   = startX + (Math.random() - 0.5) * 300;
  const dur    = Math.random() * 8000 + 12000;

  el.style.cssText = [
    `left: ${startX}px`,
    `top: ${window.innerHeight + 40}px`,
    `font-size: ${size}rem`,
    `color: hsl(${Math.random() * 360},100%,70%)`,
    `transform: rotate(${(Math.random() - 0.5) * 30}deg)`,
    `transition: transform ${dur}ms linear, top ${dur}ms linear, left ${dur}ms linear, opacity ${dur}ms linear`,
    'opacity: 0',
  ].join(';');
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.top       = `${Math.random() * -window.innerHeight * 0.8 - 40}px`;
      el.style.left      = `${endX}px`;
      el.style.opacity   = (Math.random() * 0.6 + 0.4).toString();
      el.style.transform = `rotate(${(Math.random() - 0.5) * 60}deg)`;
    });
  });

  setTimeout(() => el.remove(), dur + 100);
}

fetch('quotes.json')
  .then(r => r.json())
  .then(data => {
    quoteTexts = data.quotes.map(q => q.quote);
    for (let i = 0; i < 5; i++) setTimeout(spawnQuote, i * 300);
    setInterval(spawnQuote, 1200);
  });

/* ── HEADING COLOUR FLASH ── */
const h1 = document.querySelector('h1');
setInterval(() => {
  h1.style.color = `hsl(${Math.random() * 360},100%,70%)`;
}, 300);

/* ── EDGE SHAKE ── */
document.addEventListener('mousemove', e => {
  const edge = 60;
  const dL = e.clientX, dR = window.innerWidth  - e.clientX;
  const dT = e.clientY, dB = window.innerHeight - e.clientY;
  if (Math.min(dL, dR, dT, dB) < edge) {
    const dx = (Math.random() - 0.5) * 6;
    const dy = (Math.random() - 0.5) * 6;
    document.body.style.transform = `translate(${dx}px,${dy}px)`;
    setTimeout(() => { document.body.style.transform = ''; }, 80);
  }
});