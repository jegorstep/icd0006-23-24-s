export class Block {

    width = 94.5;
    height = 25;
    left = 0;
    top = 0;

    hp = 2;

    constructor(borderThickness, i, j) {
        this.left = borderThickness + this.width * i;
        this.top = borderThickness + this.height * j;
        this.hp = Math.floor(Math.random() * 3) + 1;
    }

}


export class Ball {
    width = 12;
    height = 25;
    left = 0;
    top = 0;

    x = 1;
    y = 1;

    ballOutOfBound = false;


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
            this.ballOutOfBound = true;
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

    stopMove(borderThickness) {
        if (!this.#intervalId) return;
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        this.validateAndFixPosition(borderThickness);
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

        pause = false;
        gameOver = false;

        name;

        width = 1000;
        height = 1000;
        borderThickness = 30;
        score = 0;

        scores = [];

        platform;
        ball;

        blockContainer = null;

        constructor(rows, name) {
            this.createBlocks(rows);
            this.name = name;
            this.createPlatform();
            this.createBall();

        }

        createPlatform() {
            this.platform = new Platform(this.width / 2 - this.borderThickness * 2, this.height - this.borderThickness * 3);
        }

        createBall() {
            this.ball = new Ball( 500, 400);
        }


        startMovePaddle(step) {
            this.platform.startMove(step, this.borderThickness, this.width);
        }

        stopMovePaddle() {
            this.platform.stopMove(this.borderThickness);
        }

        startMoveBall(step) {
            if (!this.ball.ballOutOfBound) {
                this.ball.startMove(step, this.borderThickness);
            }
        }

        stopMoveBall() {
            this.ball.stopMove(this.borderThickness);
        }

        ballPaddleCollision() {

            if (this.ball.top + this.ball.height >= this.platform.top && this.ball.left >= this.platform.left &&
                this.ball.width + this.ball.left <= this.platform.left + this.platform.width && this.ball.top <= this.platform.top + this.platform.height)
            {
                this.ball.changeDirectionY();
            }
        }

        createBlocks(rows) {
            let blockContainer = [];
            let j = 0;
        while (rows > 0) {
            let blockRow = [];
            for (let i = 0; i < 10; i++) {
                blockRow.push(new Block(this.borderThickness, i, j));
            }
            blockContainer.push(blockRow);
            rows--;
            j++;
        }
        this.blockContainer = blockContainer;
        }

        showScore(drawRepeater, ui) {

            let string = '';
            console.log(this.scores);
            if (!this.pause) {
                for (let i = 0; i < this.scores.length; i++) {
                    string += this.name + ": " + this.scores[i] + '\n';
                }
            }

            this.pause = true;

            clearInterval(drawRepeater);
            ui.displayAllScores(string);
    }


        ballBlockCollision() {
            for (let i = 0; i < this.blockContainer.length; i++) {
                for (let j = 0; j < this.blockContainer[i].length; j++) {
                    const block = this.blockContainer[i][j];


                    if (this.ball.left <= block.left + block.width &&
                        this.ball.left + this.ball.width >= block.left &&
                        this.ball.top <= block.top + block.height &&
                        this.ball.top + this.ball.height >= block.top && block.hp > 0) {
                        this.blockContainer[i][j].hp = this.blockContainer[i][j].hp - 1;
                        this.ball.changeDirectionY();
                        if ( this.blockContainer[i][j].hp === 0) {
                            this.score += 10;
                        }
                    }
                }
            }
        }

        stopGame() {
            if (this.ball.ballOutOfBound && this.gameOver === false) {
                let a = this.score.toString();
                this.scores.push(a);
                this.gameOver = true;
                this.stopMovePaddle();
                this.stopMoveBall();
            }
        }
    }
