// Основной JavaScript код
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
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Убираем активный класс у всех элементов
      navItems.forEach(nav => nav.classList.remove('active'));
      // Добавляем активный класс к текущему элементу
      this.classList.add('active');
      
      // Скрываем все секции
      sections.forEach(section => section.classList.remove('active'));
      
      // Показываем выбранную секцию
      const sectionId = this.getAttribute('data-section');
      document.getElementById(sectionId).classList.add('active');
    });
  });

  // Случайное изменение значений статистики для эффекта "живого" терминала
  function randomizeStats() {
    document.getElementById('cpu-load').textContent = Math.floor(Math.random() * 20 + 20) + '%';
    document.getElementById('mem-usage').textContent = (Math.random() * 2 + 3).toFixed(1) + ' GB';
    document.getElementById('net-in').textContent = (Math.random() + 1).toFixed(1) + ' MB/s';
    document.getElementById('net-out').textContent = (Math.random() + 1.2).toFixed(1) + ' MB/s';
  }
  
  setInterval(randomizeStats, 5000);
});