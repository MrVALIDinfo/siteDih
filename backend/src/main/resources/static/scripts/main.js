document.addEventListener('DOMContentLoaded', function() {
  // === Функция для показа toast-уведомлений ===
  function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');
    if (!container) return alert(message); // fallback

    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    container.appendChild(toast);

    // Авто-удаление после анимации
    setTimeout(() => toast.remove(), 3000);
  }

  // === Обновление системного времени ===
  function updateSystemTime() {
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);
    const timeEl = document.getElementById('system-time');
    if (timeEl) timeEl.textContent = formattedTime;
  }
  setInterval(updateSystemTime, 1000);
  updateSystemTime();

  // === Случайная статистика ===
  function randomizeStats() {
    const cpu = document.getElementById('cpu-load');
    const mem = document.getElementById('mem-usage');
    const netIn = document.getElementById('net-in');
    const netOut = document.getElementById('net-out');

    if (cpu) cpu.textContent = Math.floor(Math.random() * 20 + 20) + '%';
    if (mem) mem.textContent = (Math.random() * 2 + 3).toFixed(1) + ' GB';
    if (netIn) netIn.textContent = (Math.random() + 1).toFixed(1) + ' MB/s';
    if (netOut) netOut.textContent = (Math.random() + 1.2).toFixed(1) + ' MB/s';
  }
  setInterval(randomizeStats, 5000);

  // === DOM элементы ===
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginTitle = document.getElementById("login-title");
  const loginDesc = document.getElementById("login-desc");
  const showRegisterBtn = document.getElementById("show-register");
  const backToLoginBtn = document.getElementById("back-to-login");

  // === Функции для секций ===
  function showSection(sectionId) {
    sections.forEach(sec => sec.classList.remove('active'));
    navItems.forEach(nav => nav.classList.remove('active'));

    const sec = document.getElementById(sectionId);
    if (sec) sec.classList.add('active');

    if (sectionId !== 'login' && sectionId !== 'register') {
      const nav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
      if (nav) nav.classList.add('active');
    }

    if (sectionId === 'login') showLoginForm();
    if (sectionId === 'register') showRegisterForm();
  }

  function showLoginForm() {
    if (loginForm && registerForm) {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      loginTitle.textContent = "SECURE LOGIN";
      loginDesc.textContent = "Access restricted areas with your credentials.";
    }
  }

  function showRegisterForm() {
    if (loginForm && registerForm) {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      loginTitle.textContent = "REGISTER";
      loginDesc.textContent = "Create your secure account.";
    }
  }

  // === Навигация по меню ===
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      window.history.pushState({}, "", "/" + sectionId);
    });
  });

  // === Кнопки логина/регистрации ===
  showRegisterBtn.addEventListener("click", () => {
    showRegisterForm();
    window.history.pushState({}, "", "/register");
  });

  backToLoginBtn.addEventListener("click", () => {
    showLoginForm();
    window.history.pushState({}, "", "/login");
  });

  // === Обработка кнопок браузера ===
  window.addEventListener('popstate', function() {
    const path = window.location.pathname.substring(1);
    if (path) showSection(path);
    else showSection('home');
  });

  // === Автозагрузка секции по URL ===
  const initialPath = window.location.pathname.substring(1);
  if (initialPath) showSection(initialPath);
  else showSection('home');

  // === Обработчик регистрации ===
  document.querySelector("#register-form .btn.reg").addEventListener("click", async () => {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        showToast("✅ Успешно зарегистрирован!", "success");
        showLoginForm();
        window.history.pushState({}, "", "/login");
      } else {
        showToast("❌ Регистрация не прошла", "error");
      }
    } catch (e) {
      showToast("⚠️ Нет связи с сервером", "error");
    }
  });

  // === Обработчик логина ===
  document.querySelector("#login-form .btn.aut").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const user = await response.json();
        showToast("👋 Привет, " + user.username + "!", "success");
        showSection("home");
        window.history.pushState({}, "", "/home");
      } else {
        showToast("❌ Неверный логин или пароль", "error");
      }
    } catch (e) {
      showToast("⚠️ Нет связи с сервером", "error");
    }
  });
});
