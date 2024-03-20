export class Block {

    width = 94.5;
    height = 25;

    constructor() {
    }

}

export class Ball {
    width = 12;
    height = 25;
    left = 0;
    top = 0;

    x = 1;
    y = 1;





    #intervalId = null;

    constructor(left, top) {
        this.left = left;
        this.top = top;
    }

    validateAndFixPosition(borderThickness) {

        if (this.left < borderThickness) {
            this.left = borderThickness;
            this.changeDirectionX();

        }

        if (this.left > 1000 - borderThickness - this.width) {
            this.left = 1000 - borderThickness - this.width;
            this.changeDirectionX();
        }
        if (this.top < borderThickness) {
            this.top = borderThickness;
            this.changeDirectionY();
        }

        if (this.top > 1000 - borderThickness - this.height) {
            this.top = 1000 - borderThickness - this.height;
            this.changeDirectionY();
        }

    }

    startMove(step, borderThickness) {
        if (this.#intervalId !== null) return;

        this.#intervalId = setInterval(() => {
            this.left += step * this.x;
            this.top += step * this.y;
            this.validateAndFixPosition(borderThickness);
        }, 4);
    }

    changeDirectionX() {
        this.x *= -1;
    }

    changeDirectionY() {
        this.y *= -1;
    }
}


export class Platform {
    width = 100;
    height = 25;
    left = 0;
    top = 0;

    #intervalId = null;

    constructor(left, top) {
        this.left = left;
        this.top = top;
    }

    validateAndFixPosition(borderThickness) {
        if (this.left < borderThickness) {
            this.left = borderThickness;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }

        if (this.left > 1000 - borderThickness - this.width) {
            this.left = 1000 - borderThickness - this.width;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }
    }
    startMove(step, borderThickness) {
        if (this.#intervalId !== null) return;

        this.#intervalId = setInterval(() => {
            this.left += step * 10;
            this.validateAndFixPosition(borderThickness);

        }, 10);

    }
    stopMove(borderThickness) {
        if (!this.#intervalId) return;
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        this.validateAndFixPosition(borderThickness);
    }
}

    export default class Brain {
        width = 1000;
        height = 1000;
        borderThickness = 30;

        platform;
        ball;

        blockContainer = null;

        constructor(rows) {
            this.createBlocks(rows);
            this.platform = new Platform(this.width / 2 - this.borderThickness * 2, this.height - this.borderThickness * 3, 'blue');
            this.ball = new Ball( 500, 400);
        }

        startMovePaddle(paddle, step) {
            paddle.startMove(step, this.borderThickness, this.width);
        }

        stopMovePaddle(paddle) {
            paddle.stopMove(this.borderThickness);
        }

        startMoveBall(ball, step) {
            ball.startMove(step, this.borderThickness);
        }

        ballPaddleCollision() {

            if (this.ball.top + this.ball.height >= this.platform.top && this.ball.left >= this.platform.left &&
                this.ball.width + this.ball.left <= this.platform.left + this.platform.width && this.ball.top <= this.platform.top)
            {
                this.ball.changeDirectionY();
            }
        }

        createBlocks(rows) {
            let blockContainer = [];
        while (rows > 0) {
            let blockRow = [];
            for (let i = 0; i < 10; i++) {
                blockRow.push(new Block());
            }
            blockContainer.push(blockRow);
            rows--;
        }
        this.blockContainer = blockContainer;
        }
    }