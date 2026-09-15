// OBTER ELEMENTOS HTML DO DOCUMENTO
const mLocal = document.querySelector("#local");
const mDescricao = document.querySelector("#descricao");
const mTemperatura = document.querySelector("#temperatura");
const mImagem = document.querySelector("#imagem");

// CRIAR VARIÁVEIS NECESSÁRIAS PARA A URL
const mChave = "5b97d6443c1889684ee067ec60dd1c1b";
const mLat = "49.75";
const mLon = "6.64";

// URL completa com HTTPS e unidades em Celsius (&units=metric) e idioma em Português (&lang=pt_br)
const mURL = `https://api.openweathermap.org/data/2.5/weather?lat=${mLat}&lon=${mLon}&units=metric&lang=pt_br&appid=${mChave}`;

// EXIBIR OS RESULTADOS NO DOM
function mostrarResultados(dados) {
  // Nome do local
    if (mLocal) {
        mLocal.textContent = `${dados.name}, ${dados.sys.country}`;
    }

    // Temperatura (usando Math.round para formatar sem casas decimais excessivas)
    if (mTemperatura) {
        mTemperatura.innerHTML = `${Math.round(dados.main.temp)}&deg;C`;
    }

    // Descrição do clima
    const descr = dados.weather[0].description;
    if (mDescricao) {
        mDescricao.textContent = descr;
    }

    // Ícone do clima
    const codigoIcone = dados.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${codigoIcone}@2x.png`;

    if (mImagem) {
        mImagem.setAttribute("src", iconURL);
        mImagem.setAttribute("alt", descr);
    }
}

// OBTER OS DADOS DA API
async function apiFetch() {
    try {
        const resposta = await fetch(mURL);
        if (resposta.ok) {
        const dados = await resposta.json();
        console.log(dados); // Para testes/inspeção no console
        mostrarResultados(dados); // Chama a função que atualiza a tela
        } else {
        throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log("Mensagem de Erro >> " + erro);
    }
}

// INICIAR
apiFetch();