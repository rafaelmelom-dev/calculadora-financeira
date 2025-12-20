const themeSwitcherButton = document.getElementById('theme-switcher-btn');
const svgPath = document.getElementById('theme-swithcer-svg-path');
const html = document.documentElement;
const body = document.body;

function setThemeCookie(theme) {
    document.cookie = `theme=${theme}; max-age=${60*60*24*365}; path=/; SameSite=Lax`;
}

themeSwitcherButton.addEventListener('click', () => {
    const actualTheme = html.getAttribute('data-bs-theme');
    let newTheme;

    if (actualTheme === 'dark') {
        newTheme = 'light';
        html.setAttribute('data-bs-theme', 'light');
        body.setAttribute('class', 'bg-light')
        svgPath.setAttribute('stroke', '#000000')
    } else {
        newTheme = 'dark';
        html.setAttribute('data-bs-theme', 'dark');
        body.setAttribute('class', 'bd-dark');
        svgPath.setAttribute('stroke', '#ffffff')
    }

    setThemeCookie(newTheme);
})