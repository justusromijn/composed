import * as engine from '../engine';
export default class Projectile {
    constructor(state) {
        this.state = Object.assign({}, this.state, state);
        engine.addDrawable(this);
        engine.addComputable(this);
    }

    compute(input, parentState) {
        this.state.y -= this.state.s;
    }

    draw(ctx, delta) {
        ctx.save();
        ctx.translate(
            this.state.originX,
            this.state.originY);
        ctx.rotate(this.state.a * Math.PI / 180);
        ctx.beginPath();
        ctx.rect(
            this.state.x - this.state.w / 2,
            this.state.y - (this.state.s * delta),
            -this.state.w, -this.state.h);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

Projectile.prototype.state = {
    y: null,
    x: 0,
    w: 2,
    h: 4,
    dy: 0,
    s: null
};