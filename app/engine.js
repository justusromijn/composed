const FRAMERATE = 1000 / 30;
let updateStart = 0,
    debug = false,
    updateEnd = 0,
    previousStart = 0,
    delta = 1,
    // array of items being processed during drawing loops
    drawables = [],

    // array of items being processed during update loop (game ticks)
    computables = [],

    canvas = null,
    ctx = null;

const mapping = {
    ArrowDown: 'down',
    ArrowUp: 'up',
    ArrowLeft: 'left',
    ArrowRight: 'right'
};

let state = {
    down: false,
    up: false,
    left: false,
    right: false
};

export function start(_canvas, _debug) {
    debug = _debug;
    console.log('starting engine.');

    canvas = _canvas;
    ctx = canvas.getContext('2d');

    bindInput();
    updateLoop();
    drawLoop();
}

export function addDrawable(instance) {
    drawables.push(instance);
}

export function removeDrawable(instance) {
    let index = drawables.indexOf(instance);
    drawables.splice(index, 1);
}

export function addComputable(instance) {
    computables.push(instance);
}

export function removeComputable(instance) {
    let index = drawables.indexOf(instance);
    drawables.splice(index, 1);
}


function update() {
    computables.forEach(function (computable) {
        if (typeof computable.compute === 'function') {
            computable.compute(state);
        } else {
            console.warn('Computable without compute function!');
        }
    });
}

function draw(delta) {
    drawables.forEach(function (drawable) {
        if (typeof drawable.draw === 'function') {
            drawable.draw(ctx, delta);
        } else {
            console.warn('Drawable without draw function!');
        }
    });
}


function updateLoop() {
    updateStart = performance.now();
    update();
    updateEnd = performance.now();
    var operationTime = updateEnd - updateStart;
    setTimeout(updateLoop, FRAMERATE - operationTime);
    previousStart = updateStart;
}

function drawLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    delta = (performance.now() - updateEnd) / FRAMERATE || 1;
    draw(delta);
    requestAnimationFrame(drawLoop);
}

function bindInput() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function onKeyDown(e) {
    state[mapping[e.key]] = true;
}

function onKeyUp(e) {
    state[mapping[e.key]] = false;
}