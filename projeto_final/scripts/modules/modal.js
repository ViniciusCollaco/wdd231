export function inicializarModal() {
    const modal = document.querySelector('#modal-detalhes');
    const botaoFechar = document.querySelector('#fechar-modal');

    if (!modal || !botaoFechar) return;

    botaoFechar.addEventListener('click', fecharModal);
    
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) fecharModal();
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && modal.classList.contains('ativo')) {
        fecharModal();
        }
    });
    }

    export function abrirModal(persiana) {
    const modal = document.querySelector('#modal-detalhes');
    const conteudo = document.querySelector('#conteudo-modal');

    if (!modal || !conteudo) return;

    conteudo.innerHTML = `
        <h2>${persiana.nome}</h2>
        <img src="${persiana.imagem}" alt="${persiana.nome}" loading="lazy" width="400" height="300">
        <p><strong>Categoria:</strong> ${persiana.categoria}</p>
        <p><strong>Material:</strong> ${persiana.material}</p>
        <p><strong>Bloqueio de Luz:</strong> ${persiana.bloqueioLuz}</p>
        <p><strong>Avaliação dos Clientes:</strong> ⭐ ${persiana.avaliacao} / 5.0</p>
        <p class="descricao-modal">${persiana.descricao}</p>
        <a href="orcamento.html?produto=${encodeURIComponent(persiana.nome)}" class="btn-cta">Solicitar Orçamento Deste Modelo</a>
    `;

    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    }

    export function fecharModal() {
    const modal = document.querySelector('#modal-detalhes');
    if (!modal) return;

    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}