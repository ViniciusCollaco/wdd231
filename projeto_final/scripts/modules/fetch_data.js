export async function buscarPersianas(urlData = 'data/persianas.json') {
    try {
        const resposta = await fetch(urlData);
        
        if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Falha ao carregar os dados das persianas:', erro);
        exibirMensagemErroUI('Não foi possível carregar o catálogo no momento. Tente novamente mais tarde.');
        return [];
    }
    }

    function exibirMensagemErroUI(mensagem) {
    const container = document.querySelector('#container-produtos');
    if (container) {
        container.innerHTML = `<p class="alerta-erro" role="alert">${mensagem}</p>`;
    }
}