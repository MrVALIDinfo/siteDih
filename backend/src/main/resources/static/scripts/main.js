document.addEventListener('DOMContentLoaded', function() {
  // Обновление системного времени
  function updateSystemTime() {
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('system-time').textContent = formattedTime;
  }
  
  setInterval(updateSystemTime, 1000);
  updateSystemTime();

  // Переключение секций
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  
  function showSection(sectionId) {
    // Снимаем активный класс у всех nav
    navItems.forEach(nav => nav.classList.remove('active'));
    // Добавляем активный класс к nav с этим sectionId
    document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');
    
    // Скрываем все секции
    sections.forEach(section => section.classList.remove('active'));
    // Показываем выбранную секцию
    document.getElementById(sectionId).classList.add('active');
  }

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      // Меняем URL без перезагрузки страницы
      window.history.pushState({}, "", "/" + sectionId);
    });
  });

  // Обработка кнопки "назад/вперед" браузера
  window.addEventListener('popstate', function() {
    const path = window.location.pathname.substring(1); // убираем /
    if (path) showSection(path);
    else showSection('home'); // по умолчанию home
  });

  // Показываем секцию по умолчанию
  const initialPath = window.location.pathname.substring(1);
  if (initialPath) showSection(initialPath);
  else showSection('home');

  // Случайное изменение значений статистики
  function randomizeStats() {
    document.getElementById('cpu-load').textContent = Math.floor(Math.random() * 20 + 20) + '%';
    document.getElementById('mem-usage').textContent = (Math.random() * 2 + 3).toFixed(1) + ' GB';
    document.getElementById('net-in').textContent = (Math.random() + 1).toFixed(1) + ' MB/s';
    document.getElementById('net-out').textContent = (Math.random() + 1.2).toFixed(1) + ' MB/s';
  }
  
  setInterval(randomizeStats, 5000);
});
