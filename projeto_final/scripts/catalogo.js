import { buscarPersianas } from './modules/fetch_data.js';
import { inicializarModal, abrirModal } from './modules/modal.js';
import { inicializarMenu } from './modules/menu.js';
import { salvarFavorito, removerFavorito, obterFavoritos } from './modules/storage.js';

let listaPersianas = [];

document.addEventListener('DOMContentLoaded', async () => {
    inicializarMenu();
    inicializarModal();

    listaPersianas = await buscarPersianas();
    renderizarCatalogo(listaPersianas);

    configurarFiltros();
});

function renderizarCatalogo(itens) {
    const container = document.querySelector('#container-produtos');
    const contador = document.querySelector('#contador-produtos');
    const favoritos = obterFavoritos();

    if (!container) return;

    if (contador) {
        contador.textContent = `Exibindo ${itens.length} modelo(s)`;
    }

    container.innerHTML = '';

    if (itens.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhum modelo encontrado com os filtros selecionados.</p>';
        return;
    }

    itens.forEach(persiana => {
        const eFavorito = favoritos.includes(persiana.id);
        const cartao = document.createElement('article');
        cartao.className = 'cartao-produto';

        cartao.innerHTML = `
        <div class="imagem-box">
            <img src="${persiana.imagem}" alt="${persiana.nome}" loading="lazy" width="300" height="200">
            <button class="btn-favorito ${eFavorito ? 'ativo' : ''}" data-id="${persiana.id}" aria-label="Favoritar ${persiana.nome}">
            ${eFavorito ? '♥' : '♡'}
            </button>
        </div>
        <div class="conteudo-produto">
            <span class="tag-categoria">${persiana.categoria}</span>
            <h3>${persiana.nome}</h3>
            <p><strong>Material:</strong> ${persiana.material}</p>
            <p><strong>Bloqueio:</strong> ${persiana.bloqueioLuz}</p>
            <p class="avaliacao">⭐ ${persiana.avaliacao}</p>
            <button class="btn-detalhes" data-id="${persiana.id}">Ver Detalhes</button>
        </div>
        `;

        container.appendChild(cartao);
    });

    adicionarEventosCartoes();
}

function adicionarEventosCartoes() {
    document.querySelectorAll('.btn-detalhes').forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const itemEncontrado = listaPersianas.find(p => p.id === id);
        if (itemEncontrado) abrirModal(itemEncontrado);
        });
    });

    document.querySelectorAll('.btn-favorito').forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const favoritos = obterFavoritos();

        if (favoritos.includes(id)) {
            removerFavorito(id);
            e.target.classList.remove('ativo');
            e.target.textContent = '♡';
        } else {
            salvarFavorito(id);
            e.target.classList.add('ativo');
            e.target.textContent = '♥';
        }
        });
    });
}

function configurarFiltros() {
    const seletorCategoria = document.querySelector('#filtro-categoria');
    if (!seletorCategoria) return;

    seletorCategoria.addEventListener('change', (e) => {
        const categoriaSelecionada = e.target.value;

        if (categoriaSelecionada === 'todas') {
        renderizarCatalogo(listaPersianas);
        } else {
        const filtrados = listaPersianas.filter(item => item.categoria.toLowerCase() === categoriaSelecionada.toLowerCase());
        renderizarCatalogo(filtrados);
        }
    });
}