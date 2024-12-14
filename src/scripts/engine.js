const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        //variable for the interval to random the enemy position
        gameVelocity: 1000,
        //variable for the square id with the class enemy
        hitPosition: 0,
        //variable for score
        result: 0,
        //time of the game
        currentTime: 60,
    },
    actions: {
        //interval for enemy movement
        timerId: setInterval(randomSquare, 1000),
        //interval for timer
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

//function to remove the enemy class from all the squares and then add the class in a random square
function randomSquare(){
    //remove the enemy class from all squares
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    //variable with a random number from 1 to 9
    let randomNumber = Math.floor(Math.random()*9);
    //variable with a random square selected
    let randomSquare = state.view.squares[randomNumber];
    //add the enemy class on the random square selected
    randomSquare.classList.add("enemy");
    //insert in the hitPosition variable the id of the random square with the enemy class
    state.values.hitPosition = randomSquare.id;

}

//function to listen to when the user click on ralph
function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        //adds the mousedown event listener
        square.addEventListener("mousedown", () => {
            //checks if the squared clicked on the screen is the same square on the hitPosition variable 
            if(square.id === state.values.hitPosition){
                //adds 1 to the result variable
                state.values.result++;
                //updates the score text with the result variable
                state.view.score.textContent = state.values.result;
                //turns hitPosition into null so player can't farm points on the same place
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

//function to start the game
function initialize(){
    addListenerHitbox();
}

initialize();