document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    container.innerHTML = '> Initializing...\n\n' + container.innerHTML;
    
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            container.innerHTML = container.innerHTML.slice(0, -1) + text.charAt(i) + "_";
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 50);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }
    
    function startTextAnimation(i) {
        if (i < container.children.length) {
            let text = container.children[i].outerHTML;
            container.innerHTML = container.innerHTML.slice(0, -1) + "\n" + ">";
            typeWriter(text, 0, function(){
                startTextAnimation(i + 1);
            });
        }
    }
    
    setTimeout(function() {
        container.innerHTML = container.innerHTML.slice(0, -1);
        startTextAnimation(0);
    }, 1000);
});