import * as engine from './engine';

//entities
import './items/player';

init();

function init(){
    let canvas = document.getElementById('canvas');

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    engine.start(canvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
