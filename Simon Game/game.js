var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];




function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var x = $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").html("level " + level);



}



function playSound(name) {

    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();

}

function wrongAnswer() {

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();


}

function animatePress(currentColor) {

    $(currentColor).addClass("pressed");

    setTimeout(() => {
        $(currentColor).removeClass("pressed");

    }, 100);


}

var level = 0;

gameStarted = false;

$(document).on("keypress", function () {

    if (!gameStarted) {

        $("h1").html("level " + level);
        nextSequence();
        gameStarted = true;

    }



})


$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress("#" + userChosenColour);
    checkAnswer(userClickedPattern.length - 1);




})


function startOver() {

    level = 0;
    gamePattern = [];
    gameStarted = false;


}




function checkAnswer(currentLevel) {


    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000)

        }

    } else {

        wrongAnswer();
        $("body").addClass("game-over");

        setTimeout(() => {

            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over,press Any key to Restart");
        startOver();

    }

}