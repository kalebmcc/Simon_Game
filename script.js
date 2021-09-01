// ---------------SELECTIONS---------------
const start = document.querySelector('.start');
const startSpacer = document.querySelector('.start-spacer')
const score = document.querySelector('.score');

const colorContainer = document.querySelector('.color-container');
const blue = document.querySelector('#blue');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const green = document.querySelector('#green');

const easy = document.getElementById('easy')
const medium = document.getElementById('medium')
const hard = document.getElementById('hard')
const difficulty = document.querySelector('.difficulty')
const difficultySpacer = document.querySelector('.difficulty-spacer')

// ---------------GLOBAL_VARIABLES---------------
let playerScore = 0
let colorSequence = []
let playerSequence = []
let delay = 1000
let buttonDelay = 500
let colors = [blue,red,yellow,green]

// ---------------EVENTS---------------
//begins game
start.addEventListener('click', startGame)

//player sequence
colorContainer.addEventListener('click', playGame)

//Difficulties
easy.addEventListener('click', easyMode)
medium.addEventListener('click', mediumMode)
hard.addEventListener('click', hardMode)

// ---------------FUNCTIONS---------------
// MAIN - before player input
function startGame(event) {
    event.preventDefault()

    //resets
    playerSequence = []
    colorSequence = []
    playerScore = 0
	score.innerText = `Score: ${playerScore}`

	//remove difficulties
	difficulty.style.display = 'none';
	difficultySpacer.style.display = 'block'

	//Change Start
	start.style.display = 'none';
	startSpacer.style.display = 'block'
	start.innerText = "TRY AGAIN"

    //randomly selects color and add to sequence
    addColor();
    
}
//MAIN - after player input
function playGame(event) {
	event.preventDefault();

	if (event.target.localName === 'button') {
		playerChoice(event);
		if(playerSequence.length >= colorSequence.length) {
			if (JSON.stringify(playerSequence) === JSON.stringify(colorSequence)) {
				updateScore();
				winning();
				setTimeout(printSequence, delay);
				playerSequence = []
				
			} else {
				wrong();
			}	
		}
	
	}else {
        return;
    }
}

function addColor() {
    //FIRST TIME
	//randomly selects color and add to sequence
	let randomIndex = Math.ceil(Math.random() * 4);
	if (randomIndex === 1) {
		selectButton(blue);
		colorSequence.push(1);
	} else if (randomIndex === 2) {
		selectButton(red);
		colorSequence.push(2);
	} else if (randomIndex === 3) {
		selectButton(yellow);
		colorSequence.push(3);
	} else if (randomIndex === 4) {
		selectButton(green);
		colorSequence.push(4);
	}
}

function moreColor() {

	//2+ TIMES
	//randomly selects color and add to sequence
	let randomIndex = Math.ceil(Math.random() * 4);
	if (randomIndex === 1) {
		
		colorSequence.push(1);
	} else if (randomIndex === 2) {
		
		colorSequence.push(2);
	} else if (randomIndex === 3) {
		
		colorSequence.push(3);
	} else if (randomIndex === 4) {
		
		colorSequence.push(4);
	}
}

//Runs through colors
function printSequence() {
    moreColor();
    loopSequence(colorSequence,loop,delay);
}
//Allows for time between showing colors
function loopSequence(array, delegate, delay) {
        array.forEach(function(el,i) {
            setTimeout(function() {
                loop(array[i]);
            }, i * delay)
        })
}
//Shows colors of the array
function loop(i) {
			if (i === 1) {
				selectButton(blue);
			} else if (i === 2) {
				selectButton(red);
			} else if (i === 3) {
				selectButton(yellow);
			} else if (i=== 4) {
				selectButton(green);
			} else {
            return;
        }
}


function playerChoice(event) {

    if (event.target.id == 'blue') {
			selectButton(blue);
			playerSequence.push(1);
		} else if (event.target.id == 'red') {
			selectButton(red);
			playerSequence.push(2);
		} else if (event.target.id == 'yellow') {
			selectButton(yellow);
			playerSequence.push(3);
		} else if (event.target.id == 'green') {
			selectButton(green);
			playerSequence.push(4);
		} else {
            return;
        }
}

function colorSequenceRun() {
    colorSequence.forEach((num) => {
        if(num == 1) {
            selectButton(blue)
        } else if(num == 2) {
            selectButton(red)
        } else if(num ==3) {
            selectButton(yellow)
        } else if(num ==4) {
            selectButton(green)
        }
    })
}

function updateScore() {
    playerScore = playerScore + 1
    score.innerText = `Score:${playerScore}`
}

//DIFFICULTIES
function easyMode() {
	delay = 1000
	buttonDelay = 500
	easy.classList = 'easy-click';
	hard.classList = '';
	medium.classList = '';
}

function mediumMode() {
	delay = 700
	buttonDelay = 500
	medium.classList = "medium-click";
	easy.classList = '';
	hard.classList = '';
}

function hardMode() {
	delay = 250
	buttonDelay = 100
	hard.classList = 'hard-click';
	easy.classList = '';
	medium.classList = '';
}
//WRONG ANSWER FUNCTIONS
function wrong() {
    colors.forEach(flashRed)
	start.style.display = ''
	difficulty.style.display = ''
	startSpacer.style.display = 'none'
	difficultySpacer.style.display = 'none'
}

function flashRed(color) {
	color.classList.toggle('wrong');
    setTimeout(() => {color.classList.toggle('wrong');},1000);
}

function winning() {
	if(playerScore >=10) {
		score.innerText = `Score: ${playerScore} - Nice Job!`
	} else if(delay === 250 && playerScore >=10) {
		score.innerText = `Score: ${playerScore} - Nice Job!`
	}
}



//SELECTION - COLOR CHANGE FOR BUTTONS
function selectButton(color) {
    color.classList.toggle('select')
    setTimeout(() => {color.classList.toggle('select');},buttonDelay);
}
