function downloadImage(fileName) {
  const link = document.createElement('a');
  link.href = `assets/images/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.addEventListener("scroll", () => {
  const body = document.body;
  const html = document.documentElement;

  const scrollTop = html.scrollTop || body.scrollTop;
  const scrollHeight = html.scrollHeight || body.scrollHeight;
  const clientHeight = html.clientHeight;

  const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

  const bar = document.getElementById("progress-bar");
  const label = document.getElementById("progress-label");

  if (bar) bar.style.width = scrolled + "%";
  if (label) label.innerHTML = `Memory Sync: ${Math.round(scrolled)}%`;
});

function pageTransition(url) {
  const overlay = document.getElementById("fade-overlay");
  overlay.classList.add("active");

  setTimeout(() => {
    window.location = url;
  }, 400);
}

// Catch all links with .transition-link
document.querySelectorAll("a.transition-link").forEach(link => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (!url.includes("http")) {
      e.preventDefault();
      pageTransition(url);
    }
  });
});

/* ========== AUDIO PLAYER – THE VOW INTRO ========== */

function toggleNarration() {
  const audio = document.getElementById("narration");
  const btn = document.querySelector(".audio-btn");

    // Inside toggleNarration()
    if (audio.paused) {
        audio.play();
        btn.innerText = "❚❚ Pause Narration";
        btn.classList.add("pulsing");
    } else {
        audio.pause();
        btn.innerText = "▶ Listen to the Legend";
        btn.classList.remove("pulsing");
    }

    audio.addEventListener("ended", () => {
        btn.innerText = "▶ Listen to the Legend";
        btn.classList.remove("pulsing");
    });
}

// PROGRESS BAR
const narration = document.getElementById("narration");
const audioBar = document.getElementById("audio-bar");

if (narration) {
  narration.addEventListener("timeupdate", () => {
    const p = narration.currentTime / narration.duration;
    audioBar.style.width = (p * 100) + "%";
  });
}

// Attempt autoplay after small delay
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("narration");
  if (audio) {
    setTimeout(() => {
      audio.play().catch(() => {
        console.log("Autoplay blocked — waiting for user interaction.");
      });
    }, 500);
  }
});

/* Rune spin control */
const rune = document.getElementById("rune-spinner");

narration.addEventListener("play", () => {
  rune.classList.add("rune-active");
});

narration.addEventListener("pause", () => {
  rune.classList.remove("rune-active");
});

narration.addEventListener("ended", () => {
  rune.classList.remove("rune-active");
});