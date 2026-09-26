document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const campos = ['nome', 'sobrenome', 'email', 'celular', 'organizacao', 'dataHora'];

    campos.forEach(campo => {
        const valor = urlParams.get(campo);
        const elemento = document.querySelector(`#resumo-${campo}`);
        if (elemento) {
            elemento.textContent = valor ? decodeURIComponent(valor) : 'Não informado';
        }
    });
});