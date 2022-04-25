// Get Elements from html
const question = document.getElementById('Q');
const options = Array.from(document.getElementsByClassName('option_text'));
const points = 1;
const usr_score_text = document.getElementById('user_score');
const chop_score_text = document.getElementById('chopper_score');
const hint = document.getElementById("question");
const userName = document.getElementById("userName");

// Define variables
var question_pointer = {};		
var user_score = 0;				
var chopper_score = 0;		
var question_counter = 0;	
var unused_quesions = [];		// Take questions out of this array. This prevents duplicates by removing each used question.
var score_level = 5;			// Starts in the middle (10 to win, 0 to lose)

increase_chopper_score = (n) => {
	// Function to manage Chopper's score
    chopper_score += n;
    chop_score_text.innerText = chopper_score;
};

increase_user_score = (n) => {
	// Function to manage user score
    user_score += n;
    usr_score_text.innerText = user_score;
};

chopper_answer = () => {
	// configure 2/3rds probability of getting right answer
	var chop_ans =  Math.floor(Math.random() * 3) + 1;
	if (chop_ans != question_pointer.answer) {
		chop_ans =  Math.floor(Math.random() * 3) + 1;
	}
	alert("Chopper picked option " + chop_ans);
	if (chop_ans == question_pointer.answer) {
			var cur_size = $("#bar_level").width();
			var increment = 50;
			$("#bar_level").css('width', '-=' + increment);
			score_level--;
			alert("Chopper got it right!")
			increase_chopper_score(points);
	}
	else {
		alert("Chopper got it wrong!")
	}
};

options.forEach((option_) => {
    option_.addEventListener('click', (e) => {
		// event listener for user clicking to select answers
        const chosen_option = e.target;
        const chosen_answer = chosen_option.dataset['tag'];
		
		// User answers
		if (chosen_answer == question_pointer.answer){
            answer_class = "right";
			var cur_size = $("#bar_level").width();
			var increment = 50;
			$("#bar_level").css('width', '+=' + increment);
			score_level++;
			increase_user_score(points);
		}
		else {
			answer_class = "wrong";
		}
		
		// get the container (quiz_box) and add in the answer_class
		chosen_option.parentElement.classList.add(answer_class);
		// Set Chopper's answer and inform user
		chopper_answer();
		// remove the class after delay and get next question
		setTimeout(() => {
			chosen_option.parentElement.classList.remove(answer_class);
			getNextQuestion();
		}, 1500);
    });
});

// Add listener to hint image
hint.addEventListener("click", function() {
   alert(question_pointer.hint);
});

end_check = () => {
    // Function to check end conditions
    if (unused_quesions.length == 0 || score_level == 10 || score_level == 0) { 
	   	// Save game result
		sessionStorage.setItem("userScore", user_score);
		sessionStorage.setItem("chopperScore", chopper_score);
		sessionStorage.setItem("scoreLevel", score_level);
		// Navigate to end page
		return window.location.assign("../pages/end_quiz.html");
    }
};	


getNextQuestion = () => {
    // Check if there are more question and score level
    end_check();
    question_counter++;
	// Index for taking random question
    const question_index = Math.floor(Math.random() * unused_quesions.length);
    // Use question pointer to target randomly selected question
	question_pointer = unused_quesions[question_index];
    question.innerText = question_pointer.question;

    options.forEach((option_) => {
        const tag = option_.dataset['tag'];
        option_.innerText = question_pointer['option_' + tag];
    });
	// Remove question just used
    unused_quesions.splice(question_index, 1);
};

setUserName = () => {
	// Function to set username and store it
	const userResult = sessionStorage.getItem("userName");
	userName.innerText = "Hello " + userResult + ", Help Rex beat Chopper in the Quiz!";
};
	
startGame = () => {
	// Main function which begins the quiz and calls other functions
	setUserName();
    question_counter = 0;
    user_score = 0;
	chopper_score = 0;
	// Takes all items from questions and put them in a new array
    unused_quesions = [...questions];
    getNextQuestion();
};

// Start the quiz
startGame();