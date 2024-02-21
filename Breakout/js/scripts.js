let game = document.querySelector("#game");


let pause = false;

let score = document.querySelector("#score");

let scorePoints = 0;

let scorePointsHTML = document.createElement("p");

scorePointsHTML.id = "points";

scorePointsHTML.append(scorePoints.toString());

score.append(scorePointsHTML);



// add blocks in game
for (let i = 1; i <= 6; i++) {
    let blockContainer = document.createElement("div");
    blockContainer.className = "block-container";
    blockContainer.id = "block-container-id-" + i;
    game.append(blockContainer);
    for (let i = 0; i <= 10; i++) {
        let span = document.createElement("span");
        span.className = "block";
        span.id = "block-id-" + i;
        let hitPoints = Math.floor(Math.random() * 3) + 1;
        span.classList.add("hp-" + hitPoints);
        span.dataset.hp = (hitPoints).toString();
        blockContainer.append(span);
    }
}

// add platform and container
const platformContainer = document.createElement("div");
platformContainer.className = "platform-container";
platformContainer.id = "platform-container-id";
game.append(platformContainer);

const platform = document.createElement("span");
platform.className = "platform";
platform.id = "platform-id";
platformContainer.append(platform);


//make platform move

let isMoving = false;

// Event listener for key presses
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && isMoving === false && !pause) {
        isMoving = true;
        direction = 'left';
        lastTimestamp = performance.now();
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(movePlatform);
        }
    } else if (event.key === 'ArrowRight' && isMoving === false && !pause) {
        isMoving = true;
        direction = 'right';
        lastTimestamp = performance.now();
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(movePlatform);
        }
    }
});

document.addEventListener('keyup', function(event) {
    if ((event.key === 'ArrowLeft' && direction === 'left') || (event.key === 'ArrowRight' && direction === 'right')) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        isMoving = false;
    }
});

// Set initial position of platform
let positionX = 0;

// some anime shit
let animationFrameId = null;

// Function to move the platform
function movePlatform(timestamp) {
    const containerWidth = platform.parentElement.offsetWidth / 2;
    const platformWidth = platform.offsetWidth / 2;

    // Calculate distance to move based on elapsed time and speed
    const deltaTime = timestamp - lastTimestamp;
    const speed = 0.015; // Adjust as needed
    const distance = speed * deltaTime;

    // Adjust position based on direction
    if (direction === 'left') {
        positionX = Math.max(-containerWidth + platformWidth, positionX - distance);
    } else if (direction === 'right') {
        positionX = Math.min(containerWidth - platformWidth, positionX + distance);
    }

    // Apply new position
    platform.style.left = positionX + 'px';

    animationFrameId = requestAnimationFrame(movePlatform);
}

// Initialize last timestamp and direction
let lastTimestamp = performance.now();
let direction = null;


// Event listener for window resize
window.addEventListener('resize', function() {
    const containerWidth = platform.parentElement.offsetWidth / 2;
    const platformWidth = platform.offsetWidth / 2;

    // It is not 100% correct, however it is relatively accurate towards speed of platform, not location of the platform
    const newLeft = Math.min(containerWidth - platformWidth, Math.max(platformWidth - containerWidth, positionX));
    platform.style.left = newLeft + 'px';

    // Update positionX
    positionX = newLeft;
});



//add ball in game

let ball = document.createElement("div");

ball.className = "ball";

const startX = 200;
const startY = 200;

let ballX = startX; // Ball's horizontal position
let ballY = startY; // Ball's vertical position
let speedX = 2; // Ball's horizontal speed
let speedY = 2; // Ball's vertical speed




game.append(ball);
// ball movement

const platformStyleHeight = window.getComputedStyle(platformContainer).getPropertyValue("margin-top");

let ballBounce = false;

let ballTimeout = 0;

function updateBallPosition() {
        // Update ball's position based on speed

    if (!pause) {
    ballX += speedX;
    ballY += speedY;
    }

    const gameWidth = game.offsetWidth;
    const gameHeight = parseInt(game.offsetHeight) + parseInt(platformStyleHeight) - platformContainer.offsetHeight + "px"; // well I know it is rigged, but ITS WORKS!!!


    // Check for collision with the boundaries of the game container
    if (ballX <= 0 || ballX >= gameWidth - ball.offsetWidth) {
        speedX *= -1; // Reverse horizontal speed
    }
    if (ballY <= 0 || ballY >= parseInt(gameHeight) - ball.offsetHeight) {
        speedY *= -1; // Reverse vertical speed
    }

    ballBouncePlatform();

    blockBallSystem();

    // Update ball's position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Request next animation frame
    requestAnimationFrame(updateBallPosition);

}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Spacer' || event.key === ' ') {
        pause = !pause;
        cancelAnimationFrame(animationFrameId);
    }
});

updateBallPosition();


function ballBouncePlatform() {

    // ball bounce system with platform
    if (ballTimeout <= 0 && ballBounce !== false) {
        ballBounce = false;
    } else {
        ballTimeout--;
    }
    const ballRect = ball.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();

    console.log(ballRect.bottom);
    console.log(platformRect.top);

    if (ballRect.bottom >= platformRect.top && ballRect.bottom <= platformRect.bottom &&
        ballRect.right >= platformRect.left && ballRect.left <= platformRect.right && ballBounce === false) {
        // Collision detected, change the direction of vertical velocity to make it bounce
        speedY *= -1;
        cancelAnimationFrame(updateBallPosition);
        ballBounce = true;
        ballTimeout = 5;
    }
}



function blockBallSystem() {
    for (let i = 1; i <= 6; i++) {
        let blockContainer = document.querySelector("#block-container-id-" + i);
        for (let j = 0; j <= 10; j++) {
            const block = blockContainer.querySelector("#block-id-" + j);

            const blockRect = block.getBoundingClientRect();
            const ballRect = ball.getBoundingClientRect();

            if (ballRect.top <= blockRect.bottom && ballRect.right >= blockRect.left && ballRect.left <= blockRect.right
                && ballTimeout <= 0 && block.style.background !== 'transparent') {
                // Collision detected with a visible block, remove the block and reverse ball's direction
                let hp = block.dataset.hp;
                block.dataset.hp = (hp - 1).toString();
                if (hp - 1 !== 0) {
                    block.classList.remove("hp-" + hp);
                    block.classList.add("hp-" + (hp - 1));
                } else {
                    scorePoints += 20;
                    score.removeChild(scorePointsHTML);
                    scorePointsHTML = document.createElement("p");
                    scorePointsHTML.append(scorePoints.toString());
                    score.append(scorePointsHTML);
                    block.style.background = 'transparent';
                }
                speedY *= -1;
                ballTimeout = 5;
            }
        }
    }
}












































// secret music
const bgMusic = document.getElementById('bg-music');
const playPauseButton = document.getElementById('play-pause-button');

playPauseButton.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        playPauseButton.textContent = 'Pause';
        document.body.classList.add('animation-active');
        for (let i = 1; i <= 3; i++) {
            let column = document.querySelector("#column-" + i);
            column.classList.add('animation-active');
        }

    } else {
        bgMusic.pause();
        playPauseButton.textContent = 'Play';
        document.body.classList.remove('animation-active');
        for (let i = 1; i <= 3; i++) {
            let column = document.querySelector("#column-" + i);
            column.classList.remove('animation-active');
        }
    }
});
