import * as engine from './engine';

//entities
import Tank from './items/tank';

init();

function init(){
    let canvas = document.getElementById('canvas');
    let tank = new Tank({ x: 200, y: 300});

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    engine.start(canvas);
    engine.addDrawable(tank);
    engine.addComputable(tank);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

