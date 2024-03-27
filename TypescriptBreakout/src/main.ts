import Brain from "./brain.ts";
import UI from "./ui.ts";


function main(): void {

    let drawRepeater : NodeJS.Timeout | undefined;
    let scoreIsOn : boolean = false;

    let parameters: string[] = settings();
    let speed: number = 0;
    let rows : number = 0;

    if (parameters[1] === '1') {
        speed = 0.5;
        rows = 3;
    }
    else if (parameters[1] === '2') {
        speed = 1.5;
        rows = 5;
    }
    else if (parameters[1] === '3') {
        speed = 2.5;
        rows = 7;
    }


    let appDiv: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#game")!;
    let brain: Brain = new Brain(rows, parameters[0]);
    let ui: UI = new UI(brain, appDiv!);

    setInterval(() => brain.stopGame(), 1);
    setInterval(() => brain.ballPaddleCollision(), 1);
    setInterval(() => brain.ballBlockCollision(), 1);
    brain.startMoveBall(speed);


    if (!brain.gameOver) {
        document.addEventListener('keydown', (keyup): void => {
            switch (keyup.key) {
                case 'ArrowLeft':
                    if (!brain.pause && !brain.gameOver) {
                        brain.startMovePaddle(-1);
                    }
                    break;
                case 'ArrowRight':
                    if (!brain.pause && !brain.gameOver) {
                        brain.startMovePaddle(1);
                    }
                    break;
                case ' ':
                    if (brain.pause && !brain.gameOver) {
                        brain.pause = !brain.pause;
                        brain.startMoveBall(speed);

                    } else {
                        brain.pause = !brain.pause;
                        brain.stopMoveBall();
                        brain.stopMovePaddle();
                    }
                    break;
                case 's':
                case 'S':
                    if (!scoreIsOn) {
                        brain.showScore(drawRepeater, ui);
                        brain.stopMoveBall();
                        brain.stopMovePaddle();
                        scoreIsOn = !scoreIsOn;
                    }
                    else {
                        scoreIsOn = !scoreIsOn;
                        brain.pause = false;
                        brain.startMoveBall(speed);
                        drawRepeater = setInterval(() => ui.draw(), 0);
                    }
                    break;

                case 'n':
                case 'N':
                    brain.createBall();
                    brain.createPlatform();
                    brain.createBlocks(rows);
                    brain.startMoveBall(speed);
                    brain.pause = false;
                    brain.score = 0;
                    brain.gameOver = false;
                    break;
            }
        });

        document.addEventListener('keyup', (keydown ): void => {
            switch (keydown.key) {
                case 'ArrowLeft':
                    brain.stopMovePaddle();
                    break;
                case 'ArrowRight':
                    brain.stopMovePaddle();
                    break;
            }
        });

    }


    drawRepeater = setInterval(() => {
        ui.draw();
    }, 0);
}


function settings() {
    let name;
    let gamemode;
    while (true) {
        name = prompt("Please enter your name (At least 3 characters):");
        name = name!.trim();
        if (name.length >= 3) {
            break;
        }
    }
    while (true) {
        gamemode = prompt("Please enter game mode (1 - Easy, 2 - Medium, 3 - Hard):");
        if ( gamemode === '1' || gamemode!.toLowerCase() === 'e' || gamemode!.trim().toLowerCase() === 'easy') {
            gamemode = '1';
            break;
        }
        else if ( gamemode === '2' || gamemode!.toLowerCase() === 'm' || gamemode!.trim().toLowerCase() === 'medium') {
            gamemode = '2';
            break;
        }
        else if ( gamemode === '3' || gamemode!.toLowerCase() === 'h' || gamemode!.trim().toLowerCase() === 'hard') {
            gamemode = '3';
            break;
        }
    }


    return [name, gamemode];
}

main();
