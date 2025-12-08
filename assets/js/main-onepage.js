// ======================================================================
// THE VOW STORYBOOK - ONE PAGE APPLICATION
// ======================================================================

// Navigation Map
const NAVIGATION_MAP = {
  'prologue': { prev: null, next: 'chapter1' },
  'chapter1': { prev: 'prologue', next: 'chapter2' },
  'chapter2': { prev: 'chapter1', next: 'chapter3-intro' },
  'chapter3-intro': { prev: 'chapter2', next: 'sage-huy' },
  'sage-huy': { prev: 'chapter3-intro', next: 'sage-tung' },
  'sage-tung': { prev: 'sage-huy', next: 'sage-trung' },
  'sage-trung': { prev: 'sage-tung', next: 'sage-thang' },
  'sage-thang': { prev: 'sage-trung', next: 'sage-hai' },
  'sage-hai': { prev: 'sage-thang', next: 'sage-duong' },
  'sage-duong': { prev: 'sage-hai', next: 'chapter4-sword' },
  'chapter4-sword': { prev: 'sage-thang', next: 'chapter5-pool' },
  'chapter5-pool': { prev: 'chapter4-sword', next: 'chapter6-uniform' },
  'chapter6-uniform': { prev: 'chapter5-pool', next: 'chapter7-shield' },
  'chapter7-shield': { prev: 'chapter6-uniform', next: 'chapter8-team' },
  'chapter8-team': { prev: 'chapter7-shield', next: 'ending' },
  'ending': { prev: 'chapter8-team', next: null }
};

// Pages to lazy load
const LAZY_PAGES = [
  'chapter3-intro', 'sage-huy', 'sage-hai', 'sage-duong', 
  'sage-trung', 'sage-tung', 'sage-thang', 'chapter4-sword', 
  'chapter5-pool', 'chapter6-uniform', 'chapter7-shield', 'chapter8-team', 'ending'
];

// State
let currentPageId = 'prologue';
let autoplayEnabled = true;
let loadedPages = new Set(['prologue', 'chapter1', 'chapter2']);
let currentAudio = null;
let isNavigating = false; // Prevent concurrent navigation

// ======================================================================
// INITIALIZATION
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {
  initOnePage();
});

function initOnePage() {
  console.log('🚀 Initializing The Vow One-Page App');
  
  // Show first page
  goToPage('prologue', false);
  
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }
  
  // Setup audio players for inline pages
  setupAudioPlayers();
  
  // Update progress
  updateProgress();
  
  console.log('✅ App initialized');
}

// ======================================================================
// PAGE NAVIGATION
// ======================================================================

async function goToPage(pageId, shouldAnimate = true) {
  console.log(`📄 Navigating to: ${pageId}`);
  
  // Stop current audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  // Hide current page
  const currentSection = document.querySelector('.page-section.active');
  if (currentSection && shouldAnimate) {
    currentSection.classList.remove('active');
  } else if (currentSection) {
    currentSection.classList.remove('active');
  }
  
  // Load page if not loaded yet
  if (!loadedPages.has(pageId) && LAZY_PAGES.includes(pageId)) {
    await loadPageComponent(pageId);
  }
  
  // Show target page
  const targetSection = document.querySelector(`#page-${pageId}`);
  if (targetSection) {
    targetSection.classList.add('active');
    currentPageId = pageId;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Wait for DOM to be ready
    await waitForDOMReady();
    
    // Re-init AOS for new page (must be after DOM ready)
    if (typeof AOS !== 'undefined') {
      // If this is a lazy-loaded page, we need to init AOS on its elements
      const aosElements = targetSection.querySelectorAll('[data-aos]');
      aosElements.forEach(el => {
        el.classList.add('aos-init');
      });
      AOS.refresh();
      
      // Trigger animations
      setTimeout(() => {
        aosElements.forEach(el => {
          el.classList.add('aos-animate');
        });
      }, 100);
    }
    
    // Setup audio for this page
    setupAudioPlayers();
    
    // Update progress
    updateProgress();
    
    console.log(`✅ Now on: ${pageId}`);
  } else {
    console.error(`❌ Page not found: ${pageId}`);
  }
}

// ======================================================================
// LAZY LOADING
// ======================================================================

