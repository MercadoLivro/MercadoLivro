const html = document.querySelector("html");

const checkbox = document.querySelector("#dark");

checkbox.addEventListener('change', () => {
    html.classList.toggle("light-theme");
});

function brilhar(painel, texto) {

    painel.classList.remove('feliz');
    setTimeout(() => painel.classList.add('feliz'), 10);
    setTimeout(() => painel.classList.remove('feliz'), 660);

    const cores = ['#b794e8', '#9bdc8a', '#f6e7a8'];
    for (let i = 0; i < 9; i++) {
        const faisca = document.createElement('i');
        faisca.className = 'faisca';
        faisca.style.setProperty('--dx', (Math.random() * 160 - 40) + 'px');
        faisca.style.setProperty('--dy', (-30 - Math.random() * 90) + 'px');
        faisca.style.setProperty('--cor', cores[i % 3]);
        painel.appendChild(faisca);
        setTimeout(() => faisca.remove(), 950);
    }

    const balao = painel.querySelector('.resultado');
    if (balao) {
        if (texto) balao.textContent = texto;
        balao.classList.remove('novo');
        setTimeout(() => balao.classList.add('novo'), 10);
    }
}

function conjurar(painel, direcao) {
    const classe = 'lanca-' + direcao;
    painel.classList.remove('lanca-cima', 'lanca-lado');
    setTimeout(() => painel.classList.add(classe), 10);
    setTimeout(() => painel.classList.remove(classe), 710);
}
