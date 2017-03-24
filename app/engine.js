const FRAMERATE = 1000 / 30;
let updateStart = 0,
    updateEnd = 0,
    previousStart = 0,
    delta = 1,
    // array of items being processed during drawing loops
    drawables = [],

    // array of items being processed during update loop (game ticks)
    computables = [],

    canvas = null,
    ctx = null;

export function start(_canvas) {
    console.log('starting engine.');
    canvas = _canvas;
    ctx = canvas.getContext('2d');

    updateLoop();
    drawLoop();
}

export function addDrawable(instance){
    drawables.push(instance);
}

export function removeDrawable(instance){
    let index = drawables.indexOf(instance);
    drawables.splice(index, 1);
}

export function addComputable(instance){
    computables.push(instance);
}

export function removeComputable(instance){
    let index = drawables.indexOf(instance);
    drawables.splice(index, 1);
}


function update() {
    drawables.forEach(function(computable){
        if (typeof computable.compute === 'function'){
            computable.compute();
        } else {
            console.warn('Computable without compute function!');
        }
    });
}

function draw(delta) {
    drawables.forEach(function(drawable){
        if (typeof drawable.draw === 'function'){
            drawable.draw(delta);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    delta = (performance.now() - updateEnd) / FRAMERATE || 1;
    draw(delta);
    requestAnimationFrame(drawLoop);
}