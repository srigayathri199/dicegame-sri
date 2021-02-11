var scores, roundScore, activePlayer, gameplaying;
init();
var predice;
//roll button
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gameplaying) {
        //random number
        var dice = Math.floor(Math.random() * 6) + 1;


        document.getElementById("dice-1").style.display = "block";

        document.getElementById("dice-1").src = 'dice-' + dice + '.png';


        // current score
        //2 six rolled in a row then loose all score
        if (dice === 6 && predice === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = 0;
            changeroll();
        } else if (dice !== 1) {
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            changeroll();
        }
        predice = dice;

    }

});

//hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gameplaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var winningscore;
        //deciding the winning score
        var input = document.querySelector('.final-score').value;

        //means not 0,not null,undefined,empty " "
        if (input) {
            winningscore = input;
        } else {
            winningscore = 100;
        }

        //check if player won the game
        if (scores[activePlayer] >= winningscore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";

            document.getElementById("dice-1").style.display = "none";

            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");

            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

            gameplaying = false;
        } else {
            changeroll();
        }
    }

});


function changeroll() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //round to 0 if dice=1
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    //toggle contains contains(),add(),remove()
    //if in the classlists of an element contains active,then remove active or else add active class
    //for active appearence
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //if dice=1,disappear the dice image
    // document.getElementById("dice-1").style.display = "none";
}

//new game
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameplaying = true;
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    //to make disappear the dice image
    document.getElementById("dice-1").style.display = "none";

    document.getElementById("name-0").textContent = "PLAYER 1";
    document.getElementById("name-1").textContent = "PLAYER 2";


    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

    window.addEventListener('load', function() {
        alert(`Welcome!\n Start the game by rolling the dice, the number displayed on dice is added to the current score.\n If the dice shows one, then the current score becomes "0",then turn goes to other player. \n When u hold, the current score is added to the total score and then turn goes to other player. \n whenever the total score matches to the final score (default is 100),which you specify at the final score box, then the player wins! `);
    })
}