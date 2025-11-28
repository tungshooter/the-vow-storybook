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