// get elements from html
const score_result_text = document.getElementById("user_score");
const text = document.getElementById("text");
const span_text = document.getElementById("span_text");
const rex_text = document.getElementById("rex_text");
const chopper_text = document.getElementById("chopper_text"); 

// get result from storage
user_result = sessionStorage.getItem("userScore");
chopper_result = sessionStorage.getItem("chopperScore");
score_result = sessionStorage.getItem("scoreLevel");

// display result
score_result_text.innerText = user_result + " - " + chopper_result;

// change element colour depending on result
if(score_result > 5){
    // if win
    text.innerText = "CONGRATULATIONS \n YOU WON!";
    rex_text.innerText = "Woohoo! We won! I couldn't have done it without you. Thanks friend!";
    chopper_text.innerText = "Well done, you beat me in the quiz! Want to play another round?"; 
    $('#user_score').css('color', 'green');
} else if (score_result == 5) {
    // if draw
    text.innerText = "It's a DRAW!";
    rex_text.innerText = "Good effort! But we can beat him next time!";
    chopper_text.innerText = " It was 2 against 1 and I still drew. HAHA!"; 
    $("#user_score").css("color", "orange");
}else if (score_result < 5){
    // if lose
    text.innerText = "UNLUCKY. YOU LOST!";
    rex_text.innerText = "Aww Chopper beat us. Don't worry, we'll beat him next time!";
    chopper_text.innerText = "I came I saw I conquered! I am indeed the smartest dinosaur!"; 
    $("#user_score").css("color", "red");
}
