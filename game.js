// Array Of Colors

var buttonColours = ["red", "blue", "green", "yellow"];

// Stores Selected Colors

var gamePattern = [];

// Stores User Selected Button Colors

var userClickedPattern = [];

// Track If Game Has Started

var started = false;

// Starting Level

var level = 0;

// Detect Keydown to start game

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Registers User Click Events On Button Elements

$(".btn").click(function (event) {
  // Select Clicked attribute

  var userChosenColour = $(this).attr("id");

  // Store Value Of Click in userClickedPattern

  userClickedPattern.push(userChosenColour);

  // Animate And Play Sounds Upon Click

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Checks User Clicks Against Random Selections
// Continues Game When Correct, Restarts When Incorrect

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart")
        startOver();

    }
}



function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

  // Generate Random Number

  var randomNumber = Math.floor(Math.random() * 4);

  // Get random color

  var randomChosenColour = buttonColours[randomNumber];

  // Send random chosen color to gamePattern

  gamePattern.push(randomChosenColour);

  // Animate the buttons to flash and play sound

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Plays Audio

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animates Clicks

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Starts Game Over

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}