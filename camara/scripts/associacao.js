document.addEventListener('DOMContentLoaded', () => {
    const campoDataHora = document.querySelector('#dataHora');
    if (campoDataHora) {
        campoDataHora.value = new Date().toLocaleString('pt-BR');
    }

    const botoesAbrir = document.querySelectorAll('.btn-modal');
    const botoesFechar = document.querySelectorAll('.btn-fechar-modal');

    botoesAbrir.forEach(botao => {
        botao.addEventListener('click', () => {
            const modalId = botao.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    botoesFechar.forEach(botao => {
        botao.addEventListener('click', () => {
            const modal = botao.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });
});