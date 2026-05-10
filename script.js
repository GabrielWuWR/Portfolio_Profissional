'use strict';

function criarBolha() {
    const container = document.querySelector('.bolhasContainer');

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