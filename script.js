let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentStreak = document.getElementById('current-streak')
let bestStreak = document.getElementById('best-streak');

let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let streak = 0;
let currentBestStreak = 0;


const addStreak = () => {
    streak ++;
    currentStreak.innerHTML = streak;
    return streak;
}

const highestStreak = (streak) => {
    if (streak > currentBestStreak) {
        currentBestStreak = streak;
    }
    return currentBestStreak;
}

const isBot = (door) => {
    if (door.src === botDoorPath){
        return true;
    } else {
        return false;
    };
};

const isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    };
};

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
};

const randomChoreDoorGenerator = () => {
    choreDoor = Math.floor(Math.random() * numClosedDoors);
    
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    } else if (choreDoor === 2) {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    };
};

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    };
};

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    };
};

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    };
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  };
};

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        addStreak();
    } else {
        startButton.innerHTML = 'Game Over! Play again?';
        highestStreak(streak);
        streak = 0;
        currentStreak.innerHTML = streak;
        bestStreak.innerHTML = currentBestStreak;
    };
  currentlyPlaying = false;
};


startRound();