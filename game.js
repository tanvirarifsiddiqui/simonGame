
var calledButtonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level = 0;

// detect keypress
$(document).keypress(function () { 
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
// detect button click
$(".btn").click(function () { 
        // clickCount++;
        //nextSequence();
        if (started) {
            var userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);
    
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length-1);
        }
    })

//Check Correct Function
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("game Over!, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = calledButtonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    //animatePress(randomChosenColor);
}

//sound Function
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//Press Animation Function
function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    }, 100);
}

//Start Over Function

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



// Optional Other solution for click 

// for (let i = 0; i < calledButtonColor.length; i++) {
//     $("#"+calledButtonColor[i]).click(function (e) { 
//     nextSequence();
//     userChosenColour =e.target.id;
//     userClickedPattern.push(e.target.id);
//     console.log(userClickedPattern);
// })
// }

