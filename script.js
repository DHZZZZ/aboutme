const routes = {
  "/": "<h1>Selamat Datang!</h1><p>Ikuti event menarik dan dapatkan hadiah/voucher eksklusif!</p>",
  "/hadiah": "<h1>Daftar Hadiah</h1><div id='hadiah-list'>Memuat hadiah...</div>",
  "/voucher": `
    <h1>Voucher Spesial</h1>
    <img src="https://via.placeholder.com/300x150?text=Voucher+1" class="voucher-img" />
    <img src="https://via.placeholder.com/300x150?text=Voucher+2" class="voucher-img" />
  `
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + "#" + path);
  renderRoute(path);
}

function renderRoute(path) {
  const app = document.getElementById("app");
  app.innerHTML = routes[path] || "<h1>404 - Halaman tidak ditemukan</h1>";

  if (path === "/hadiah") {
    fetchHadiah();
  }
}

async function fetchHadiah() {
  const list = document.getElementById("hadiah-list");
  try {
    const res = await fetch("hadiah.json");
    const data = await res.json();
    list.innerHTML = data.map(item => `
      <div class="card">
        <strong>${item.nama}</strong><br>${item.deskripsi}
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = "<p style='color:red;'>Gagal memuat data hadiah.</p>";
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
