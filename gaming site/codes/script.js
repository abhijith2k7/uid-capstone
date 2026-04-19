// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {
  setupSearch();
  setupLoginForm();
  setupPlanButtons();
  setupSupportButton();
  setupCardInteractions();
  setupImageFallbacks();
  setupSmoothLinks();
  setupHoverTilt();
  setupNewsletterButton();
});

// ===== TOAST =====
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// ===== SEARCH =====
function setupSearch() {
  const searchInput = document.querySelector(".search-box input");
  if (!searchInput) return;

  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      showToast("Please enter a game name");
      return;
    }

    const cards = document.querySelectorAll(".card, .game, .item");
    let found = false;

    cards.forEach((card) => {
      const text = card.textContent.trim().toLowerCase();
      if (text.includes(query)) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("search-hit");
        found = true;

        setTimeout(() => {
          card.classList.remove("search-hit");
        }, 1800);
      }
    });

    if (found) {
      showToast(`Showing results for "${query}"`, "success");
    } else {
      showToast(`No results found for "${query}"`, "error");
    }
  });
}

// ===== LOGIN FORM =====
function setupLoginForm() {
  const loginForm = document.querySelector(".login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]');
    const password = loginForm.querySelector('input[type="password"]');

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
      showToast("Please fill all login fields", "error");
      return;
    }

    if (!validateEmail(emailValue)) {
      showToast("Enter a valid email address", "error");
      return;
    }

    if (passwordValue.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    showToast("Login successful", "success");

    setTimeout(() => {
      window.location.href = "gaming.html";
    }, 1200);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== PLANS PAGE =====
function setupPlanButtons() {
  const monthlyBtn = document.querySelector(".buy-monthly");
  const yearlyBtn = document.querySelector(".buy-yearly");

  if (monthlyBtn) {
    monthlyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Monthly plan selected", "success");
    });
  }

  if (yearlyBtn) {
    yearlyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Yearly plan selected", "success");
    });
  }
}

// ===== SUPPORT =====
function setupSupportButton() {
  const supportBtn = document.querySelector(".support .btn");
  if (!supportBtn) return;

  supportBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Support page will be added soon", "info");
  });
}

// ===== CARD CLICKS =====
function setupCardInteractions() {
  const cards = document.querySelectorAll(".card, .game, .item");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.innerText.trim();
      if (title) {
        showToast(`${title} selected`, "success");
      }
    });
  });
}

// ===== IMAGE FALLBACK =====
function setupImageFallbacks() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", () => {
      img.style.objectFit = "contain";
      img.style.padding = "20px";
      img.style.background = "#111";
      img.alt = "Image not found";
    });
  });
}

// ===== SMOOTH LINKS =====
function setupSmoothLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ===== HOVER TILT =====
function setupHoverTilt() {
  const cards = document.querySelectorAll(".card, .game");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ===== NEWSLETTER =====
function setupNewsletterButton() {
  const subscribeBtn = document.querySelector('.newsletter .btn');
  if (!subscribeBtn) return;

  subscribeBtn.addEventListener("click", () => {
    showToast("Opening subscription plans...", "success");
  });
}
function openInfo(){
  document.getElementById("gtaModal").style.display = "block";
}

function closeInfo(){
  document.getElementById("gtaModal").style.display = "none";
}
function addToFavourites(name, image, page) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const exists = favourites.some(game => game.name === name);
  if (!exists) {
    favourites.push({ name, image, page });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert(name + " added to Favourites");
  } else {
    alert(name + " is already in Favourites");
  }
}

function addToDownloads(name, image, page) {
  const downloads = JSON.parse(localStorage.getItem("downloads")) || [];

  const exists = downloads.some(game => game.name === name);
  if (!exists) {
    downloads.push({ name, image, page });
    localStorage.setItem("downloads", JSON.stringify(downloads));
    alert(name + " added to Downloads");
  } else {
    alert(name + " is already in Downloads");
  }
}

function renderSavedGames(storageKey, containerId) {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];
  const container = document.getElementById(containerId);

  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#ccc;">No games added yet.</p>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <a href="${item.page}" class="card">
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSavedGames("favourites", "favourites-list");
  renderSavedGames("downloads", "downloads-list");
});