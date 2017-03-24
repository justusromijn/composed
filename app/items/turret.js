import Projectile from './projectile';

export default class Turret {
    constructor(state) {
        this.state.s = state.s;
        this.state.x = state.x;
        this.state.y = state.y;
    }

    fire(){
        let projectile = new Projectile({
            s: 10,
            a: this.state.a,
            originX: this.state.x + (this.state.w / 2),
            originY: this.state.y + this.state.h
        });
    }

    compute(input, parentState) {
        this.state.x = parentState.x + (parentState.w / 2) - (this.state.w / 2);
        this.state.y = parentState.y - (this.state.h / 2);
        this.state.s = parentState.s;
        this.state.dx = parentState.dx;
        this.state.dy = parentState.dy;

        if (input.mouse.x && input.mouse.y) {

            let deltaX = (this.state.x + this.state.w / 2) - input.mouse.x;
            let deltaY = (this.state.y + this.state.h) - input.mouse.y;

            this.state.a = (Math.atan((deltaX / deltaY) * -1) * 180 / Math.PI);

            if (deltaY < 0){
                this.state.a += 180;
            }

            if(input.mouse.click){
                this.fire();
                console.log('angle:', this.state.a);
                console.log('deltaX:', deltaX);
                console.log('deltaY:', deltaY);
            }

        } else {
            this.state.a = 0;
        }
    }

    draw(ctx, delta) {
        ctx.save();
        ctx.translate(
            this.state.x + (this.state.dx * delta) + (this.state.w / 2),
            this.state.y + (this.state.dy * delta) + this.state.h);
        ctx.rotate(this.state.a * Math.PI / 180);
        ctx.beginPath();
        ctx.rect(
            this.state.w / 2, 0,

            -this.state.w, -this.state.h);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

Turret.prototype.state = {
    x: null,
    y: null,
    w: 5,
    h: 30,
    dx: 0,
    dy: 0
};