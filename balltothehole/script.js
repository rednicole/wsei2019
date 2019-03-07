document.addEventListener('DOMContentLoaded', gameStart);

let hole;
const ball = {
    htmlObject: undefined,
    top: 0,
    left: 0
}

const portraitPosition = {
    alpha: 0,
    beta: 90,
    gamma: 0
};

const orientation = {
    alpha: 0,
    beta: 0,
    gamma: 0
};

function gameStart() {
    getElements();
    // ustaw kulkę na środku
    ballInTheCenter();
    // ustaw dziurkę w losowej pozycji
    initHole();
    // spraw by kulka reagowała na
    // ballReacts();
    window.addEventListener('deviceorientation', changeOfOrientation)
    // sprawdź czy kulka trafiła do dziury
    // console.log('TRAFIŁEŚ!');
    // zliczaj punkty i czas
}

function changeOfOrientation(e) {
    orientation.alpha = e.alpha - portraitPosition.alpha;
    orientation.beta = e.beta - portraitPosition.beta;
    orientation.gamma = e.gamma - portraitPosition.gamma;
}

function getElements() {
    ball.htmlObject = document.querySelector('#ball');
    hole = document.querySelector('#hole');
}

function initHole() {
    const top = Math.random() * window.innerHeight - hole.clientHeight;
    const left = Math.random() * window.innerWidth - hole.clientWidth;
    hole.style.top = `${top}px`;
    hole.style.left = `${left}px`;
}

function ballInTheCenter() {
    ball.top = window.innerHeight/2;
    ball.left = window.innerWidth/2;
    ball.htmlObject.style.top = `${ball.top}px`;
    ball.htmlObject.style.left = `${ball.left}px`;
}