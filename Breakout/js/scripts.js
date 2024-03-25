import UI from "./ui.js";
import Brain from "./brain.js";


function main() {
    let appDiv = document.querySelector("#game");
    let brain = new Brain(5);
    let ui = new UI(brain, appDiv);


    let intervalIdBall = null;
    let intervalIdBlock = null;
    let intervalStopGame = null;

    let drawRepeater = null;


    if (!brain.gameOver) {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    if (!brain.pause) {
                        brain.startMovePaddle(brain.platform, -1);
                    }
                    break;
                case 'ArrowRight':
                    if (!brain.pause) {
                        brain.startMovePaddle(brain.platform, 1);
                    }
                    break;
                case ' ':
                    if (brain.pause) {
                        brain.pause = !brain.pause;
                        intervalIdBall = setInterval(() => brain.ballPaddleCollision(), 1);
                        intervalIdBlock = setInterval(() => brain.ballBlockCollision(), 1);
                        brain.startMoveBall(brain.ball, 1);

                    } else {
                        brain.pause = !brain.pause;
                        brain.stopMoveBall(brain.ball);
                        clearInterval(intervalIdBall);
                        clearInterval(intervalIdBlock);
                        brain.stopMovePaddle(brain.platform);
                    }
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    brain.stopMovePaddle(brain.platform);
                    break;
                case 'ArrowRight':
                    brain.stopMovePaddle(brain.platform);
                    break;
            }
        });

        intervalStopGame = setInterval(() => brain.stopGame(), 1);
        intervalIdBall = setInterval(() => brain.ballPaddleCollision(), 1);
        intervalIdBlock = setInterval(() => brain.ballBlockCollision(), 1);
        brain.startMoveBall(brain.ball, 1);
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'N' :
            case 'n' :
                brain = null;
                ui = null;
                brain = new Brain(5);
                ui = new UI(brain, appDiv);
                clearInterval(drawRepeater);
                clearInterval(intervalStopGame);

                intervalIdBall = setInterval(() => brain.ballPaddleCollision(), 1);
                intervalIdBlock = setInterval(() => brain.ballBlockCollision(), 1);
                brain.startMoveBall(brain.ball, 1);
                drawRepeater = setInterval(() => ui.draw(), 0);
                intervalStopGame = setInterval(() => brain.stopGame(), 1);

                break;
        }
    });

    drawRepeater = setInterval(() => ui.draw(), 0);
}


main();