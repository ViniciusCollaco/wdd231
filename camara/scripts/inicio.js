document.querySelector('#anoAtual').textContent = new Date().getFullYear();
document.querySelector('#ultimaModificacao').textContent = `Última Modificação: ${document.lastModified}`;

const btnMenu = document.querySelector('#btnMenu');
const navMenu = document.querySelector('#navMenu');

btnMenu.addEventListener('click', () => {
    const estaAberto = navMenu.classList.toggle('open');
    btnMenu.setAttribute('aria-expanded', estaAberto);
    btnMenu.innerHTML = estaAberto ? '&times;' : '&#9776;'; 
});

const API_KEY = '5b97d6443c1889684ee067ec60dd1c1b';
const LAT = '-25.4284'; 
const LON = '-49.2733'; 

const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;

async function obterClima() {
    try {
        const respostaClima = await fetch(urlClima);
        if (respostaClima.ok) {
            const dadosClima = await respostaClima.json();
            exibirClimaAtual(dadosClima);
        }

        const respostaPrevisao = await fetch(urlPrevisao);
        if (respostaPrevisao.ok) {
            const dadosPrevisao = await respostaPrevisao.json();
            exibirPrevisao3Dias(dadosPrevisao);
        }
    } catch (erro) {
        console.error('Erro ao obter dados meteorológicos:', erro);
    }
}

function exibirClimaAtual(dados) {
    const conteinerClima = document.querySelector('#climaAtual');
    const temp = Math.round(dados.main.temp);
    const descricao = dados.weather[0].description;
    const icone = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;

    conteinerClima.innerHTML = `
        <div class="info-clima-box">
            <img src="${icone}" alt="${descricao}" width="64" height="64">
            <div>
                <p class="temp-destaque">${temp}°C</p>
                <p class="desc-clima">${descricao}</p>
            </div>
        </div>
    `;
}

function exibirPrevisao3Dias(dados) {
    const conteinerPrevisao = document.querySelector('#previsaoTempo');
    
    const hoje = new Date().toISOString().split('T')[0];
    const listaPrevisoes = dados.list;
    const previsoesPorDia = {};

    listaPrevisoes.forEach(item => {
        const dataStr = item.dt_txt.split(' ')[0];
        if (dataStr !== hoje) { // Ignora o dia atual
            if (!previsoesPorDia[dataStr]) {
                previsoesPorDia[dataStr] = item;
            } else if (item.dt_txt.includes('12:00:00')) {
                previsoesPorDia[dataStr] = item;
            }
        }
    });

    const diasChaves = Object.keys(previsoesPorDia).slice(0, 3);

    let htmlContent = '<ul class="lista-previsao">';
    diasChaves.forEach(dataKey => {
        const item = previsoesPorDia[dataKey];
        const dataObj = new Date(item.dt_txt);
        const diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'short' });
        const temp = Math.round(item.main.temp);
        
        htmlContent += `<li><strong>${diaSemana.toUpperCase()}:</strong> ${temp}°C - ${item.weather[0].description}</li>`;
    });
    htmlContent += '</ul>';

    conteinerPrevisao.innerHTML = htmlContent;
}

async function carregarDestaques() {
    try {
        const resposta = await fetch('dados/membros.json');
        if (!resposta.ok) throw new Error('Erro ao ler membros.json');
        const membros = await resposta.json();

        const qualificados = membros.filter(m => m.nivel === 2 || m.nivel === 3);

        for (let i = qualificados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [qualificados[i], qualificados[j]] = [qualificados[j], qualificados[i]];
        }

        const selecionados = qualificados.slice(0, 3);

        exibirDestaques(selecionados);
    } catch (erro) {
        console.error('Erro ao carregar destaques:', erro);
    }
}

function exibirDestaques(membros) {
    const conteiner = document.querySelector('#conteinerDestaques');
    conteiner.innerHTML = '';

    membros.forEach(membro => {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-membro');

        const niveis = { 2: 'Prata', 3: 'Ouro' };

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

obterClima();
carregarDestaques();