async function loadPageComponent(pageId) {
  // Prevent duplicate loading
  if (loadedPages.has(pageId)) {
    console.log(`⚠️ Already loaded: ${pageId}`);
    return;
  }
  
  // Mark as loading immediately
  loadedPages.add(pageId);
  console.log(`⏳ Loading component: ${pageId}`);
  
  try {
    const response = await fetch(`components/${pageId}.html`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const html = await response.text();
    
    // Inject into lazy container
    const container = document.getElementById('lazy-pages-container');
    container.insertAdjacentHTML('beforeend', html);
    
    console.log(`✅ Loaded: ${pageId}`);
  } catch (error) {
    console.error(`❌ Failed to load ${pageId}:`, error);
    // Remove from loaded set on failure so it can retry
    loadedPages.delete(pageId);
  }
}

// ======================================================================
// AUDIO SYSTEM
// ======================================================================

function setupAudioPlayers() {
  const activeSection = document.querySelector('.page-section.active');
  if (!activeSection) return;
  
  const audio = activeSection.querySelector('.page-audio');
  const btn = activeSection.querySelector('.audio-btn');
  const progressBar = activeSection.querySelector('.audio-bar');
  const spinner = activeSection.querySelector('.rune-spinner');
  
  if (!audio || !btn) return;
  
  // Stop and reset current audio if it's different
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  currentAudio = audio;
  
  // Remove old listeners by cloning both button and audio
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  
  const newAudio = audio.cloneNode(true);
  audio.parentNode.replaceChild(newAudio, audio);
  currentAudio = newAudio;
  
  // Play/Pause toggle
  newBtn.addEventListener('click', () => {
    if (newAudio.paused) {
      newAudio.play();
      newBtn.textContent = newBtn.textContent.replace('▶', '⏸');
      if (spinner) spinner.classList.add('rune-active');
    } else {
      newAudio.pause();
      newBtn.textContent = newBtn.textContent.replace('⏸', '▶');
      if (spinner) spinner.classList.remove('rune-active');
    }
  });
  
  // Progress update
  newAudio.addEventListener('timeupdate', () => {
    if (progressBar && newAudio.duration) {
      const percent = (newAudio.currentTime / newAudio.duration) * 100;
      progressBar.style.width = percent + '%';
    }
  });
  
  // Audio ended - autoplay next (only once!)
  newAudio.addEventListener('ended', () => {
    console.log('🎵 Audio ended');
    if (spinner) spinner.classList.remove('rune-active');
    newBtn.textContent = newBtn.textContent.replace('⏸', '▶');
    
    if (autoplayEnabled) {
      setTimeout(() => autoPlayNext(), 1000);
    }
  }, { once: true }); // ← Important: only fire once!
  
  // Audio started
  newAudio.addEventListener('play', () => {
    if (spinner) spinner.classList.add('rune-active');
  });
  
  newAudio.addEventListener('pause', () => {
    if (spinner) spinner.classList.remove('rune-active');
  });
}

async function autoPlayNext() {
  // Prevent concurrent autoplay
  if (isNavigating) {
    console.log('⚠️ Already navigating, skipping autoPlayNext');
    return;
  }
  
  const nav = NAVIGATION_MAP[currentPageId];
  if (!nav || !nav.next) {
    console.log('📖 Story completed');
    return;
  }
  
  console.log(`⏭️ Auto-playing next: ${nav.next}`);
  
  isNavigating = true;
  
  try {
    await goToPage(nav.next, true);
    
    // Wait for page to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Auto-play audio
    const activeSection = document.querySelector('.page-section.active');
    const audio = activeSection?.querySelector('.page-audio');
    const btn = activeSection?.querySelector('.audio-btn');
    
    if (audio && btn) {
      try {
        await audio.play();
        btn.textContent = btn.textContent.replace('▶', '⏸');
        console.log('✅ Audio auto-started');
      } catch (e) {
        console.warn('⚠️ Autoplay blocked:', e);
      }
    }
  } finally {
    isNavigating = false;
  }
}

// ======================================================================
// PROGRESS SYSTEM
// ======================================================================

function updateProgress() {
  const allPages = Object.keys(NAVIGATION_MAP);
  const currentIndex = allPages.indexOf(currentPageId);
  const progress = Math.round(((currentIndex + 1) / allPages.length) * 100);
  
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');
  
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
  
  if (progressLabel) {
    progressLabel.textContent = `Memory Sync: ${progress}%`;
  }
}

// ======================================================================
// UTILITIES
// ======================================================================

function waitForDOMReady() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

// Download function (reused from main.js)
function downloadImage(filename) {
  const link = document.createElement('a');
  link.href = `assets/images/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Make functions global for onclick handlers
window.goToPage = goToPage;
window.downloadImage = downloadImage;

console.log('📚 The Vow One-Page App loaded');
