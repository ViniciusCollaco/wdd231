import { lugaresInteresse } from '../data/lugares.mjs';

document.addEventListener('DOMContentLoaded', () => {
    gerenciarMensagemVisita();
    renderizarPontosInteresse();
});

function gerenciarMensagemVisita() {
    const elementoMensagem = document.querySelector('#mensagemVisita');
    if (!elementoMensagem) return;

    const ULTIMO_ACESSO_KEY = 'camara_ultimo_acesso';
    const agora = Date.now();
    const ultimoAcesso = localStorage.getItem(ULTIMO_ACESSO_KEY);

    if (!ultimoAcesso) {
        elementoMensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const diferencaMS = agora - parseInt(ultimoAcesso, 10);
        const UM_DIA_MS = 24 * 60 * 60 * 1000;

        if (diferencaMS < UM_DIA_MS) {
            elementoMensagem.textContent = "Já voltou? Que legal!";
        } else {
            const dias = Math.floor(diferencaMS / UM_DIA_MS);
            if (dias === 1) {
                elementoMensagem.textContent = "Seu último acesso foi há 1 dia.";
            } else {
                elementoMensagem.textContent = `Seu último acesso foi há ${dias} dias.`;
            }
        }
    }

    localStorage.setItem(ULTIMO_ACESSO_KEY, agora.toString());
}

function renderizarPontosInteresse() {
    const containerGrade = document.querySelector('.grade-pontos');
    if (!containerGrade) return;

    containerGrade.innerHTML = '';

    lugaresInteresse.forEach(item => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-ponto', item.id);

        cartao.innerHTML = `
            <h2>${item.nome}</h2>
            <figure>
                <img src="${item.imagem}" alt="${item.nome}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.endereco}</address>
            <p>${item.descricao}</p>
            <button type="button" class="btn-saiba-mais">Saiba Mais</button>
        `;

        containerGrade.appendChild(cartao);
    });
}