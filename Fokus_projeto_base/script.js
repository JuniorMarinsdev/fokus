const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const startPauseIconeBt = document.querySelector(
    ".app__card-primary-butto-icon"
);

const tempoNaTela = document.querySelector("#timer");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somIniciar = new Audio("/sons/play.wav");
const somPausar = new Audio("./sons/pause.mp3");
const somTerminar = new Audio("./sons/beep.mp3");

let tempoDeCorridoEmSegundos;
let intervaloId = null;

musica.loop = true;

function alterarIconeBt(iconeBt) {
    startPauseIconeBt.src = `/imagens/${iconeBt}.png`;
}

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});
("");

focoBt.addEventListener("click", () => {
    tempoDeCorridoEmSegundos = 1500;
    alterarContexto("foco");
    ativandoBotao(focoBt);
});

curtoBt.addEventListener("click", () => {
    tempoDeCorridoEmSegundos = 300;
    alterarContexto("descanso-curto");
    ativandoBotao(curtoBt);
});

longoBt.addEventListener("click", () => {
    tempoDeCorridoEmSegundos = 900;
    alterarContexto("descanso-longo");
    ativandoBotao(longoBt);
});

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

function ativandoBotao(buttonActive) {
    focoBt.classList.remove("active");
    curtoBt.classList.remove("active");
    longoBt.classList.remove("active");
    buttonActive.classList.add("active");
}

const contagemRegressiva = () => {
    if (tempoDeCorridoEmSegundos <= 0) {
        zerar();
        alterarIconeBt("play_arrow");
        somTerminar.play();
        return;
    }
    tempoDeCorridoEmSegundos -= 1;
    mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        somPausar.play();
        alterarIconeBt("play_arrow");
        return;
    }
    alterarIconeBt("pause");
    somIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDeCorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
        minute: "2-digit",
        second: "2-digit",
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();
