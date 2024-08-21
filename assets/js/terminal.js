document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    const content = container.innerHTML;
    container.innerHTML = '> Initializing...\n\n';

    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            container.innerHTML = container.innerHTML.slice(0, -1) + text.charAt(i) + "_";
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 5);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function startTextAnimation(i) {
        const contentArray = content.split('\n');
        if (i < contentArray.length) {
            typeWriter(contentArray[i] + '\n', 0, function() {
                startTextAnimation(i + 1);
            });
        } else {
            // Restore the original content to ensure all event listeners are intact
            container.innerHTML = content;
            // Add blinking cursor
            const cursor = document.createElement('div');
            cursor.className = 'blink';
            cursor.textContent = '> _';
            container.appendChild(cursor);
        }
    }

    setTimeout(function() {
        container.innerHTML = '';
        startTextAnimation(0);
    }, 1000);
});