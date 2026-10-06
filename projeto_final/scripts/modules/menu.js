export function inicializarMenu() {
    const btnHamburguer = document.querySelector('#btn-menu');
    const navMenu = document.querySelector('#nav-menu');

    if (!btnHamburguer || !navMenu) return;

    btnHamburguer.addEventListener('click', () => {
        const aberto = navMenu.classList.toggle('aberto');
        btnHamburguer.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        btnHamburguer.textContent = aberto ? '✕' : '☰';
    });
}