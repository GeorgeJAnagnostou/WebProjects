//rock paper and scissors ID's
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let rock = document.getElementById("rock");
let rpsArray = [rock, paper, scissors];

//step3
let scoreCounter = 0;
let playAgain = document.getElementById("play-again");

// modal componants
var btn = document.getElementById("rules");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
document.getElementById("rules").onclick = function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// When the user clicks on (x), close the modal
span.onclick = function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
}


//displays the player choice and prompts for houseChoice 
const startplayerChoice = (playerSelection) => {
    var playerChoice = document.getElementsByClassName("player-selection")[0];
    var step1 = document.getElementById("game-step-1");
    var step2 = document.getElementById("selection-card");

    let cloneSelection = playerSelection.cloneNode(true);

    step1.style.display = "none";

    cloneSelection.classList.remove('paper', 'scissors', 'rock');
    cloneSelection.classList.add('no-pointer');
    cloneSelection.style.transform = "scale(1.3)";
    playerChoice.appendChild(cloneSelection);

    step2.style.visibility = "visible";
    spinHouseChoice();
}

//selects a random house choice, spins it, and sets it
function spinHouseChoice() {
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let rock = document.getElementById("rock");
    let rpsArray = [rock, paper, scissors];

    var randomChoice = rpsArray[Math.floor(Math.random() * rpsArray.length)];
    const cloneRandom = randomChoice.cloneNode(true);
    cloneRandom.classList.remove('paper', 'scissors', 'rock');
    cloneRandom.classList.add('no-pointer');
    cloneRandom.style.transform = "scale(1.3)";

    const clonePaper = paper.cloneNode(true);
    clonePaper.classList.remove('paper');
    clonePaper.classList.add('no-pointer');
    clonePaper.style.transform = "scale(1.3)";

    const cloneScissors = scissors.cloneNode(true);
    cloneScissors.classList.remove('scissors');
    cloneScissors.classList.add('no-pointer');
    cloneScissors.style.transform = "scale(1.3)";

    const cloneRock = rock.cloneNode(true);
    cloneRock.classList.remove('rock');
    cloneRock.classList.add('no-pointer');
    cloneRock.style.transform = "scale(1.3)";

    //spins the coins then shows the house choice
    let houseChoice = document.getElementsByClassName("house-selection")[0];
    let degrees;
    //check to see if the transform style exists
    if (houseChoice.style.transform) { //if so, take the current degrees and add 1800
        degrees = parseInt(houseChoice.style.transform.substr(8, houseChoice.style.transform.indexOf("d"))) + 1800;
    } else { ///else, it sets degrees to 1800
        degrees = 1800;
    }
    houseChoice.style.transform = "rotateY(" + degrees + "deg)"; //spin the houseChoice

    //visual to change the coin while spinning
    setTimeout(function () {
        houseChoice.appendChild(clonePaper);
    }, 0);
    setTimeout(function () {
        houseChoice.replaceChild(cloneScissors, clonePaper);
    }, 250);
    setTimeout(function () {
        houseChoice.replaceChild(cloneRock, cloneScissors);
    }, 500);
    setTimeout(function () {
        houseChoice.replaceChild(clonePaper, cloneRock);
    }, 750);
    setTimeout(function () {
        houseChoice.replaceChild(cloneScissors, clonePaper);
    }, 1000);
    setTimeout(function () {
        houseChoice.replaceChild(cloneRock, cloneScissors);
    }, 1200);
    setTimeout(function () {
        houseChoice.replaceChild(cloneRandom, cloneRock);
    }, 1500);
    clearTimeout();


    checkForWinner(cloneRandom);
}

//checks for winning conditions and update score
function checkForWinner(cloneRandom) {
    setTimeout(function () {
        let result = document.getElementById("result");
        var step3 = document.getElementsByClassName("game-result")[0];
        let score = document.getElementById("score");
        let winEffect = document.getElementById("win-background");

        if ((playerSelection.id === 'paper' && cloneRandom.id === 'rock') ||
            (playerSelection.id === 'scissors' && cloneRandom.id === 'paper') ||
            (playerSelection.id === 'rock' && cloneRandom.id === 'scissors')) {
            scoreCounter++;
            score.innerHTML = scoreCounter;
            result.innerHTML = "YOU WON!";
            step3.style.visibility = 'visible';
            winEffect.style.transform = "scale(1)";
        } else if ((playerSelection.id === 'paper' && cloneRandom.id === 'paper') ||
            (playerSelection.id === 'scissors' && cloneRandom.id === 'scissors') ||
            (playerSelection.id === 'rock' && cloneRandom.id === 'rock')) {
            result.innerHTML = "IT'S A TIE!";
            step3.style.visibility = 'visible';
        } else {
            result.innerHTML = "YOU LOSE!";
            step3.style.visibility = 'visible';
        }
    }, 2000);
    clearTimeout();
}


//controls PLAY AGAIN button
function playGameAgain() {
    var step1 = document.getElementById("game-step-1");
    var step2 = document.getElementById("selection-card");
    var step3 = document.getElementsByClassName("game-result")[0];
    var houseSelect = document.getElementsByClassName("house-selection")[0];
    let winEffect = document.getElementById("win-background");

    step1.style.display = "block";
    step2.style.visibility = "hidden";
    step3.style.visibility = "hidden";
    houseSelect.innerHTML = "";
    winEffect.style.transform = "scale(0)";


    paper = document.getElementById("paper");
    scissors = document.getElementById("scissors");
    rock = document.getElementById("rock");
    rpsArray = [rock, paper, scissors];

    document.getElementById("score").innerHTML = scoreCounter;
    playAgain = document.getElementById("play-again");

}


function selectPaper() {
    playerSelection = document.getElementById("paper");
    startplayerChoice(playerSelection);
}

function selectScissors() {
    playerSelection = document.getElementById("scissors");
    startplayerChoice(playerSelection);
}

function selectRock() {
    playerSelection = document.getElementById("rock");
    startplayerChoice(playerSelection);
}