
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];



var userclickedPattern = [];

$(".btn").click(function () {

    // jo button click hoga oska id store kro
    var userChosenColour = $(this).attr("id");

    // ab store kro jo bhi id store hua yani jo user click kiya hai button pr ya jo color par click kiya hai osko array me dalo
    userclickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    // for debug purpose likha tha
    // console.log(userclickedPattern);
    animatePress(userChosenColour);

    checkAnswer(userclickedPattern.length - 1);
});




function checkAnswer(currentLevel) {
    // dekho next sequence ek bar call ho chuka hai so gamepatter me store ho gya hoga ek color so ab user click kiya and check
    // hoga ki kya user same color pr click kiya hai ya nhi
    if (gamePattern[currentLevel] == userclickedPattern[currentLevel]) {
        // agar user same color par click kiya hai to check kro ki kya gamepatter ka length equal hai userclickedpattern ke 
        // and if equal hai to game ko end kro next sequence ko call kro
        if(gamePattern.length == userclickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            } , 1000);
        } 
    }
    else{
        // wrong input kiya hai user ne so wrong output hoga 
        console.log("wrong");
        // now ab kam kro jab wrong input diya hai user ne
        playSound("wrong");

        // class add kro jisme screen red ho jayega pura jab wrong input kroge 
        $("body").addClass("game-over");
        
        setTimeout(function(){
        $("body").removeClass("game-over");
        } , 200)

        // h1 tag ko bhi change kro to game over
        $("#level-title").text("Game over, Press Any Key to Restart");

        // call the startover function 
        startOver();
    }
}


// function for reset the game
function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColour) {
    // now isse class add ho gya html me ok so ab remove bhi krna hoga kuch der bad so oske liye timeout function kam ayega
    $("#" + currentColour).addClass("pressed");

    // to remove the pressed class from html 
    setTimeout(function () { $("#" + currentColour).removeClass("pressed") }, 100);

    // now isko waha add bhi krna hoga jaha button click ho rha hai ok so add kro
}



var started = false;
var level = 0;
$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
})


function nextSequence() {

    // userclickedpatter ko khali kr do kiuki ab user naye se insert krega color choose krna 
    userclickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    // console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);

    // ranodm color bhi flash hoga and wahi color se related sound bhi ayega
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}













