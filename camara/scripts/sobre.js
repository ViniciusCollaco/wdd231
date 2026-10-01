import { lugaresInteresse } from '../data/lugares.mjs';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#anoAtual').textContent = new Date().getFullYear();
    document.querySelector('#ultimaModificacao').textContent = `Última Modificação: ${document.lastModified}`;

    const btnMenu = document.querySelector('#btnMenu');
    const navMenu = document.querySelector('#navMenu');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            const estaAberto = navMenu.classList.toggle('open');
            btnMenu.setAttribute('aria-expanded', estaAberto);
            btnMenu.innerHTML = estaAberto ? '&times;' : '&#9776;'; 
        });
    }

    gerenciarMensagemVisita();

    renderizarCartoes();
});

function gerenciarMensagemVisita() {
    const elMensagem = document.querySelector('#mensagemVisita');
    if (!elMensagem) return;

    const ULTIMA_VISITA_KEY = 'camara_ultima_visita';
    const agora = Date.now();
    const ultimaVisita = localStorage.getItem(ULTIMA_VISITA_KEY);

    if (!ultimaVisita) {
        elMensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const msPorDia = 1000 * 60 * 60 * 24;
        const diferencaMs = agora - parseInt(ultimaVisita, 10);
        const diasDiferenca = Math.floor(diferencaMs / msPorDia);

        if (diasDiferenca < 1) {
            elMensagem.textContent = "Já voltou? Que legal!";
        } else if (diasDiferenca === 1) {
            elMensagem.textContent = "Seu último acesso foi há 1 dia.";
        } else {
            elMensagem.textContent = `Seu último acesso foi há ${diasDiferenca} dias.`;
        }
    }

    localStorage.setItem(ULTIMA_VISITA_KEY, agora.toString());
}

function renderizarCartoes() {
    const conteiner = document.querySelector('#conteinerGaleria');
    if (!conteiner) return;

    conteiner.innerHTML = '';

    lugaresInteresse.forEach((item, index) => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-interesse');
        cartao.style.gridArea = `area${index + 1}`;

        cartao.innerHTML = `
            <h2>${item.nome}</h2>
            <figure>
                <img src="${item.imagem}" alt="${item.nome}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.endereco}</address>
            <p>${item.descricao}</p>
            <button class="btn-saiba-mais" data-id="${item.id}">Saiba mais</button>
        `;

        conteiner.appendChild(cartao);
    });

    const modal = document.querySelector('#modalInfo');
    const modalTitulo = document.querySelector('#modalTitulo');
    const modalDescricao = document.querySelector('#modalDescricao');
    const btnFechar = document.querySelector('#btnFecharModal');

    document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = lugaresInteresse.find(l => l.id === id);

            if (item) {
                modalTitulo.textContent = item.nome;
                modalDescricao.textContent = `${item.descricao} Localizado em: ${item.endereco}.`;
                modal.showModal();
            }
        });
    });

    if (btnFechar && modal) {
        btnFechar.addEventListener('click', () => modal.close());
    }
}