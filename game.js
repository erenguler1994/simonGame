var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//ilk oyuna basladiginda bir kere calismasi icin start veriyor
  $(document).keypress(function() {
    if(!started){
    $('level-title').text("Level " + level);
    nextSequence();
    started = true;

  }
});

// bastiginda ses cikmasi icin, arkaplan degismesi icin ve user in bastiklarini arraye atmasi icin
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currenLevel) {
  if(gamePattern[currenLevel] === userClickedPattern[currenLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press any key to restart.");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }
}

//ana islemler
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  ++level;
  $("h1").text("Level " + level);
}

//ses cikarma fonksiyonu
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//bastiginda arka plani flash gosterim icin
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
  },100);
}
