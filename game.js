const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern=[];
var level= 0;
var started = false;




function nextSequence() {
  userClickPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  
  //gamePattern.push(randomChosenColour);
  $("h1").text("Level " + level);
  console.log(randomNumber); 
  console.log(gamePattern);
  var animationDuration=200;
  $('#' + randomChosenColour).fadeOut(animationDuration).fadeIn(animationDuration);
  playSound(randomChosenColour);

  //ar beat =new Audio ("./sounds/"+randomChosenColour+".mp3");
  //beat.play();
 
  
}
//nextSequence();

$( ".btn" ).on( "click", function() {
  var userChosenColour=$(this).attr("id");
  userClickPattern.push(userChosenColour);

  //var beating =new Audio ("./sounds/"+userChosenColour+".mp3");
  //beating.play();
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //checkAnswer();
  checkAnswer(userClickPattern.length-1);
  console.log(userChosenColour);
  console.log(userClickPattern);
} );

function animatePress(_name){
  var press = $("#" + _name);
  press.addClass("pressed");
  setTimeout(function(){
    press.removeClass("pressed");
}, 100);

    
    

}


function handleFirst(event){
  
  //$('#' + randomChosenColour).fadeOut(animationDuration).fadeIn(animationDuration);
  //nextSequence()
  //$("h1").text("Level "+level);
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
    
  }
}




function checkAnswer(currentLevel) {
 
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).on("keydown",handleFirst)
