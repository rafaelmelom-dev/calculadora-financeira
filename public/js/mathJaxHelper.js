document.body.addEventListener('htmx:afterSwap', function (event) {
    if (event.detail.target.id.startsWith('result')) {
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }
});
