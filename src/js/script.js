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

const campoNome = document.querySelector("#nome");
const gemas = document.querySelector("#gemas");
const btnNome = document.querySelector("#btnNome");
const tons = ['#b794e8', '#9bdc8a', '#f6e7a8', '#7fe0e6'];

campoNome.addEventListener('input', () => {
    gemas.innerHTML = "";
    const letras = campoNome.value.toUpperCase().split("");
    for (let i = 0; i < letras.length; i++) {
        const gema = document.createElement('b');
        gema.style.setProperty('--tom', tons[i % tons.length]);
        if (letras[i] === " ") {
            gema.classList.add('esp');
        } else {
            gema.textContent = letras[i];
        }
        gemas.appendChild(gema);
    }
});

campoNome.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnNome.click();
});

const titulo = document.querySelector(".content-banner h2");
const tituloOriginal = titulo.innerHTML;                     

function gravarTitulo(texto) {
    titulo.textContent = "";
    titulo.setAttribute('aria-label', texto);
    const palavras = texto.split(" ");
    let contador = 0;

    for (let p = 0; p < palavras.length; p++) {
        const palavra = document.createElement('span');
        palavra.className = 'palavra';

        for (let c = 0; c < palavras[p].length; c++) {
            const letra = document.createElement('span');
            letra.className = 'letra';
            letra.textContent = palavras[p][c];
            letra.style.animationDelay = (contador * 45) + 'ms';
            palavra.appendChild(letra);
            contador++;
        }

        titulo.appendChild(palavra);
        titulo.appendChild(document.createTextNode(' '));
    }
}

let gravando = false;
btnNome.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const painel = btnNome.closest('.painel');

    if (gravando) return;

    if (nome === "") {
        titulo.innerHTML = tituloOriginal;
        titulo.removeAttribute('aria-label');
        brilhar(painel, 'Digite um nome para eu anunciar.');
        return;
    }

    gravando = true;
    conjurar(painel, 'cima');

    setTimeout(() => {
        titulo.scrollIntoView({ behavior: 'smooth', block: 'center' });

        lancarMagia(painel.querySelector('.gnomo-pequeno'), titulo, 70, 0, '#b794e8', false, () => {

            gravarTitulo('Bem-vindo(a), ' + nome + '!');

            for (let i = 0; i < gemas.children.length; i++) {
                const gema = gemas.children[i];
                gema.style.animationDelay = (i * 70) + 'ms';
                gema.classList.remove('acesa');
                setTimeout(() => gema.classList.add('acesa'), 10);
            }

            brilhar(painel, 'Prazer, ' + nome + '! Seu nome foi gravado na caverna.');

            setTimeout(() => {
                painel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                gravando = false;
            }, 1800);
        });
    }, 250);
});

const top3 = ["Grimório do HTML", "Poções de CSS", "JavaScript Encantado"];
const listaTop = document.querySelector("#listaTop");

document.querySelector("#btnTop").addEventListener('click', function () {
    const livro = document.querySelector("#livroTop").value.trim();
    const posicao = Number(document.querySelector("#posTop").value);

    if (livro === "" || posicao < 1 || posicao > 3) {
        alert("Digite o nome do livro e uma posição de 1 a 3.");
        return;
    }

    top3[posicao - 1] = livro; 

    listaTop.innerHTML = "";
    for (let i = 0; i < top3.length; i++) {
        const li = document.createElement("li");
        li.textContent = top3[i];
        listaTop.appendChild(li);
    }

    brilhar(this.closest('.painel'));
});

const lancamentos = [
    "Janeiro: Lógica de Programação Mística",
    "Fevereiro: HTML para Gnomos Iniciantes",
    "Março: CSS Floresta Encantada",
    "Abril: JavaScript das Fadas",
    "Maio: Git e GitHub Raiz",
    "Junho: React Cristalino",
    "Julho: Node.js nas Cavernas",
    "Agosto: Banco de Dados Subterrâneo",
    "Setembro: Python da Serpente Sábia",
    "Outubro: Figma Lunar",
    "Novembro: Acessibilidade para Todos os Bosques",
    "Dezembro: Projeto Final do Mago Dev"
];

document.querySelector("#btnMes").addEventListener('click', function () {
    const mes = Number(document.querySelector("#mes").value);
    const saida = document.querySelector("#resultadoMes");
    const painel = this.closest('.painel');

    painel.classList.remove('pensando');

    if (mes >= 1 && mes <= 12) {
        saida.textContent = lancamentos[mes - 1];
        brilhar(painel);
    } else {
        saida.textContent = "Escolha um número de 1 a 12.";
    }
});

