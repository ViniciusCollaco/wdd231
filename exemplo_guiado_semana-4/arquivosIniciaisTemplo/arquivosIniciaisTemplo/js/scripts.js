import {templos} from '../dados/templos.js'
//console.log(templos);

import {url} from '../dados/templos.js'
//console.log(url);

const mostrarAqui = document.querySelector("#mostrarAqui");
//OBTER A REFERENCIA PARA O ELEMENTO HTML DO DIALOGO
const dialogo = document.querySelector("#meuDialogo");
const titulo = document.querySelector("#meuDialogo h2");
const info = document.querySelector("#meuDialogo p");
const fechar = document.querySelector("#meuDialogo button");

fechar.addEventListener("click", () => 
    dialogo.close()
)

function exibirItens(dados) {
    //console.log(dados);
    dados.forEach(x => {
        console.log(x);

        const foto = document.createElement('img')
        foto.src=`${url}${x.caminho}`
        foto.alt=x.nome
        foto.addEventListener('click', () => { exibirInfo(x); })
        mostrarAqui.appendChild(foto)
    })
}

function exibirInfo(x) {
    titulo.innerHTML = x.nome
    info.innerHTML = `Dedicado ${x.dedicado} por ${x.pessoa} como templo número`; dialogo.showModal();
}

exibirItens(templos);