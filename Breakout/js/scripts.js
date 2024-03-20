import UI from "./ui.js";
import Brain from "./brain.js";


function uiDrawRepeater(ui){
    setTimeout(() => {
        ui.draw();
        uiDrawRepeater(ui);
    }, 0);
}


function main() {
    let appDiv = document.querySelector("#game");
    let brain = new Brain(5);
    let ui = new UI(brain, appDiv);


    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                brain.startMovePaddle(brain.platform, -1);
                break;
            case 'ArrowRight':
                brain.startMovePaddle(brain.platform, 1);
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

    setInterval(() => brain.ballPaddleCollision(), 1);
    brain.startMoveBall(brain.ball, 2);


    uiDrawRepeater(ui);
}


main();