const local = window.location.search;

const info = new URLSearchParams(local);

document.querySelector('#resultados').innerHTML = `
    <p>Agendamento para ${info.get('nome')} ${info.get('sobrenome')}</p>
    <p>Procurador para ${info.get('ordenanca')} em ${info.get('data')} no Templo ${info.get('local')}</p>
    <p>Seu telefone: ${info.get('fone')}</p>
    <p>Seu email é ${info.get('email')}</p>`