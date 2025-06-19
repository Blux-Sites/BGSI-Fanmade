const timerDisplay = document.getElementById('timer');
        const messageElement = document.getElementById('message');
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        // Размеры canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        
        // Функция для расчета времени до следующей субботы 22:00
        function getTimeUntilNextSaturday22() {
            const now = new Date();
            const target = new Date();
            
            // Устанавливаем целевое время на субботу 22:00
            target.setHours(23, 0, 0, 0);
            
            // Текущий день недели (0=воскресенье, 6=суббота)
            const currentDay = now.getDay();
            
            // Вычисляем сколько дней нужно добавить до следующей субботы
            let daysToAdd = 6 - currentDay;
            
            // Если сегодня суббота
            if (currentDay === 6) {
                // Если сейчас уже после 22:00, переключаем на следующую субботу
                if (now.getHours() >= 23) {
                    daysToAdd = 7;
                } else {
                    // Если до 22:00 - сегодняшний день
                    daysToAdd = 0;
                }
            } 
            // Если сегодня после субботы (воскресенье)
            else if (currentDay === 0) {
                daysToAdd = 6;
            }
            // Если сегодня до субботы
            else {
                daysToAdd = 6 - currentDay;
            }
            
            // Устанавливаем целевую дату
            target.setDate(now.getDate() + daysToAdd);
            
            // Если сегодня суббота и время до 22:00, оставляем сегодняшнюю дату
            if (daysToAdd === 0) {
                target.setDate(now.getDate());
            }
            
            return target - now;
        }
        
        // Форматирование времени
        function formatTime(ms) {
            if (ms <= 0) return "00:00:00";
            
            const totalSeconds = Math.floor(ms / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            if (days > 0) {
                return `${days}D ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
        
        // Запуск конфетти
        function launchConfetti() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
            const confetti = [];
            const confettiCount = 300;
            
            // Создаем частицы конфетти
            for (let i = 0; i < confettiCount; i++) {
                confetti.push({
                    x: Math.random() * canvas.width,
                    y: -Math.random() * canvas.height * 0.5,
                    size: Math.random() * 12 + 5,
                    speed: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 20,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shape: Math.random() > 0.5 ? 'circle' : 'square'
                });
            }
            
            // Анимация конфетти
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let activeParticles = 0;
                
                confetti.forEach(p => {
                    // Обновление позиции
                    p.y += p.speed;
                    p.rotation += p.rotationSpeed;
                    
                    // Физика падения
                    if (p.y < canvas.height) {
                        activeParticles++;
                        
                        // Рисуем частицу
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate(p.rotation * Math.PI / 180);
                        ctx.fillStyle = p.color;
                        
                        if (p.shape === 'circle') {
                            ctx.beginPath();
                            ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
                            ctx.fill();
                        } else {
                            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                        }
                        
                        ctx.restore();
                    }
                });
                
                // Продолжаем анимацию, если есть активные частицы
                if (activeParticles > 0) {
                    requestAnimationFrame(animate);
                }
            }
            
            animate();
        }
        
        // Обновление таймера
        function updateTimer() {
            const timeLeft = getTimeUntilNextSaturday22();
            
            // Если время вышло (наступила суббота 22:00)
            if (timeLeft <= 0) {
                timerDisplay.textContent = "00:00:00";
                timerDisplay.style.color = "#ff9900";
                timerDisplay.style.textShadow = "0 0 20px #ff9900";
                messageElement.textContent = "Ура! Сейчас суббота 22:00!";
                
                // Запускаем конфетти только если еще не запущены
                if (!window.confettiActive) {
                    window.confettiActive = true;
                    launchConfetti();
                }
                
                // Перезапуск таймера через 5 секунд
                setTimeout(() => {
                    timerDisplay.style.color = "";
                    timerDisplay.style.textShadow = "";
                    messageElement.textContent = "До следующей субботы 22:00 осталось:";
                    window.confettiActive = false;
                    updateTimer();
                }, 5000);
            } 
            // Если время еще есть
            else {
                timerDisplay.textContent = formatTime(timeLeft);
                // Запланировать следующее обновление через 1 секунду
                setTimeout(updateTimer, 1000);
            }
        }
        
        // Инициализация
        window.addEventListener('resize', resizeCanvas);
        window.confettiActive = false; // Флаг для конфетти
        updateTimer();

let button = document.getElementById('button_menu')
let menu = document.getElementById('Block_info')
let menub = document.getElementById('menu')
let return1 = document.getElementById('button_return')
let skibidi = document.getElementById('skibidi')
button.onclick = function(){
    menub.style.display = "none"
    button.style.display = "none"
    menu.style.display = "flex"
    menu.style.flexDirection = "column"
    menu.style.alignItems = "center"
    return1.style.display = "block"
}
return1.onclick = function(){
    menub.style.display = "block"
    button.style.display = "block"
    menu.style.display = "none"
    return1.style.display = "none"
}
document.addEventListener('DOMContentLoaded', function() {
    // Ждем 100мс чтобы страница успела отрисоваться
    setTimeout(function() {
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.add('animate');
        });
    }, 2200);
});
// Проверка на обновление (суббота 11:30)
function checkForUpdate() {
    const now = new Date();
    const day = now.getDay(); // 0-6 (0=воскресенье, 6=суббота)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Если суббота и время 11:30
    if (day === 6 && hours === 11 && minutes === 30) {
        const preloaderText = document.querySelector('#preloader p');
        if (preloaderText) {
            preloaderText.textContent = 'Updating site';
        }
        
        // Ждем 5 секунд и перезагружаем
        setTimeout(() => {
            location.reload();
        }, 10000);
        
        return true;
    }
    return false;
}

// Запускаем проверку обновления
const isUpdateTime = checkForUpdate();

// Если не время обновления, стандартное поведение прелоадера
if (!isUpdateTime) {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('content');
        
        // Плавное исчезновение прелоадера
        preloader.style.opacity = '0';
        
        // После завершения анимации скрываем прелоадер
        setTimeout(() => {
            preloader.style.display = 'none';
            if (content) content.style.display = 'block';
        }, 0);
    }, 2000);
}
