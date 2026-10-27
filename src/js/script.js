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

const cards = document.querySelectorAll(".card-produtos .card");

const ano = new Date().getFullYear();
const textoRodape = document.querySelector("footer p");
textoRodape.innerHTML = textoRodape.innerHTML.replace(/&copy;|©/, "&copy; " + ano);

const vitrineDestaque = document.querySelector("#VitrineDestaque");
const slidesDestaque = Array.from(vitrineDestaque.querySelectorAll(".destaque"));
const pontosDestaque = document.querySelector("#PontosDestaque");
const setaAnterior = document.querySelector("#SetaAnterior");
const setaProxima = document.querySelector("#SetaProxima");
const TEMPO_TROCA = 3000;
let indiceDestaque = 0;
let cicloDestaque = null;

slidesDestaque.forEach((slide, i) => {
    const bolinha = document.createElement("button");
    bolinha.type = "button";
    bolinha.setAttribute("aria-label", "Ir para o destaque " + (i + 1));
    bolinha.addEventListener("click", () => { mostrarSlide(i); reiniciarCiclo(); });
    pontosDestaque.appendChild(bolinha);
    slide.addEventListener("click", () => irParaProduto(i));
});

function mostrarSlide(i) {
    const total = slidesDestaque.length;
    indiceDestaque = (i + total) % total;
    slidesDestaque.forEach((s, k) => s.classList.toggle("ativo", k === indiceDestaque));
    Array.from(pontosDestaque.children).forEach((b, k) => b.setAttribute("aria-current", k === indiceDestaque ? "true" : "false"));
}

function pararCiclo() { clearInterval(cicloDestaque); }

function iniciarCiclo() {
    pararCiclo();
    cicloDestaque = setInterval(() => mostrarSlide(indiceDestaque + 1), TEMPO_TROCA);
}

function reiniciarCiclo() {
    if (!vitrineDestaque.matches(":hover")) iniciarCiclo();
}

setaAnterior.addEventListener("click", () => { mostrarSlide(indiceDestaque - 1); reiniciarCiclo(); });
setaProxima.addEventListener("click", () => { mostrarSlide(indiceDestaque + 1); reiniciarCiclo(); });
vitrineDestaque.addEventListener("mouseenter", pararCiclo);
vitrineDestaque.addEventListener("mouseleave", iniciarCiclo);
mostrarSlide(0);
iniciarCiclo();

function irParaProduto(i) {
    const alvo = document.querySelectorAll(".card-produtos .card")[i];
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
        alvo.classList.remove("piscar");
        void alvo.offsetWidth;
        alvo.classList.add("piscar");
        setTimeout(() => alvo.classList.remove("piscar"), 2800);
    }, 700);
}

function pesquisar() {
    const termo = document.querySelector("#pesquisa").value.toLowerCase().trim();
    let encontrados = 0;

    cards.forEach((card) => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termo)) {
            card.style.display = "";
            encontrados++;
        } else {
            card.style.display = "none";
        }
    });

    if (termo && encontrados === 0) {
        alert('Nenhum tesouro encontrado para "' + termo + '".');
    } else if (termo) {
        document.querySelector(".card-produtos").scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

document.querySelector(".pesquisa button").addEventListener("click", pesquisar);
document.querySelector("#pesquisa").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        pesquisar();
    }
});

const btnCarrinho = document.querySelector("nav img[alt='Carrinho']");

function anima(el, frames, opcoes) {
    return el.animate(frames, Object.assign({ fill: "forwards" }, opcoes)).finished;
}

