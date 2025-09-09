// Улучшенный Matrix эффект
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  
  // Установка размера canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Расширенный набор символов
  const japaneseChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = japaneseChars + latinChars + numbers + symbols;
  
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Массив для хранения позиции Y каждой колонки
  const drops = [];
  // Массив для хранения скорости каждой колонки
  const speeds = [];
  
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Начинаем выше экрана
    speeds[i] = Math.random() * 0.5 + 0.5; // Разная скорость
  }
  
  // Функция рисования Matrix эффекта
  function draw() {
    // Более прозрачный фон для лучшего эффекта
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < drops.length; i++) {
      // Случайный символ
      const text = allChars.charAt(Math.floor(Math.random() * allChars.length));
      
      // Случайный размер шрифта
      const randomSize = Math.floor(Math.random() * 8) + 14;
      ctx.font = `${randomSize}px 'Share Tech Mono', monospace`;
      
      // Градиентная яркость (верх ярче, низ темнее)
      const brightness = Math.max(50, 200 - (drops[i] * 1.5));
      ctx.fillStyle = `rgb(0, ${brightness}, 0)`;
      
      // Рисуем символ
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Сброс капли, если она достигла низа
      if (drops[i] * fontSize > canvas.height) {
        drops[i] = Math.random() * -50;
        speeds[i] = Math.random() * 0.5 + 0.5;
      }
      
      // Перемещение капли вниз
      drops[i] += speeds[i];
    }
  }
  
  // Запуск анимации
  setInterval(draw, 33);
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Пересчет колонок
    const newColumns = Math.floor(canvas.width / fontSize);
    
    // Обновление массивов
    if (newColumns > columns) {
      for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = Math.random() * 0.5 + 0.5;
      }
    } else {
      drops.length = newColumns;
      speeds.length = newColumns;
    }
  });
});