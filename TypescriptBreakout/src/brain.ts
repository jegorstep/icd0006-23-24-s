import UI from "./ui.ts";

export class Block {
    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }

    private _width: number = 94.5;
    private _height: number = 25;
    private _left: number = 0;
    top: number = 0;

    private _hp: number = 2;

    constructor(borderThickness: number, i: number, j: number) {
        this._left = borderThickness + this._width * i;
        this.top = borderThickness + this._height * j;
        this._hp = Math.floor(Math.random() * 3) + 1;
    }

}


export class Ball {
    get intervalBallId(): NodeJS.Timeout | undefined {
        return this._intervalBallId;
    }

    set intervalBallId(value: NodeJS.Timeout | undefined) {
        this._intervalBallId = value;
    }
    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }
    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
    }
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }
    private _width: number = 12;
    private _height: number = 25;
    private _left: number = 0;
    private _top: number = 0;

    private _x: number = 0;
    private _y: number = 1;

    ballOutOfBound: boolean = false;


    private _intervalBallId: NodeJS.Timeout | undefined;

    constructor(left: number, top: number) {
        this._left = left;
        this._top = top;
    }

    validateAndFixPosition(borderThickness: number): void {

        if (this._left < borderThickness) {
            this._left = borderThickness;
            this.changeDirectionX();

        }

        if (this._left > 1000 - borderThickness - this._width) {
            this._left = 1000 - borderThickness - this._width;
            this.changeDirectionX();
        }
        if (this._top < borderThickness) {
            this._top = borderThickness;
            this.changeDirectionY();
        }

        if (this._top > 1000 - borderThickness - this._height) {
            this._top = 1000 - borderThickness - this._height;
            this.changeDirectionY();
            this.ballOutOfBound = true;
        }

    }

    startMove(step: number, borderThickness: number) {
        if (this.intervalBallId !== undefined) return;

        this.intervalBallId = setInterval(() => {
            this._left += step * this._x;
            this._top += step * this._y;
            this.validateAndFixPosition(borderThickness);
        }, 4);
    }

    stopMove(borderThickness: number): void {
        if (this.intervalBallId === undefined) return;
        clearInterval(this.intervalBallId);
        this.intervalBallId = undefined;
        this.validateAndFixPosition(borderThickness);
    }

    changeDirectionX(): void {
        this.x *= -1;
    }

    changeDirectionY(): void {
        this.y *= -1;
    }
}


export class Platform {
    get intervalId(): NodeJS.Timeout | undefined {
        return this._intervalId;
    }

    set intervalId(value: NodeJS.Timeout | undefined) {
        this._intervalId = value;
    }
    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
    }
    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }
    readonly width: number = 100;
    readonly height: number = 25;
    private _left: number = 0;
    private _top: number = 0;

    private _intervalId: NodeJS.Timeout | undefined;

    constructor(left: number, top: number) {
        this._left = left;
        this._top = top;
    }

    validateAndFixPosition(borderThickness: number): void {
        if (this.left < borderThickness) {
            this.left = borderThickness;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }

        if (this.left > 1000 - borderThickness - this.width) {
            this.left = 1000 - borderThickness - this.width;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    startMove(step: number, borderThickness: number): void {
        if (this.intervalId !== undefined) return;

        this.intervalId = setInterval((): void => {
            this.left += step * 10;
            this.validateAndFixPosition(borderThickness);

        }, 10);

    }
    stopMove(borderThickness: number): void {
    if (this.intervalId === undefined) return;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.validateAndFixPosition(borderThickness);
    }
}

export default class Brain {
    get scores(): number[] {
        return this._scores;
    }
    get pause(): boolean {
        return this._pause;
    }

    set pause(value: boolean) {
        this._pause = value;
    }
    get gameOver(): boolean {
        return this._gameOver;
    }

    set gameOver(value: boolean) {
        this._gameOver = value;
    }
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    get blockContainer(): Block[][] {
        return this._blockContainer;
    }

    set blockContainer(value: Block[][]) {
        this._blockContainer = value;
    }
    get ball(): Ball | undefined {
        return this._ball;
    }

    set ball(value: Ball) {
        this._ball = value;
    }
    get platform(): Platform | undefined {
        return this._platform;
    }

    set platform(value: Platform) {
        this._platform = value;
    }

    private _pause: boolean = false;
    private _gameOver: boolean = false;

    readonly name: string;

    readonly width: number = 1000;
    readonly height: number = 1000;
    readonly borderThickness: number = 30;
    private _score: number = 0;

    private _scores: number[] = [];

    private _platform: Platform | undefined;
    private _ball: Ball | undefined;

    private _blockContainer: Block[][] = [];

    constructor(rows: number, name: string) {
        this.createBlocks(rows);
        this.name = name;
        this.createPlatform();
        this.createBall();

    }

    createPlatform(): void {
        this.platform = new Platform(this.width / 2 - this.borderThickness * 2, this.height - this.borderThickness * 3);
    }

    createBall(): void {
        this.ball = new Ball( 500, 400);
    }


    startMovePaddle(step: number): void {
        this.platform!.startMove(step, this.borderThickness);
    }

    stopMovePaddle(): void {
        this.platform!.stopMove(this.borderThickness);
    }

    startMoveBall(step: number): void {
        if (!this.ball!.ballOutOfBound) {
            this.ball!.startMove(step, this.borderThickness);
        }
    }

    stopMoveBall(): void {
        this.ball!.stopMove(this.borderThickness);
    }

    ballPaddleCollision(): void {

        if (this.ball!.top + this.ball!.height >= this.platform!.top && this.ball!.left >= this.platform!.left &&
            this.ball!.width + this.ball!.left <= this.platform!.left + this.platform!.width && this.ball!.top <= this.platform!.top + this.platform!.height)
        {
            this.ball!.y *= -1.02;
            this.ball!.x =  (this.platform!.left - this.ball!.left) * 0.02;
        }
    }

    createBlocks(rows: number): void {
        let blockContainer: Block[][] = [];
        let j: number = 0;
        while (rows > 0) {
            let blockRow: Block[] = [];
            for (let i: number = 0; i < 10; i++) {
                blockRow.push(new Block(this.borderThickness, i, j));
            }
            blockContainer.push(blockRow);
            rows--;
            j++;
        }
        this.blockContainer = blockContainer;
    }

    showScore(drawRepeater: NodeJS.Timeout | undefined, ui: UI): void {

        let string: string = '';
        if (!this.pause) {
            for (let i: number = 0; i < this.scores.length; i++) {
                string += this.name + ": " + this.score + '\n';
            }
        }

        this._pause = true;

        clearInterval(drawRepeater);
        ui.displayAllScores(string);
    }


    ballBlockCollision(): void {
        for (let i: number = 0; i < this.blockContainer.length; i++) {
            for (let j: number = 0; j < this.blockContainer[i].length; j++) {
                const block: Block = this.blockContainer[i][j];


                if (this.ball!.left <= block.left + block.width &&
                    this.ball!.left + this.ball!.width >= block.left &&
                    this.ball!.top <= block.top + block.height &&
                    this.ball!.top + this.ball!.height >= block.top && block.hp > 0) {
                    this.blockContainer[i][j].hp = this.blockContainer[i][j].hp - 1;
                    this.ball!.changeDirectionY();
                    if ( this.blockContainer[i][j].hp === 0) {
                        this.score += 10;
                    }
                }
            }
        }
    }

    stopGame(): void {
        if (this.ball!.ballOutOfBound && !this.gameOver) {
            this.scores.push(this.score);
            this.gameOver = true;
            this.stopMovePaddle();
            this.stopMoveBall();
        }
    }
}
