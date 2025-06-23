const routes = {
  "/": "<h1>Selamat datang di Beranda</h1><p>Ini halaman utama.</p>",
  "/tentang": "<h1>Tentang Kami</h1><p>Kami belajar membuat SPA dengan JS.</p>",
  "/kontak": "<h1>Kontak</h1><p>Email: kamu@example.com</p>"
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + "#" + path);
  renderRoute(path);
}

function renderRoute(path) {
  const app = document.getElementById("app");
  app.innerHTML = routes[path] || "<h1>404 - Halaman tidak ditemukan</h1>";
}

// Untuk back/forward browser
window.addEventListener("popstate", () => {
  const path = location.hash.slice(1) || "/";
  renderRoute(path);
});

// Load awal
document.addEventListener("DOMContentLoaded", () => {
  const path = location.hash.slice(1) || "/";
  renderRoute(path);
});