function atraso(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function levarAoCarrinho(card) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

    const r = card.getBoundingClientRect();
    const t = btnCarrinho.getBoundingClientRect();
    const GH = 120, GW = GH * 200 / 260;
    const tcx = t.left + t.width / 2, tcy = t.top + t.height / 2;

    const clone = card.cloneNode(true);
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id"));
    clone.classList.remove("piscar", "levando");
    clone.classList.add("clone-voo");
    Object.assign(clone.style, {
        position: "fixed", left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px",
        margin: "0", zIndex: "190", pointerEvents: "none", transformOrigin: "0 0"
    });
    document.body.appendChild(clone);
    card.classList.add("levando");

    const g = document.createElement("div");
    g.className = "gnomo-carregador";
    g.innerHTML = '<img src="src/assets/gnomo-7.svg" alt="">';
    g.style.width = GW + "px"; g.style.height = GH + "px";
    const baseY = Math.min(r.bottom, innerHeight - 8);
    const x0 = r.left > GW + 20 ? r.left - GW - 8 : r.right + 8;
    const y0 = baseY - GH;
    g.style.left = x0 + "px"; g.style.top = y0 + "px";
    document.body.appendChild(g);

    const gx1 = r.left + r.width / 2 - GW / 2, gy1 = baseY - GH + 18;
    const gx2 = tcx - GW / 2, gy2 = tcy + 28;
    const A = [gx1 - x0, gy1 - y0], B = [gx2 - x0, gy2 - y0];

    const s = Math.min(0.35, 130 / r.height);
    const holdA = [gx1 + GW / 2 - s * r.width / 2 - r.left, gy1 + 0.33 * GH - s * r.height - r.top];
    const holdB = [holdA[0] + (B[0] - A[0]), holdA[1] + (B[1] - A[1])];
    const tr = (p, esc) => "translate(" + p[0] + "px," + p[1] + "px) scale(" + esc + ")";
    const dist = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const dur = Math.max(800, Math.min(1500, dist * 0.9));

    function faiscas() {
        const cores = ["#b794e8", "#9bdc8a", "#f6e7a8"];
        for (let i = 0; i < 10; i++) {
            const f = document.createElement("i");
            f.className = "faisca fixa";
            f.style.left = (tcx - 5) + "px"; f.style.top = (tcy - 7) + "px";
            f.style.setProperty("--dx", (Math.random() * 110 - 55) + "px");
            f.style.setProperty("--dy", (Math.random() * 90 - 20) + "px");
            f.style.setProperty("--cor", cores[i % 3]);
            document.body.appendChild(f);
            setTimeout(() => f.remove(), 950);
        }
    }

    return anima(g, [
        { transform: "translate(0,0) scale(.2)", opacity: 0 },
        { transform: "translate(0,0) scale(1.1)", opacity: 1, offset: .7 },
        { transform: "translate(0,0) scale(1)", opacity: 1 }
    ], { duration: 320, easing: "ease-out" })
        .then(() => {
            g.classList.add("correndo");
            return anima(g, [{ transform: "translate(0,0)" }, { transform: tr(A, 1) }], { duration: 420, easing: "ease-in-out" });
        })
        .then(() => {
            g.classList.remove("correndo"); g.classList.add("pega");
            return anima(clone, [{ transform: "translate(0,0) scale(1)" }, { transform: tr(holdA, s) }],
                { duration: 450, easing: "cubic-bezier(.3,1.4,.5,1)" });
        })
        .then(() => {
            g.classList.remove("pega"); g.classList.add("correndo");
            const meio = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - 50];
            const meioHold = [(holdA[0] + holdB[0]) / 2, (holdA[1] + holdB[1]) / 2 - 50];
            anima(clone, [{ transform: tr(holdA, s) }, { transform: tr(meioHold, s) }, { transform: tr(holdB, s) }],
                { duration: dur, easing: "ease-in-out" });
            return anima(g, [{ transform: tr(A, 1) }, { transform: tr(meio, 1) }, { transform: tr(B, 1) }],
                { duration: dur, easing: "ease-in-out" });
        })
        .then(() => {
            g.classList.remove("correndo"); g.classList.add("pega");
            faiscas();
            anima(g, [{ transform: tr(B, 1), opacity: 1 }, { transform: tr(B, 1), opacity: 1, offset: .55 }, { transform: tr(B, .1), opacity: 0 }],
                { duration: 600, easing: "ease-in" });
            return anima(clone, [
                { transform: tr(holdB, s), opacity: 1 },
                { transform: "translate(" + (tcx - r.left) + "px," + (tcy - r.top) + "px) scale(.02)", opacity: 0 }
            ], { duration: 420, easing: "ease-in" });
        })
        .then(() => atraso(180))
        .then(() => {
            g.remove(); clone.remove(); card.classList.remove("levando");
        });
}

const lojaLimpar = document.querySelector("#loja-limpar");
const itens = [];

function formatarPreco(v) {
    return "R$ " + v.toFixed(2).replace(".", ",");
}

function abrirLoja() {
    lojaPainel.classList.add("aberta");
    lojaFundo.classList.add("visivel");
    lojaPainel.inert = false;
    lojaPainel.setAttribute("aria-hidden", "false");
    document.querySelector("#loja-fechar").focus();
}

