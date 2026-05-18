'use strict';

import projetos from './projetos.json' with { type: "json" };
import projetosCards from './projetosCards.json' with { type: "json" };

function criarBolha() {
    const container = document.querySelector('.bolhasContainer');
    if (!container) return;

    const bolha = document.createElement('div');
    bolha.classList.add('bolha');
    bolha.style.left = Math.random() * 100 + '%';

    const tamanho = Math.random() * 20 + 15 + 'px';
    bolha.style.width = tamanho;
    bolha.style.height = tamanho;

    const duracaoAnimacao = Math.random() * 10 + 10;
    bolha.style.animationDuration = duracaoAnimacao + 's';
    container.appendChild(bolha);

    setTimeout(() => {
        bolha.remove();
    }, duracaoAnimacao * 1000);
}

setInterval(criarBolha, 400);

let ultimaPosicaoScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const posicaoAtualScroll = window.scrollY;

    if (posicaoAtualScroll > ultimaPosicaoScroll && posicaoAtualScroll > 100) {
        header.classList.add('header-oculto');
    } else {
        header.classList.remove('header-oculto');
    }

    ultimaPosicaoScroll = posicaoAtualScroll;
});

let slideAtual = 0;
let autoplayInterval;

function atualizarCarrosel() {
    const trilho = document.querySelector('.trilhoCarrossel');
    const itens = document.querySelectorAll('.itemCarrossel');
    const progresso = document.querySelector('.progresso-interna');
    
    if (!trilho || itens.length === 0) return;

    const cardWidth = itens[0].offsetWidth;
    const gap = 40; 

    const centroTela = window.innerWidth / 2;
    const metadeCard = cardWidth / 2;
    const ajusteParaCentralizar = centroTela - metadeCard;

    const deslocamento = (slideAtual * (cardWidth + gap)) - ajusteParaCentralizar;

    trilho.style.transform = `translateX(${-deslocamento}px)`;

    itens.forEach((item, index) => {
        item.classList.toggle('ativo', index === slideAtual);
    });

    const numAtual = document.getElementById('slide-atual-num');
    if (numAtual) numAtual.textContent = String(slideAtual + 1).padStart(2, '0');
    if (progresso) {
        progresso.style.width = `${((slideAtual + 1) / itens.length) * 100}%`;
    }
}

function avancarCarrosel() {
    const itens = document.querySelectorAll('.itemCarrossel');
    if (itens.length === 0) return;
    slideAtual = (slideAtual < itens.length - 1) ? slideAtual + 1 : 0;
    atualizarCarrosel();
}

function voltarCarrosel() {
    const itens = document.querySelectorAll('.itemCarrossel');
    if (itens.length === 0) return;
    slideAtual = (slideAtual > 0) ? slideAtual - 1 : itens.length - 1;
    atualizarCarrosel();
}

function carregarProjetos() {
    const trilho = document.getElementById('trilho-projetos');
    const totalSlidesNum = document.getElementById('total-slides-num');
    if (!trilho) return;

    trilho.innerHTML = '';

    projetos.forEach(projeto => {
        const item = document.createElement('div');
        item.classList.add('itemCarrossel');

        const img = document.createElement('div');
        img.classList.add('imgCarrossel');
        img.style.backgroundImage = `url('${projeto.imagem}')`;

        const barra = document.createElement('div');
        barra.classList.add('barra');

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('projetoCarroselInfos');

        const titulo = document.createElement('h2');
        titulo.textContent = projeto.nome;

        const desc = document.createElement('p');
        desc.textContent = projeto.descricao;

        const containerTags = document.createElement('div');
        containerTags.classList.add('containerTags');

        projeto.tags.forEach(textoTag => {
            const spanTag = document.createElement('span');
            spanTag.classList.add('tag');
            const classeLimpa = textoTag.toLowerCase().replace(/\s+/g, '-');
            spanTag.classList.add(classeLimpa);
            spanTag.textContent = textoTag;
            containerTags.appendChild(spanTag);
        });

        const link = document.createElement('a');
        link.href = projeto.repositorio;
        link.target = '_blank';

        const btnGit = document.createElement('div');
        btnGit.classList.add('botao-git');
        const icone = document.createElement('i');
        icone.classList.add('fa-brands', 'fa-github-alt');
        const txtBtn = document.createElement('h3');
        txtBtn.textContent = 'GitHub';

        btnGit.appendChild(icone);
        btnGit.appendChild(txtBtn);
        link.appendChild(btnGit);

        infoContainer.appendChild(titulo);
        infoContainer.appendChild(desc);
        infoContainer.appendChild(containerTags);
        infoContainer.appendChild(link);

        item.appendChild(img);
        item.appendChild(barra);
        item.appendChild(infoContainer);

        trilho.appendChild(item);
    });

    if (totalSlidesNum) {
        totalSlidesNum.textContent = String(projetos.length).padStart(2, '0');
    }

    requestAnimationFrame(() => {
        atualizarCarrosel();
        iniciarAutoplay();
    });
}

function iniciarAutoplay() {
    pararAutoplay();
    autoplayInterval = setInterval(avancarCarrosel, 5000);
}

function pararAutoplay() {
    clearInterval(autoplayInterval);
}

window.addEventListener('resize', atualizarCarrosel);

document.getElementById('carrosel-btn-right')?.addEventListener('click', () => {
    avancarCarrosel();
    iniciarAutoplay();
});

document.getElementById('carrosel-btn-esquerdo')?.addEventListener('click', () => {
    voltarCarrosel();
    iniciarAutoplay();
});

document.addEventListener('DOMContentLoaded', () => {
    carregarProjetos();
});