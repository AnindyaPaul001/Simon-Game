var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var  level = 0;
var  started = false;
$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswere(userClickedPattern.length - 1);
  
  playSound(userChosenColour);
});

$(".btn").click(function() {
  $(this).addClass("pressed");
  setTimeout(function(){
    $(".btn").removeClass("pressed");
  }, 100);
});

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

function checkAnswere(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      } , 1000);
    }
  }
  else if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
    playSound("wrong");
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass( "game-over" );
    setTimeout(function () {
      $("body").removeClass( "game-over" );
    }, 200);

    startOver();
  }
}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

 
