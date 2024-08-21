document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    if (!container) return; // Si no hay contenedor, no hacemos nada

    const originalContent = container.innerHTML;
    
    // Preparar el contenedor para la animación
    container.innerHTML = '<div id="animated-text"></div><div class="blink">> _</div>';
    const animatedTextElement = document.getElementById('animated-text');
    
    function animateText(text, duration) {
        const charsPerFrame = Math.ceil(text.length / (duration / 16)); // 60 FPS
        let currentIndex = 0;
        
        function frame() {
            if (currentIndex < text.length) {
                const nextIndex = Math.min(currentIndex + charsPerFrame, text.length);
                animatedTextElement.textContent += text.slice(currentIndex, nextIndex);
                currentIndex = nextIndex;
                requestAnimationFrame(frame);
            } else {
                finishAnimation();
            }
        }
        
        requestAnimationFrame(frame);
    }
    
    function finishAnimation() {
        setTimeout(() => {
            container.innerHTML = originalContent;
            const cursor = document.createElement('div');
            cursor.className = 'blink';
            cursor.textContent = '> _';
            container.appendChild(cursor);
        }, 200);
    }
    
    // Texto a animar
    const title = "Terminal";
    const welcomeMessage = "Bienvenido al terminal. Cargando contenido...";
    const textToAnimate = `> ${title}\n\n${welcomeMessage}`;
    
    // Comenzar la animación inmediatamente
    animateText(textToAnimate, 1500); // 1.5 segundos para la animación
});