/* ═══════════════════════════════════════════════
   BIRTHDAY WEBSITE — SCRIPT.JS
   ─────────────────────────────────────────────
   CONFIG: ubah nilai di bawah ini sesuai kebutuhan
═══════════════════════════════════════════════ */

const CONFIG = {
  // PIN 4 digit — ubah sesuai keinginan
  pin: '2323',

  // Nama pacar — tampil di hero
  name: 'fiyaa',

  // Isi surat — maks 3 paragraf
  letter: [
    'Selamat ulang tahun.',
    'Aku bikin ini bukan karena aku harus, tapi karena aku mau. Hari ini rasanya tepat untuk bikin sesuatu yang bisa kamu buka, dan semoga ketika kamu buka, kamu senyum sedikit—sekecil apapun itu.',
    'Terima kasih sudah jadi bagian dari banyak hari yang aku lewati. Bukan karena semuanya sempurna, tapi karena bersamamu, hal-hal biasa punya rasa yang sedikit berbeda. Dan aku senang merasakannya bersamamu.',
  ],

  // Caption untuk tiap foto di gallery (urutan sesuai photo1.jpg – photo6.jpg)
  captions: [
    'Foto ini masih jadi favoritku.',
    'Hari itu ternyata lebih seru dari yang aku ingat.',
    'Kamu paling cantik waktu tidak sadar difoto.',
    'Momen ini ada di kepala aku lebih lama dari yang kukira.',
    'Senang bisa ada di sini bersamamu.',
    'Ini salah satu hari yang aku simpan baik-baik.',
  ],

  // Hal-hal kecil (small things section)
  smallThings: [
    'Cara kamu tertawa waktu sesuatu benar-benar lucu—bukan yang pura-pura, tapi yang asli.',
    'Cara kamu cerita sesuatu dengan semangat, sampai matamu ikut bicara.',
    'Cara kamu selalu punya pendapat sendiri, bahkan untuk hal-hal kecil.',
    'Cara kamu bikin hari yang biasa terasa sedikit lebih menyenangkan dari biasanya.',
    'Cara kamu diam waktu lagi berpikir—tenang, tapi kelihatan banget lagi ke mana-mana.',
    'Cara kamu tetap jadi kamu, di situasi apapun. Itu yang paling aku kagumi.',
  ],

  // Pesan akhir
  finalMessage: 'Selamat bertambah usia.',
  finalSub: 'Semoga tahun ini membawa banyak hal baik buat kamu. Dan semoga kamu tetap jadi orang yang sama yang selama ini aku kenal dan sayangi.',
};


/* ═══════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════ */
let currentPin  = '';
let pinAttempts = 0;
let musicPlaying = false;
let musicStarted = false;


/* ═══════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════ */
function showScreen(id, instant = false) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.classList.add('exit');
  });

  const target = document.getElementById(id);
  const delay  = instant ? 0 : 700;

  setTimeout(() => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('exit'));
    target.classList.add('active');

    // Special case: main content needs body scroll
    if (id === 'main-content') {
      document.body.classList.add('main-active');
      target.style.position = 'relative';
    }
  }, delay);
}

function formatTime(d) {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDate(d) {
  const days   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Januari','Februari','Maret','April','Mei','Juni',
                  'Juli','Agustus','September','Oktober','November','Desember'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}


/* ═══════════════════════════════════════════════
   LOCK SCREEN — CLOCK
═══════════════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById('lock-time');
  const dateEl = document.getElementById('lock-date');
  if (timeEl) timeEl.textContent = formatTime(now);
  if (dateEl) dateEl.textContent = formatDate(now);
}

updateClock();
setInterval(updateClock, 1000);


/* ═══════════════════════════════════════════════
   ROMANTIC PARTICLES
═══════════════════════════════════════════════ */
function createPetals(containerId, count = 14) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = [
    'rgba(201,132,122,0.5)',
    'rgba(232,196,190,0.5)',
    'rgba(196,168,130,0.4)',
    'rgba(201,132,122,0.3)',
  ];

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 5 + Math.random() * 8;
    petal.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 8}s;
      border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
    `;
    container.appendChild(petal);
  }
}

function createFloatingHearts(containerId, count = 10) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const hearts = ['♡', '♥', '✦', '✿'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'fheart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const hue = Math.random() > 0.5 ? 'var(--rose)' : 'var(--rose-light)';
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${10 + Math.random() * 10}px;
      color: ${hue};
      animation-duration: ${8 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 6}s;
    `;
    container.appendChild(heart);
  }
}

