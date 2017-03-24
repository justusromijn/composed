import Turret from './turret';

export default class Tank {
    constructor(state){
        Object.assign(this.state, state);
        this.components = this.components.map(function(component){
            return new component(state);
        });
    }

    compute(input){
        if (input.right){
            this.state.dx = this.state.s;
        } else if (input.left){
            this.state.dx = -this.state.s;
        } else {
            this.state.dx = 0;
        }

        if (input.down){
            this.state.dy = this.state.s;
        } else if (input.up){
            this.state.dy = -this.state.s;
        } else {
            this.state.dy = 0;
        }

        this.state.x += this.state.dx;
        this.state.y += this.state.dy;

        this.components.forEach(function(component) {
            component.compute(input, this.state);
        }.bind(this));
    }

    draw(ctx, delta) {
        ctx.beginPath();
        ctx.rect(
            this.state.x + (this.state.dx * delta), this.state.y + (this.state.dy * delta),
            this.state.w, this.state.h);
        ctx.stroke();
        ctx.closePath();
        this.components.forEach(function(component){
            component.draw(ctx, delta);
        });
    }
}
Tank.prototype.components = [Turret];
Tank.prototype.state = {
    x: null,
    y: null,
    w: 30,
    h: 40,
    s: 15,
    dx: 0,
    dy: 0
};