let tempoPensando;
document.querySelector("#mes").addEventListener('input', function () {
    const painel = this.closest('.painel');
    painel.classList.add('pensando');
    clearTimeout(tempoPensando);
    tempoPensando = setTimeout(() => painel.classList.remove('pensando'), 1400);
});

let gerando = false;
document.querySelector("#btnPrevia").addEventListener('click', function () {
    const msg = document.querySelector("#msgPrevia");
    const painel = this.closest('.painel');
    const area = document.querySelector("#areaPrevia");

    if (gerando) return;

    if (document.querySelector("#imgPrevia")) {
        msg.textContent = "A prévia já foi gerada!";
        return;
    }

    gerando = true;
    msg.textContent = "";
    conjurar(painel, 'lado');

    setTimeout(() => {
        lancarMagia(painel.querySelector('.gnomo-pequeno'), area, 0, -60, '#9bdc8a', true, () => {
            const img = document.createElement("img");
            img.id = "imgPrevia";
            img.src = "src/assets/capa-previa.svg";
            img.alt = "Prévia da capa do livro";
            area.appendChild(img);

            gerando = false;
            brilhar(painel, "Prévia gerada!");
        });
    }, 250);
});


const precos = {
    "Grimório do HTML": 59.90,
    "Poções de CSS": 69.90,
    "JavaScript Encantado": 79.90,
    "Kit Cristal do Dev": 129.90,
    "Curso Raiz de Git": 89.90,
    "E-book: Pull Request Mágico": 39.90
};

const botoesComprar = document.querySelectorAll(".comprar");
const lojaLista = document.querySelector("#loja-lista");
const lojaVazia = document.querySelector("#loja-vazia");
const lojaTotal = document.querySelector("#loja-total");
const lojaPainel = document.querySelector("#loja-painel");
const lojaFundo = document.querySelector("#loja-fundo");
let total = 0;

function abrirLoja() {
    lojaPainel.classList.add("aberto");
    lojaFundo.classList.add("aberto");
    lojaPainel.setAttribute("aria-hidden", "false");
}

function fecharLoja() {
    lojaPainel.classList.remove("aberto");
    lojaFundo.classList.remove("aberto");
    lojaPainel.setAttribute("aria-hidden", "true");
}

document.querySelector("nav img[alt='Carrinho']").addEventListener('click', abrirLoja);
document.querySelector("#loja-fechar").addEventListener('click', fecharLoja);
lojaFundo.addEventListener('click', fecharLoja);

botoesComprar.forEach((botao) => {
    botao.addEventListener('mouseover', () => {
        if (!botao.classList.contains("no-carrinho")) {
            botao.textContent = "Levar para o bosque";
        }
    });

    botao.addEventListener('mouseout', () => {
        if (!botao.classList.contains("no-carrinho")) {
            botao.textContent = "Comprar";
        }
    });

    botao.addEventListener('click', () => {
        if (botao.classList.contains("no-carrinho")) return;

        const nomeProduto = botao.closest(".card").querySelector("h3").textContent;
        const preco = precos[nomeProduto] || 0;

        botao.classList.add("no-carrinho");
        botao.textContent = "No carrinho";

        const li = document.createElement("li");
        li.textContent = nomeProduto + " - R$ " + preco.toFixed(2).replace(".", ",");
        lojaLista.appendChild(li);

        total = total + preco;
        lojaTotal.textContent = "R$ " + total.toFixed(2).replace(".", ",");
        lojaVazia.style.display = "none";
    });
});

document.querySelector("#loja-limpar").addEventListener('click', () => {
    lojaLista.innerHTML = "";
    total = 0;
    lojaTotal.textContent = "R$ 0,00";
    lojaVazia.style.display = "block";

    botoesComprar.forEach((botao) => {
        botao.classList.remove("no-carrinho");
        botao.textContent = "Comprar";
    });
});

const imgDestaque = document.querySelector("#img-destaque");
const cards = document.querySelectorAll(".card");

function mostrarDestaque(card) {
    const imagem = card.querySelector("img");
    imgDestaque.src = imagem.src;
    imgDestaque.alt = imagem.alt;
}

mostrarDestaque(cards[0]); 
cards.forEach((card) => {
    card.addEventListener('mouseover', () => mostrarDestaque(card));
});

document.querySelector(".pesquisa button").addEventListener('click', () => {
    const termo = document.querySelector("#pesquisa").value.toLowerCase().trim();

    cards.forEach((card) => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termo)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

const ano = new Date().getFullYear();
const textoRodape = document.querySelector("footer p");
textoRodape.innerHTML = textoRodape.innerHTML.replace("&copy;", "&copy; " + ano)