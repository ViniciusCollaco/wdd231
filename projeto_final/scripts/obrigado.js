import { inicializarMenu } from './modules/menu.js';

document.addEventListener('DOMContentLoaded', () => {
    inicializarMenu();

    const parametros = new URLSearchParams(window.location.search);
    const conteinerResumo = document.querySelector('#resumo-dados');

    if (!conteinerResumo) return;

    const nome = parametros.get('nome') || 'Não informado';
    const email = parametros.get('email') || 'Não informado';
    const telefone = parametros.get('telefone') || 'Não informado';
    const servico = parametros.get('servico') || 'Não informado';
    const mensagem = parametros.get('mensagem') || 'Nenhuma observação enviada.';

    conteinerResumo.innerHTML = `
        <ul class="lista-resumo">
        <li><strong>Nome do Solicitante:</strong> ${escapeHtml(nome)}</li>
        <li><strong>E-mail de Contato:</strong> ${escapeHtml(email)}</li>
        <li><strong>Telefone / WhatsApp:</strong> ${escapeHtml(telefone)}</li>
        <li><strong>Serviço Solicitado:</strong> ${escapeHtml(servico)}</li>
        <li><strong>Observações / Medidas:</strong> ${escapeHtml(mensagem)}</li>
        </ul>
    `;
});

function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
        return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
        }[s];
    });
}