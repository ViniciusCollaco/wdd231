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

const conteiner = document.querySelector('#conteinerMembros');
const btnGrade = document.querySelector('#btnGrade');
const btnLista = document.querySelector('#btnLista');

async function carregarMembros() {
    try {
        const resposta = await fetch('dados/membros.json');
        if (!resposta.ok) {
            throw new Error(`Erro de HTTP! status: ${resposta.status}`);
        }
        const membros = await resposta.json();
        exibirMembros(membros);
    } catch (erro) {
        console.error('Erro ao carregar dados dos membros:', erro);
        conteiner.innerHTML = '<p>Erro ao carregar os dados dos membros.</p>';
    }
}

function exibirMembros(membros) {
    conteiner.innerHTML = ''; 
    
    membros.forEach(membro => {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-membro');

        const niveis = { 1: 'Membro', 2: 'Prata', 3: 'Ouro' };

        cartao.innerHTML = `
            <img src="imagens/empresas/${membro.imagem}" alt="Logo de ${membro.nome}" loading="lazy" width="100" height="100">
            <h3>${membro.nome}</h3>
            <p class="endereco">${membro.endereco}</p>
            <p class="telefone">${membro.telefone}</p>
            <p class="nivel">Nível: <strong>${niveis[membro.nivel]}</strong></p>
            <a href="${membro.website}" target="_blank" rel="noopener noreferrer">Visitar Website</a>
        `;
        conteiner.appendChild(cartao);
    });
}

btnGrade.addEventListener('click', () => {
    conteiner.className = 'view-grade';
    btnGrade.classList.add('active');
    btnLista.classList.remove('active');
});

btnLista.addEventListener('click', () => {
    conteiner.className = 'view-lista';
    btnLista.classList.add('active');
    btnGrade.classList.remove('active');
});

carregarMembros();