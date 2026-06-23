/* ── AUDIO AUTOPLAY ── */
const audio = document.getElementById('bgAudio');

audio.play().catch(() => {
  const unlock = () => {
    audio.play();
    ['click', 'keydown', 'touchstart'].forEach(e => document.removeEventListener(e, unlock));
  };
  ['click', 'keydown', 'touchstart'].forEach(e => document.addEventListener(e, unlock));
});

/* ── RANDOM IMAGE HUE FLASH ── */
const heroImg = document.getElementById('heroImg');

setInterval(() => {
  if (Math.random() < 0.15) {
    heroImg.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${2 + Math.random() * 3})`;
    setTimeout(() => { heroImg.style.filter = ''; }, 200);
  }
}, 500);