// Init particles on load
createPetals('lock-petals', 16);
createFloatingHearts('letter-hearts', 12);


/* ═══════════════════════════════════════════════
   LOCK SCREEN → PIN
═══════════════════════════════════════════════ */
document.getElementById('lock-screen').addEventListener('click', () => {
  showScreen('pin-screen');
});


/* ═══════════════════════════════════════════════
   PIN SCREEN
═══════════════════════════════════════════════ */
function updatePinDots() {
  document.querySelectorAll('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < currentPin.length);
  });
}

function shakeAndReset() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach(d => { d.classList.add('shake'); d.classList.remove('filled'); });

  const err = document.getElementById('pin-error');
  err.classList.add('visible');

  setTimeout(() => {
    dots.forEach(d => d.classList.remove('shake'));
    setTimeout(() => err.classList.remove('visible'), 1400);
  }, 400);

  currentPin = '';
}

function handlePinInput(num) {
  if (currentPin.length >= 4) return;
  currentPin += num;
  updatePinDots();

  if (currentPin.length === 4) {
    if (currentPin === CONFIG.pin) {
      // Correct ✓
      setTimeout(() => showScreen('letter-screen'), 300);
    } else {
      // Wrong ✗
      pinAttempts++;
      setTimeout(shakeAndReset, 200);
    }
  }
}

// Keypad clicks
document.querySelectorAll('.pin-key[data-num]').forEach(btn => {
  btn.addEventListener('click', () => handlePinInput(btn.dataset.num));
});

// Delete
document.getElementById('pin-delete').addEventListener('click', () => {
  if (currentPin.length > 0) {
    currentPin = currentPin.slice(0, -1);
    updatePinDots();
  }
});

// Physical keyboard support
document.addEventListener('keydown', e => {
  const screen = document.querySelector('#pin-screen.active');
  if (!screen) return;
  if (e.key >= '0' && e.key <= '9') handlePinInput(e.key);
  if (e.key === 'Backspace') {
    currentPin = currentPin.slice(0, -1);
    updatePinDots();
  }
});


/* ═══════════════════════════════════════════════
   LETTER SCREEN
═══════════════════════════════════════════════ */
function injectLetterContent() {
  const body = document.querySelector('.letter-body');
  if (!body) return;
  body.innerHTML = CONFIG.letter.map(p => `<p>${p}</p>`).join('');
}
injectLetterContent();

// Envelope tap → open → reveal letter
const envelope          = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelope-container');
const letterContent     = document.getElementById('letter-content');

if (envelopeContainer) {
  envelopeContainer.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envelopeContainer.style.display  = 'none';
      letterContent.style.display      = 'block';
      letterContent.classList.add('visible');
    }, 600);
  });
}

// "Lanjut" button → transition → main
document.getElementById('letter-next-btn')?.addEventListener('click', () => {
  showScreen('transition-screen');
  setTimeout(() => {
    showScreen('main-content');
    // Populate dynamic content
    injectHero();
    injectSmallThings();
    injectFinal();
    initScrollReveal();
    initGallery();
    startMusic();
  }, 3800);
});


/* ═══════════════════════════════════════════════
   DYNAMIC CONTENT INJECTION
═══════════════════════════════════════════════ */
function injectHero() {
  const nameEl = document.querySelector('.hero-name');
  if (nameEl) nameEl.textContent = CONFIG.name;

  const dateEl = document.getElementById('hero-date');
  if (dateEl) {
    const now = new Date();
    const months = ['Januari','Februari','Maret','April','Mei','Juni',
                    'Juli','Agustus','September','Oktober','November','Desember'];
    dateEl.textContent = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }
}

