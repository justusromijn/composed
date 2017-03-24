import * as engine from '../engine';

let player = {
    vector: {
        x: 10,
        y: 10,
        dx: 0,
        dy: 0
    },


    compute: function(){

    },

    draw: function (ctx, delta) {
        ctx.rect(
            this.vector.x, this.vector.y,
            this.vector.x + 100, this.vector.y + 100);
        ctx.stroke();
    }
};

engine.addDrawable(player);
engine.addComputable(player);