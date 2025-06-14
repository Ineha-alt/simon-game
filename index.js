var button = ["red", "yellow", "green", "blue"];
var level = 0;
var gamesquence = [];
var start = false;
var userclicksquence = [];
$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").on("click", function () {
    var userclickcolor = $(this).attr("id");
    userclicksquence.push(userclickcolor);
    playSound(userclickcolor);
    animatePress(userclickcolor);
    checkpattern(userclicksquence.length - 1);
});

function checkpattern(currentLevel) {
    if (gamesquence[currentLevel] === userclicksquence[currentLevel]) {
        console.log("success");
        if (userclicksquence.length === gamesquence.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("gameover");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startagain();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userclicksquence = [];
    level++;
    $("#level-title").text("level " + level);
    var randomno = Math.floor(Math.random() * 4) + 1;
    var randombutton = button[randomno];
    gamesquence.push(randombutton);
    $("#" + randombutton).fadeIn(1000).fadeOut(100).fadeIn(100);
    playSound(randombutton);
}


function playSound(name) {
    var sound = new Audio("../sounds/" + name + ".mp3");
    sound.play();
}

function startagain() {
    gamesquence = [];
    start = false
    level = 0;
}