function fecharLoja() {
    lojaPainel.classList.remove("aberta");
    lojaFundo.classList.remove("visivel");
    lojaPainel.inert = true;
    lojaPainel.setAttribute("aria-hidden", "true");
}

function capaDoCard(card) {
    const img = card.querySelector(".livro") || card.querySelector("figure img");
    return img ? img.getAttribute("src") : "";
}

function renderCarrinho(novoCard) {
    lojaLista.innerHTML = "";
    itens.forEach((it) => {
        const li = document.createElement("li");
        if (it.card === novoCard) li.className = "novo";
        li.innerHTML = '<span class="mini-boca"><img src="' + it.capa + '" alt=""></span><span class="nome"></span><button type="button" class="remover">✕</button>';
        const nome = li.querySelector(".nome");
        nome.textContent = it.nome;
        const preco = document.createElement("small");
        preco.textContent = formatarPreco(it.valor);
        nome.appendChild(preco);
        const remover = li.querySelector(".remover");
        remover.setAttribute("aria-label", "Remover " + it.nome);
        remover.addEventListener("click", () => removerItem(it));
        lojaLista.appendChild(li);
    });
    const soma = itens.reduce((t, it) => t + it.valor, 0);
    lojaTotal.textContent = formatarPreco(soma);
    lojaVazia.style.display = itens.length === 0 ? "block" : "none";
    lojaPainel.classList.toggle("vazio", itens.length === 0);
    lojaLimpar.disabled = itens.length === 0;
}

function liberarBotao(card) {
    const botao = card.querySelector(".comprar");
    botao.classList.remove("no-carrinho");
    botao.textContent = "Comprar";
}

function removerItem(it) {
    const i = itens.indexOf(it);
    if (i < 0) return;
    itens.splice(i, 1);
    liberarBotao(it.card);
    renderCarrinho();
}

lojaLimpar.addEventListener("click", () => {
    itens.splice(0).forEach((it) => liberarBotao(it.card));
    renderCarrinho();
});

function balancarIcone() {
    btnCarrinho.classList.remove("balanca");
    void btnCarrinho.offsetWidth;
    btnCarrinho.classList.add("balanca");
    setTimeout(() => btnCarrinho.classList.remove("balanca"), 650);
}

btnCarrinho.addEventListener("click", () => (lojaPainel.classList.contains("aberta") ? fecharLoja() : abrirLoja()));
document.querySelector("#loja-fechar").addEventListener("click", fecharLoja);
lojaFundo.addEventListener("click", fecharLoja);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharLoja();
});

botoesComprar.forEach((botao) => {
    botao.addEventListener("mouseover", () => {
        if (!botao.classList.contains("no-carrinho")) botao.textContent = "Levar para o bosque";
    });
    botao.addEventListener("mouseout", () => {
        if (!botao.classList.contains("no-carrinho")) botao.textContent = "Comprar";
    });
    botao.addEventListener("click", () => {
        if (botao.classList.contains("no-carrinho")) return;
        const card = botao.closest(".card");
        const nomeProduto = card.querySelector("h3").textContent;
        const item = {
            card: card,
            nome: nomeProduto,
            valor: precos[nomeProduto] || 0,
            capa: capaDoCard(card)
        };
        botao.classList.add("no-carrinho");
        botao.textContent = "No carrinho";
        levarAoCarrinho(card).catch(() => {}).then(() => {
            itens.push(item);
            renderCarrinho(card);
            balancarIcone();
        });
    });
});

renderCarrinho();

const cabecalho = document.querySelector("header");
const botaoMenu = document.querySelector("#MenuHamburguer");

function alternarMenu(aberto) {
    cabecalho.classList.toggle("menu-aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

botaoMenu.addEventListener("click", () => alternarMenu(!cabecalho.classList.contains("menu-aberto")));
document.querySelectorAll("#Navegacao a").forEach((link) => link.addEventListener("click", () => alternarMenu(false)));
document.querySelector("#Navegacao img[alt='Carrinho']")?.addEventListener("click", () => alternarMenu(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternarMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 700) alternarMenu(false); });

document.querySelector(".content-banner button").addEventListener("click", () => {
    document.querySelector(".card-produtos").scrollIntoView({ behavior: "smooth", block: "start" });
});