function injectSmallThings() {
  const grid = document.querySelector('.things-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.smallThings.map((text, i) => `
    <div class="thing-card" style="--delay:${i * 0.08}s">
      <div class="thing-icon">✦</div>
      <p>${text}</p>
    </div>
  `).join('');
}

function injectFinal() {
  const msgEl = document.querySelector('.final-text');
  const subEl = document.querySelector('.final-sub');
  if (msgEl) msgEl.textContent = CONFIG.finalMessage;
  if (subEl) subEl.textContent = CONFIG.finalSub;
}


/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.gallery-card, .thing-card');

  // Immediately reveal items already in viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));

  // Also reveal final section
  const finalTargets = document.querySelectorAll('.final-content');
  const ioFinal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        ioFinal.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  finalTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    ioFinal.observe(el);
  });
}


/* ═══════════════════════════════════════════════
   GALLERY + LIGHTBOX
═══════════════════════════════════════════════ */
function initGallery() {
  // Inject captions from CONFIG
  document.querySelectorAll('.polaroid-caption').forEach((el, i) => {
    if (CONFIG.captions[i]) el.textContent = CONFIG.captions[i];
  });

  // Lightbox
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');

  document.querySelectorAll('.polaroid').forEach((card, i) => {
    card.addEventListener('click', () => {
      const imgEl = card.querySelector('img');
      const src = imgEl?.src;
      const cap = card.querySelector('.polaroid-caption')?.textContent || '';

      if (!src || card.classList.contains('no-photo')) return;

      lbImg.src             = src;
      lbCaption.textContent = cap;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightbox-overlay')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════
   MUSIC
═══════════════════════════════════════════════ */
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const audio    = document.getElementById('bg-music');
  const btn      = document.getElementById('music-btn');
  const icon     = document.getElementById('music-icon');
  const bars     = document.getElementById('music-bars');

  if (!audio) return;

  audio.volume = 0.55;

  function setPlaying(playing) {
    musicPlaying = playing;
    if (playing) {
      icon.classList.remove('visible');
      bars.classList.add('visible');
    } else {
      bars.classList.remove('visible');
      icon.classList.add('visible');
    }
  }

  // Auto-play on first interaction
  const tryPlay = () => {
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — show the icon so user can tap
        icon.classList.add('visible');
      });
  };

  tryPlay();

  // Toggle
  btn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  // Update icon if browser pauses
  audio.addEventListener('play',  () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));

  // Graceful init state
  icon.classList.add('visible');
}


/* ═══════════════════════════════════════════════
   LOCK SCREEN — active on load
═══════════════════════════════════════════════ */
document.getElementById('lock-screen').classList.add('active');


/* ═══════════════════════════════════════════════
   GIFT MODAL — klik kado → buka foto
═══════════════════════════════════════════════ */
function spawnSparkles(container) {
  const colors = ['#C27A73','#DFB5AF','#C4A882','#F2E0DC','#A85E58','#E8DDD6'];
  const count = 16;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'gift-sparkle-dot';
    const size = 4 + Math.random() * 8;
    const angle = (i / count) * 360;
    const dist = 40 + Math.random() * 60;
    const rad = angle * Math.PI / 180;
    const tx = Math.cos(rad) * dist;
    const ty = Math.sin(rad) * dist;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: 50%;
      left: 50%;
      --tx: translate(${tx}px, ${ty}px);
      animation-delay: ${Math.random() * 0.15}s;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 1000);
  }
}

function openGiftModal() {
  const modal = document.getElementById('gift-modal');
  const sparklesEl = document.getElementById('gift-sparkles');
  if (!modal) return;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Spawn sparkles effect
  if (sparklesEl) spawnSparkles(sparklesEl);
}

function closeGiftModal() {
  const modal = document.getElementById('gift-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('final-gift-btn')?.addEventListener('click', openGiftModal);
document.getElementById('gift-modal-overlay')?.addEventListener('click', closeGiftModal);
document.getElementById('gift-modal-close')?.addEventListener('click', closeGiftModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeGiftModal();
});