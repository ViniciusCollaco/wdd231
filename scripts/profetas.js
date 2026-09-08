const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');


function formatarData(dataString) {
    if (!dataString) return 'N/A';
    
    const [ano, mes, dia] = dataString.split('-');
    const data = new Date(Date.UTC(ano, mes - 1, dia));

    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(data);
}

async function obterDadosDeProfetas() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        exibirProfetas(dados.profetas);
    } catch (erro) {
        console.error('Erro ao carregar dados do JSON:', erro);
    }
}

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        let cartao = document.createElement('section');
        let nomeCompleto = document.createElement('h2');
        let divInfo = document.createElement('div');
        let dataNascimento = document.createElement('p');
        let localNascimento = document.createElement('p');
        let criancas = document.createElement('p');
        let anosServico = document.createElement('p');
        let falecimento = document.createElement('p');
        let retrato = document.createElement('img');

        divInfo.classList.add('info-box');

        const nomeProfeta = `${profeta.nome} ${profeta.sobrenome}`;
        nomeCompleto.textContent = nomeProfeta;

        const dataNascFormatada = formatarData(profeta.nascimento);
        const falecimentoFormatado = profeta.morte ? formatarData(profeta.morte) : 'N/A';

        dataNascimento.innerHTML = `<span class="rotulo">Nascimento:</span> ${dataNascFormatada}`;
        localNascimento.innerHTML = `<span class="rotulo">Lugar:</span> ${profeta.localNascimento}`;
        criancas.innerHTML = `<span class="rotulo">Crianças:</span> ${profeta.numeroFilhos}`;
        anosServico.innerHTML = `<span class="rotulo">Anos de Serviço:</span> ${profeta.duracao}`;
        falecimento.innerHTML = `<span class="rotulo">Falecimento:</span> ${falecimentoFormatado}`;

        divInfo.appendChild(dataNascimento);
        divInfo.appendChild(localNascimento);
        divInfo.appendChild(criancas);
        divInfo.appendChild(anosServico);
        divInfo.appendChild(falecimento);

        let urlTratada = profeta.urlImagem.split('?')[0].split('&')[0];
        urlTratada = urlTratada.replace(/\.bmp$/i, '.jpg');

        if (!urlTratada.startsWith('http')) {
            urlTratada = `https://${urlTratada}`;
        }

        retrato.referrerPolicy = 'no-referrer';

        const urlProxy = `https://wsrv.nl/?url=${encodeURIComponent(urlTratada)}`;

        retrato.setAttribute('src', urlProxy);
        retrato.setAttribute('alt', `Retrato de ${nomeProfeta}`);
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');

        let tentativa = 0;
        retrato.onerror = function () {
            tentativa++;
            if (tentativa === 1) {
                this.src = urlTratada;
            } else if (tentativa === 2) {
                this.src = `https://images.weserv.nl/?url=${encodeURIComponent(urlTratada)}`;
            } else {
                this.onerror = null;
                const quadroSubstituto = document.createElement('div');
                quadroSubstituto.classList.add('imagem-indisponivel');
                quadroSubstituto.innerHTML = `<span>Imagem Indisponível</span><br><strong>${nomeProfeta}</strong>`;
                cartao.replaceChild(quadroSubstituto, retrato);
            }
        };

        cartao.appendChild(nomeCompleto);
        cartao.appendChild(divInfo);
        cartao.appendChild(retrato);

        cartoes.appendChild(cartao);
    });
};

obterDadosDeProfetas();