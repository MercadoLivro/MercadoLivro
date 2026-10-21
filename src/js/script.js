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

function lancarMagia(de, para, desvioX, desvioY, cor, saiPeloLado, aoTerminar) {
    const a = de.getBoundingClientRect();
    const b = para.getBoundingClientRect();

    let x0 = a.left + a.width / 2;
    let y0 = a.top;
    if (saiPeloLado) {
        x0 = a.right;
        y0 = a.top + a.height * 0.45;
    }
    x0 = x0 + window.scrollX - 11;
    y0 = y0 + window.scrollY - 11;

    const dx = b.left + b.width / 2 + window.scrollX - 11 - x0;
    const dy = b.top + b.height / 2 + window.scrollY - 11 - y0;

    const luz = document.createElement('i');
    luz.className = 'magia';
    luz.style.setProperty('--cor', cor);
    luz.style.left = x0 + 'px';
    luz.style.top = y0 + 'px';
    luz.style.transform = 'translate(0px, 0px) scale(0.4)';
    document.body.appendChild(luz);

    const rastro = setInterval(() => {
        const r = luz.getBoundingClientRect();
        const particula = document.createElement('i');
        particula.className = 'rastro';
        particula.style.setProperty('--cor', cor);
        particula.style.setProperty('--rx', (Math.random() * 30 - 15) + 'px');
        particula.style.setProperty('--ry', (Math.random() * 30) + 'px');
        particula.style.left = (r.left + window.scrollX + r.width / 2 - 5) + 'px';
        particula.style.top = (r.top + window.scrollY + r.height / 2 - 7) + 'px';
        document.body.appendChild(particula);
        setTimeout(() => particula.remove(), 600);
    }, 35);

    setTimeout(() => {
        luz.style.transition = 'transform 0.5s ease-in-out';
        luz.style.transform = 'translate(' + (dx / 2 + desvioX) + 'px, ' + (dy / 2 + desvioY) + 'px) scale(1.15)';
    }, 50);

    setTimeout(() => {
        luz.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(0.9)';
    }, 550);

    setTimeout(() => {
        clearInterval(rastro);
        luz.style.transition = 'transform 0.4s, opacity 0.4s';
        luz.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(4.5)';
        luz.style.opacity = '0';
        aoTerminar();
    }, 1050);

    setTimeout(() => luz.remove(), 1500);
}