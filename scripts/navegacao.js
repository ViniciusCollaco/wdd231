const menuButton = document.querySelector('#menu-hamburguer');
const navigation = document.querySelector('#menu-navegacao');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '❌' : '☰';
});