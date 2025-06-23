const routes = {
  "/": "<h1>Beranda</h1><p>Ini adalah halaman utama dari SPA.</p>",
  "/tentang": "<h1>Tentang Kami</h1><p>SPA ini dibuat dengan JavaScript murni dan menggunakan API publik.</p>",
  "/pengguna": "<h1>Daftar Pengguna</h1><div id='user-list'>Memuat data...</div>"
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + "#" + path);
  renderRoute(path);
}

function renderRoute(path) {
  const app = document.getElementById("app");
  app.innerHTML = routes[path] || "<h1>404 - Halaman tidak ditemukan</h1>";

  if (path === "/pengguna") {
    fetchUsers();
  }
}

async function fetchUsers() {
  const container = document.getElementById("user-list");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    container.innerHTML = users.map(user => `
      <div class="user-card">
        <strong>${user.name}</strong><br>
        <small>${user.email}</small><br>
        ${user.address.city}
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = "<p style='color:red;'>Gagal memuat data pengguna.</p>";
  }
}

window.addEventListener("popstate", () => {
  const path = location.hash.slice(1) || "/";
  renderRoute(path);
});

document.addEventListener("DOMContentLoaded", () => {
  const path = location.hash.slice(1) || "/";
  renderRoute(path);
});
