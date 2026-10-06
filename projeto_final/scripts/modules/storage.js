export function salvarFavorito(idProduto) {
    let favoritos = obterFavoritos();
    if (!favoritos.includes(idProduto)) {
        favoritos.push(idProduto);
        localStorage.setItem('am_favoritos', JSON.stringify(favoritos));
    }
    }

    export function removerFavorito(idProduto) {
    let favoritos = obterFavoritos();
    favoritos = favoritos.filter(id => id !== idProduto);
    localStorage.setItem('am_favoritos', JSON.stringify(favoritos));
    }

    export function obterFavoritos() {
    const dados = localStorage.getItem('am_favoritos');
    return dados ? JSON.parse(dados) : [];
}