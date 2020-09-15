let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let currScore = 0;
let bScore = 0;
let currentScore = document.getElementById('curr-score');
let bestScore = document.getElementById('best-score');

const isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

const isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver('lose');
    }
}

const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors);
    console.log(choreDoor);

    switch (choreDoor) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor2 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 2:
            openDoor3 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            break;
    }
}

doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
}
doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}
doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}


startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!'
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        updateScore(status);
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        updateScore(status);
    }
    currentlyPlaying = false;
}

const updateScore = (status) => {
    if (status === 'win') {
        currScore++;
        currentScore.innerHTML = currScore;
        if (currScore > bScore) {
            bScore = currScore;
            bestScore.innerHTML = bScore;
        }
    } else {
        currScore = 0;
        currentScore.innerHTML = currScore;
    }
}
startRound();