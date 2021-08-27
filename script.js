// ---------------SELECTIONS---------------
const start = document.querySelector('.start');
const score = document.querySelector('.score');

const colorContainer = document.querySelector('.color-container');
const blue = document.querySelector('#blue');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const green = document.querySelector('#green');

// ---------------GLOBAL_VARIABLES---------------
let playerScore = 0
let colorSequence = []
let playerSequence = []
let delay = 1000



// ---------------FUNCTIONS---------------
// MAIN - before player input
function startGame(event) {
    event.preventDefault()

    //resets
    playerSequence = []
    colorSequence = []
    playScore = 0

    //randomly selects color and add to sequence
    addColor();
    
}
//MAIN - after player input
function playGame(event) {
	event.preventDefault();

	if (event.target.localName === 'button') {
		playerChoice(event);
		if(playerSequence.length === colorSequence.length) {
			if (JSON.stringify(playerSequence) === JSON.stringify(colorSequence)) {
				updateScore();
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
    
        //WRONG CODE
    // if (
	// 		event.target.id === 'blue' &&
	// 		colorSequence[colorSequence.length - 1] == 1
	// 	) {
	// 		selectButton(blue);
	// 		setTimeout(addColor, 2000);
	// 	} else if (
	// 		event.target.id === 'red' &&
	// 		colorSequence[colorSequence.length - 1] == 2
	// 	) {
	// 		selectButton(red);
	// 		setTimeout(addColor, 2000);
	// 	} else if (
	// 		event.target.id === 'yellow' &&
	// 		colorSequence[colorSequence.length - 1] == 3
	// 	) {
	// 		selectButton(yellow);
	// 		setTimeout(addColor, 2000);
	// 	} else if (
	// 		event.target.id === 'green' &&
	// 		colorSequence[colorSequence.length - 1] == 4
	// 	) {
	// 		selectButton(green);
	// 		setTimeout(addColor, 2000);
	// 	} else {
    //         return wrong();
    //     }
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

function wrong() {
    for(i=0; i<3; i++) {
    red.classList.toggle('wrong');
    green.classList.toggle('wrong');
    yellow.classList.toggle('wrong');
    blue.classList.toggle('wrong');
	setTimeout(() => {red.classList.toggle('wrong');}, 300);
    setTimeout(() => {yellow.classList.toggle('wrong');}, 300);
    setTimeout(() => {green.classList.toggle('wrong');}, 300);
    setTimeout(() => {blue.classList.toggle('wrong');}, 300);
    }
}

function selectButton(color) {
    color.classList.toggle('select')
    setTimeout(() => {color.classList.toggle('select');},500);
}

function hoverButton(event) {
    console.log(event)
    if(event.target.localName === 'button') {
        event.target.classList.toggle('select')
    }
    
}






// ---------------EVENTS---------------
//begins game
start.addEventListener('click', startGame)

//player sequence
colorContainer.addEventListener('click', playGame)

//mouse hover
// colorContainer.addEventListener('mouseover',hoverButton);
// colorContainer.addEventListener('mouseout', hoverButton);
