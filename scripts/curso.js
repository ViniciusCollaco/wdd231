const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program development.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more proficient in writing functions and software.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concepts of object-oriented programming.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, and dynamic web applications.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const containerCursos = document.querySelector('#container-cursos');
const valorCreditos = document.querySelector('#valor-creditos');

const infosDoCurso = document.querySelector('#infos-do-curso');

function renderizarCursos(listaCursos) {
    containerCursos.innerHTML = '';
    
    listaCursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = `curso-card ${curso.completed ? 'completed' : 'pending'}`;
        card.textContent = `${curso.subject}${curso.number}`;
        
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            exibirInfosDoCurso(curso);
        });

        containerCursos.appendChild(card);
    });

    const total = listaCursos.reduce((acc, curso) => acc + curso.credits, 0);
    valorCreditos.textContent = total;
}

function exibirInfosDoCurso(curso) {
    infosDoCurso.innerHTML = '';
    infosDoCurso.innerHTML = `
        <button id="fecharModal">❌</button>
        <h2>${curso.subject}${curso.number}</h2>
        <h3>${curso.title}</h3>
        <p><strong>Créditos</strong>: ${curso.credits}</p>
        <p><strong>Certificado</strong>: ${curso.certificate}</p>
        <p>${curso.description}</p>
        <p><strong>Tecnologias</strong>: ${curso.technology.join(', ')}</p>
    `;
    
    infosDoCurso.showModal();

    const fecharModal = document.querySelector("#fecharModal");
    fecharModal.addEventListener("click", () => {
        infosDoCurso.close();
    });

    infosDoCurso.addEventListener("click", (event) => {
        const rect = infosDoCurso.getBoundingClientRect();
        const clicouFora = (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        );
        if (clicouFora) {
            infosDoCurso.close();
        }
    });
}

document.querySelector('#btn-todos').addEventListener('click', (e) => {
    atualizarBotaoAtivo(e.target);
    renderizarCursos(courses);
});

document.querySelector('#btn-cse').addEventListener('click', (e) => {
    atualizarBotaoAtivo(e.target);
    renderizarCursos(courses.filter(curso => curso.subject === 'CSE'));
});

document.querySelector('#btn-wdd').addEventListener('click', (e) => {
    atualizarBotaoAtivo(e.target);
    renderizarCursos(courses.filter(curso => curso.subject === 'WDD'));
});

function atualizarBotaoAtivo(botaoClicado) {
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
    botaoClicado.classList.add('active');
}

renderizarCursos(courses);