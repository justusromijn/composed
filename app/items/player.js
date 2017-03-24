import * as engine from '../engine';

let player = {
    speed: 20,
    vector: {
        x: 10,
        y: 10,
        dx: 0,
        dy: 0
    },


    compute: function(state){
        if (state.right){
            this.vector.dx = this.speed;
        } else if (state.left){
            this.vector.dx = -this.speed;
        } else {
            this.vector.dx = 0;
        }

        if (state.down){
            this.vector.dy = this.speed;
        } else if (state.up){
            this.vector.dy = -this.speed;
        } else {
            this.vector.dy = 0;
        }

        this.vector.x += this.vector.dx;
        this.vector.y += this.vector.dy;
    },

    draw: function (ctx, delta) {
        ctx.beginPath();
        ctx.rect(
            this.vector.x + (this.vector.dx * delta), this.vector.y + (this.vector.dy * delta),
            100, 100);
        ctx.stroke();
        ctx.closePath();
    }
};

engine.addDrawable(player);
engine.addComputable(player);