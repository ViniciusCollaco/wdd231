const menuButton = document.querySelector('#menu-hamburguer');
const navigation = document.querySelector('#menu-navegacao');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    const isOpen = navigation.classList.contains('open');
    menuButton.textContent = isOpen ? '❌' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
});