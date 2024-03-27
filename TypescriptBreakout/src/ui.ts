import Brain, {Ball, Block, Platform} from "./brain.ts";


export default class UI {
    get brain(): Brain | undefined {
        return this._brain;
    }

    set brain(value: Brain | undefined) {
        this._brain = value;
    }
    get scaleY(): number {
        return this._scaleY;
    }

    set scaleY(value: number) {
        this._scaleY = value;
    }
    get scaleX(): number {
        return this._scaleX;
    }

    set scaleX(value: number) {
        this._scaleX = value;
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


    private _width: number = -1;
    private _height: number = -1;
    private _scaleX: number = 1;
    private _scaleY: number = 1;



    constructor(private _brain: Brain | undefined, readonly appContainer: HTMLDivElement | undefined) {
        this.setScreenDimensions();
    }

    setScreenDimensions(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain!.width;
        this.scaleY = this.height / this.brain!.height;

    }


    calculateScaledX(x: number): number {
        return x * this.scaleX | 0;
    }

    calculateScaledY(y: number): number {
        return y * this.scaleY | 0;
    }


    drawBorderSingle(left: number, top: number, width: number, height: number, color: string): void {
        let border: HTMLDivElement = document.createElement('div');

        border.style.zIndex = String(10);
        border.style.position = 'fixed';

        border.style.left = left + 'px';
        border.style.top = top + 'px';

        border.style.width = width + 'px';
        border.style.height = height + 'px';
        border.style.backgroundColor = color;

        this.appContainer!.append(border);
    }

    drawBorder(): void {
        // top border
        this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain!.borderThickness), 'red');
        // left
        this.drawBorderSingle(0, 0, this.calculateScaledX(this.brain!.borderThickness), this.height, 'red');
        // right
        this.drawBorderSingle(this.width - this.calculateScaledX(this.brain!.borderThickness), 0, this.calculateScaledX(this.brain!.borderThickness), this.height, 'red');
        this.drawBorderSingle(0, this.height - this.calculateScaledY(this.brain!.borderThickness), this.width, this.calculateScaledY(this.brain!.borderThickness), 'red');
    }

    drawPlatform(platform: Platform) {
        let div: HTMLDivElement = document.createElement('div');

        div.style.zIndex = String(10);
        div.style.position = 'fixed';

        div.style.backgroundColor = 'darkseagreen';
        div.style.borderRadius = '1em';

        div.style.left = this.calculateScaledX(platform.left) + 'px';
        div.style.top = this.calculateScaledY(platform.top) + 'px';

        div.style.width = this.calculateScaledX(platform.width) + 'px';
        div.style.height = this.calculateScaledY(platform.height) + 'px';

        div.className = "platform";

        this.appContainer!.append(div);
    }
    drawBlocks(blockContainer: Block[][]): void {
        let blockContainerHTML: HTMLDivElement = document.createElement('div');
        blockContainerHTML.className = 'block-container';
        blockContainerHTML.style.width = '100%';
        blockContainerHTML.style.height = '100%';
        for (let i: number = 0; i < blockContainer.length; i++) {
            let blocksRow: Block[] = blockContainer[i];
            let blockRowHTML: HTMLDivElement = document.createElement('div');
            blockRowHTML.className = 'block-row';
            blockRowHTML.style.width = '100%';
            blockRowHTML.style.height = '100%';
            for (let j: number = 0; j < blocksRow.length; j++) {
                let block: HTMLSpanElement = document.createElement('span');
                block.className = 'block';

                block.style.position = 'fixed';

                let calculatedBlockWidth: number = this.calculateScaledX(blocksRow[j].width);
                let calculatedBlockHeight: number = this.calculateScaledY(blocksRow[j].height);

                let calculatedBlockLeft: number = this.calculateScaledX(blocksRow[j].left);
                let calculatedBlockTop: number = this.calculateScaledY(blocksRow[j].top);

                block.style.width = calculatedBlockWidth + 'px';
                block.style.height = calculatedBlockHeight + 'px';

                block.style.left =  calculatedBlockLeft  + 'px';
                block.style.top = calculatedBlockTop  + 'px';

                if (blocksRow[j].hp === 3)  {
                    block.style.backgroundColor = 'brown'
                } else if (blocksRow[j].hp === 2) {
                    block.style.backgroundColor = 'green'
                } else if (blocksRow[j].hp === 1) {
                    block.style.backgroundColor = 'yellow'
                } else {
                    block.style.backgroundColor = 'transparent'
                }

                blockRowHTML.append(block);
            }
            blockContainerHTML.append(blockRowHTML);
        }
        this.appContainer!.append(blockContainerHTML);

    }

    drawBall(ball: Ball): void {
        let div:HTMLDivElement = document.createElement('div');


        div.style.width = this.calculateScaledX(ball.width) + 'px';
        div.style.height = this.calculateScaledY(ball.height) + 'px';

        div.style.left = this.calculateScaledX(ball.left) + 'px';
        div.style.top = this.calculateScaledY(ball.top) + 'px';

        div.style.zIndex = String(100);

        div.style.backgroundColor = 'sandybrown';
        div.style.position = 'fixed';
        div.style.borderRadius = '1em';

        div.className = 'ball';

        this.appContainer!.append(div);

    }

    drawScore(): void {
        let score = document.createElement('div');

        score.style.top = this.height - this.calculateScaledY(this.brain!.borderThickness) * 2  + 'px';
        score.style.left = this.calculateScaledX(this.brain!.borderThickness) + 'px';

        score.style.position = 'fixed';

        score.style.zIndex = String(10000);

        score.style.fontSize = '20px'; // Set font size to 24 pixels
        score.textContent = "Score: " + this.brain!.score;

        this.appContainer!.append(score);
    }

    displayAllScores(string: string): void {

        let display: HTMLDivElement = document.createElement('div');


        display.style.width = this.width + 'px';
        display.style.height = this.height + 'px';

        display.style.backgroundColor = 'yellow';

        display.style.position = 'fixed';

        display.style.zIndex = String(10000);
        display.style.textAlign = 'center';

        display.style.fontSize = '24px';
        display.textContent = string;
        this.appContainer!.append(display);

    }

    drawGameOver(): void {

        let gameOver: HTMLDivElement = document.createElement('div');

        gameOver.style.top = this.calculateScaledY(this.brain!.height / 2) + 'px';
        gameOver.style.left = this.calculateScaledX(this.brain!.width / 2) - 100 + 'px';

        gameOver.style.width = this.calculateScaledX(100) + 'px';
        gameOver.style.height = this.calculateScaledY(50) + 'px';

        gameOver.style.position = 'fixed';


        gameOver.style.backgroundColor = 'Yellow';


        gameOver.innerText = 'GAME OVER! Press N to play again!';

        this.appContainer!.append(gameOver);

    }




    draw(): void {
        this.appContainer!.innerHTML = '';
        this.setScreenDimensions();

        this.drawBlocks(this.brain!.blockContainer);

        this.drawPlatform(this.brain!.platform!);

        this.drawBall(this.brain!.ball!);

        if (this.brain!.ball!.ballOutOfBound) {
            this.drawGameOver();
        }

        this.drawScore();

        this.drawBorder();
    }


}