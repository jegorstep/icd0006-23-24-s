
export default class UI {

    brain = null;
    appContainer = null;
    width = -1;
    height = -1;
    scaleX = 1;
    scaleY = 1;



    constructor(brain, appContainer) {
        this.brain = brain;
        this.appContainer = appContainer;
        this.setScreenDimensions(this.width, this.height);
    }

    setScreenDimensions(width, height) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;

    }


    calculateScaledX(x) {
        return x * this.scaleX | 0;
    }

    calculateScaledY(y) {
        return y * this.scaleY | 0;
    }


    drawBorderSingle(left, top, width, height, color) {
        let border = document.createElement('div');

        border.style.zIndex = 10;
        border.style.position = 'fixed';

        border.style.left = left + 'px';
        border.style.top = top + 'px';

        border.style.width = width + 'px';
        border.style.height = height + 'px';
        border.style.backgroundColor = color;

        this.appContainer.append(border);
    }

    drawBorder() {
        // top border
        this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain.borderThickness), 'red');
        // left
        this.drawBorderSingle(0, 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'red');
        // right
        this.drawBorderSingle(this.width - this.calculateScaledX(this.brain.borderThickness), 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'red');
        this.drawBorderSingle(0, this.height - this.calculateScaledY(this.brain.borderThickness), this.width, this.calculateScaledY(this.brain.borderThickness), 'red');
    }

    drawPlatform(platform) {
        let div = document.createElement('div');

        div.style.zIndex = 10;
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(platform.left) + 'px';
        div.style.top = this.calculateScaledY(platform.top) + 'px';

        div.style.width = this.calculateScaledX(platform.width) + 'px';
        div.style.height = this.calculateScaledY(platform.height) + 'px';

        div.className = "platform";

        this.appContainer.append(div);
    }
    drawBlocks(blockContainer) {
        let blockContainerHTML = document.createElement('div');
        blockContainerHTML.className = 'block-container';
        for (let i = 0; i < blockContainer.length; i++) {
            let blocksRow = blockContainer[i];
            let blockRowHTML = document.createElement('div');
            blockRowHTML.className = 'block-row';
            for (let j = 0; j < blocksRow.length; j++) {
                let block = document.createElement('span');
                block.className = 'block';

                let calculatedBlockWidth = this.calculateScaledX(blocksRow[j].width);
                let calculatedBlockHeight = this.calculateScaledY(blocksRow[j].height);

                let calculatedBlockLeft = this.calculateScaledX(blocksRow[j].left);
                let calculatedBlockTop = this.calculateScaledY(blocksRow[j].top);

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
        this.appContainer.append(blockContainerHTML);

    }

    drawBall(ball) {
        let div = document.createElement('div');

        div.style.width = this.calculateScaledX(ball.width) + 'px';
        div.style.height = this.calculateScaledY(ball.height) + 'px';

        div.style.left = this.calculateScaledX(ball.left) + 'px';
        div.style.top = this.calculateScaledY(ball.top) + 'px';

        div.style.zIndex = 100;

        div.className = 'ball';

        this.appContainer.append(div);
    }

    drawScore() {
        let score = document.createElement('div');

        score.style.top = this.calculateScaledY(500);
        score.style.left = this.calculateScaledX(500);

        score.style.position = 'fixed';

        score.style.zIndex = 10000;

        score.style.fontSize = '20px'; // Set font size to 24 pixels
        score.textContent = "Score: " + this.brain.score;

        this.appContainer.append(score);
    }



    draw() {
        // clear previous render
        this.appContainer.innerHTML = '';
        this.setScreenDimensions();

        this.drawBlocks(this.brain.blockContainer);

        this.drawPlatform(this.brain.platform);

        this.drawBall(this.brain.ball);

        this.drawScore();

        this.drawBorder();
    }


}