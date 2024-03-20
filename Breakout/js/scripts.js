import UI from "./ui.js";
import Brain from "./brain.js";


function uiDrawRepeater(ui){
    setTimeout(() => {
        ui.draw();
        uiDrawRepeater(ui);
    }, 1);
}


function main() {
    let appDiv = document.querySelector("#game");
    let brain = new Brain(5);
    let ui = new UI(brain, appDiv);

    let pause = false;

    let intervalIdBall = null;
    let intervalIdBlock = null;


    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                if (!pause) {
                    brain.startMovePaddle(brain.platform, -1);
                }
                break;
            case 'ArrowRight':
                if (!pause) {
                    brain.startMovePaddle(brain.platform, 1);
                }
                break;
            case ' ':
                if (pause) {
                    pause = !pause;
                    intervalIdBall = setInterval(() => brain.ballPaddleCollision(), 1);
                    intervalIdBlock = setInterval(() => brain.ballBlockCollision(), 1);
                    brain.startMoveBall(brain.ball, 1);

                } else {
                    pause = !pause;
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


    intervalIdBall = setInterval(() => brain.ballPaddleCollision(), 1);
    intervalIdBlock = setInterval(() => brain.ballBlockCollision(), 1);
    brain.startMoveBall(brain.ball, 1);


    uiDrawRepeater(ui);
}


main();