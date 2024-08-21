document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    const content = container.innerHTML;
    container.innerHTML = '> Initializing...\n\n';

    function typeWriter(text, fnCallback) {
        const typingSpeed = Math.max(1, Math.floor(2000 / text.length)); // Ajusta la velocidad basada en la longitud del texto
        let i = 0;
        function type() {
            if (i < text.length) {
                container.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else if (typeof fnCallback == 'function') {
                fnCallback();
            }
        }
        type();
    }

    function startTextAnimation() {
        // Anima solo el título y un breve mensaje de bienvenida
        const title = document.querySelector('h1').textContent;
        const welcomeMessage = "Bienvenido al terminal. Cargando contenido...";
        
        typeWriter(title + '\n\n' + welcomeMessage, function() {
            // Restaura el contenido original después de la animación
            setTimeout(() => {
                container.innerHTML = content;
                // Añade el cursor parpadeante
                const cursor = document.createElement('div');
                cursor.className = 'blink';
                cursor.textContent = '> _';
                container.appendChild(cursor);
            }, 500);
        });
    }

    setTimeout(startTextAnimation, 100);
});