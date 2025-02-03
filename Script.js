// Getting all the necessary DOM elements
const questions = document.getElementsByClassName('question'); // All question elements
const nextBtn = document.getElementById('next'); // Next button to move to the next question
const finishBtn = document.getElementById('finish'); // Finish button to end the quiz
const restartBtn = document.getElementById('restart'); // Restart button to restart the quiz
const startBtn = document.getElementById('start-quiz'); // Start button to begin the quiz
const exitQuiz = document.getElementById('exit'); // Exit button to exit the quiz
let currentQuestion = document.getElementById('current-question'); // Displays the current question number
let score = document.getElementById('score'); // Displays the user's score
const options = document.getElementsByClassName('option'); // All answer options for a question
const questionQuiz = document.querySelectorAll('.question'); // All question elements
const questionContainer = document.getElementById('question-container'); // Container for questions
const result = document.getElementById('result'); // Result container (display score and feedback)
const scoreSummary = document.getElementsByClassName('score-summary'); // Summary of score
// const exitGame = document.getElementById('exit-game'); // Unused exit game element (commented out)
const rule = document.getElementById('rule'); // Rule/instruction section

// Initial setup for question index and score
let questionIndex = 1; // The current question index starts at 1
updateQuestionNumber(); // Update the displayed question number

let flag = 0; // Flag to track if the user has answered the question
let scoreCount = 0; // Variable to track the score

// Adding event listeners to each option for answering questions
for(item of options){
    item.addEventListener('click', (event) => {
        // Log the flag for debugging
        console.log(flag);

        // Check if the selected option is the correct answer based on question index
        if((questionIndex == 1 && event.target.innerText == "London") ||
           (questionIndex == 2 && event.target.innerText == "Jupiter") ||
           (questionIndex == 3 && event.target.innerText == "William Shakespeare") ||
           (questionIndex == 4 && event.target.innerText == "H2O") ||
           (questionIndex == 5 && event.target.innerText == "NaCl") ||
           (questionIndex == 6 && event.target.innerText == "Mount Everest") ||
           (questionIndex == 7 && event.target.innerText == "Hydrogen") ||
           (questionIndex == 8 && event.target.innerText == "Tokyo") ||
           (questionIndex == 9 && event.target.innerText == "8") ||
           (questionIndex == 10 && event.target.innerText == "Leonardo da Vinci")) {
            
            flag = 1; // Correct answer
            console.log(flag);
            console.log(event.target.innerText);
            event.target.style.backgroundColor = "green"; // Change the background color to green for correct answer
            scoreCount++; // Increase the score count

            // Disable further interaction with options after answering
            for(let i = 0; i < options.length; i++) {
                if(flag == 1) {
                    options[i].style.cursor = 'not-allowed'; // Disable pointer cursor
                    options[i].style.pointerEvents = 'none'; // Disable pointer events
                }
            }
        } else {
            flag = 2; // Incorrect answer
            event.target.style.backgroundColor = "#b70303"; // Change the background color to red for incorrect answer
            console.log(flag);

            // Disable further interaction with options and highlight the correct answer
            for(let i = 0; i < options.length; i++) {
                if(flag == 2) {
                    options[i].style.pointerEvents = 'none'; // Disable pointer events
                    options[i].style.cursor = 'not-allowed'; // Disable pointer cursor
                }

                // Highlight the correct option in green when the answer is incorrect
                if((questionIndex == 1 && options[i].innerText == "London" && flag == 2) ||
                   (questionIndex == 2 && options[i].innerText == "Jupiter" && flag == 2) ||
                   (questionIndex == 3 && options[i].innerText == "William Shakespeare" && flag == 2) ||
                   (questionIndex == 4 && options[i].innerText == "H2O" && flag == 2) ||
                   (questionIndex == 5 && options[i].innerText == "NaCl" && flag == 2) ||
                   (questionIndex == 6 && options[i].innerText == "Mount Everest" && flag == 2) ||
                   (questionIndex == 7 && options[i].innerText == "Hydrogen" && flag == 2) ||
                   (questionIndex == 8 && options[i].innerText == "Tokyo" && flag == 2) ||
                   (questionIndex == 9 && options[i].innerText == "8" && flag == 2) ||
                   (questionIndex == 10 && options[i].innerText == "Leonardo da Vinci" && flag == 2)) {
                    options[i].style.backgroundColor = "green"; // Correct answer in green
                }
            }
        }
    });
}

// Start button click event listener
startBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior of the button click

    // Hide the instruction screen and show the question container
    rule.style.display = 'none';  // Hide the rules and instructions
    questionContainer.style.display = 'block';  // Show the question container

    // Reset quiz variables
    questionIndex = 1; // Start from the first question
    scoreCount = 0; // Reset the score

    // Update the question number and show the first question
    updateQuestionNumber();
    showQuestion(questionIndex);

    // Hide the "Finish" button and show the "Next" button
    finishBtn.style.display = 'none';
    nextBtn.style.display = 'flex';

    // Reset the options for interaction
    for (let i = 0; i < options.length; i++) {
        options[i].style.pointerEvents = 'auto';
        options[i].style.backgroundColor = 'aliceblue';
        options[i].style.cursor = 'pointer';
    }

    // Hide the "Restart" button and exit game message
    restartBtn.style.display = 'none';
    exitGame.style.display = 'none';
});

// Next button click event listener
nextBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior of the button click

    changeQuestion(1); // Change to the next question
    updateQuestionNumber(); // Update the current question number

    flag = 0; // Reset the flag for the next question

    // Hide the "Next" button when the last question is reached and show the "Finish" button
    if (questionIndex < 10) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    }

    // Reset the options for interaction on the next question
    for (let i = 0; i < options.length; i++) {
        if (flag == 0) {
            options[i].style.cursor = 'pointer';
            options[i].style.backgroundColor = "aliceblue";
            options[i].style.pointerEvents = 'auto';
        }
    }

    console.log(scoreCount); // Log the score for debugging
});

// Finish button click event listener
finishBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior of the button click
    showResult(); // Show the result when the user finishes the quiz

    // Hide the question container and display the result
    finishBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    exitQuiz.style.display = 'flex';

    questionContainer.style.display = 'none'; // Hide the question container
    result.style.display = 'flex'; // Show the result container

    exitGame.style.display = 'block'; // Show the exit game option
});

// Exit button click event listener
exitQuiz.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior of the button click

    // Attempt to close the current tab/window
    window.close(); // This may not work depending on browser security settings
});

// Restart button click event listener
restartBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior of the button click
    window.location.reload(); // Reload the page to restart the quiz
});

// Function to show the current question based on question index
function showQuestion(n) {
    let i;

    // Reset question index if it goes beyond the total number of questions
    if (n > questions.length) {
        questionIndex = 1;
    }

    // Reset question index if it goes below 1
    if (n < 1) {
        questionIndex = questions.length;
    }

    // Hide all questions initially
    for (i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    // Display the current question
    questions[questionIndex - 1].style.display = 'block';
}

// Function to change to the next question
function changeQuestion() {
    showQuestion(questionIndex += 1); // Increment question index and show the next question
}

// Function to update the displayed question number
function updateQuestionNumber() {
    currentQuestion.innerHTML = `Question: ${questionIndex}/${questions.length}`; // Show the current question number
}

// Function to show the result after finishing the quiz
function showResult() {
    questionContainer.style.display = 'none'; // Hide the question container
    result.style.display = 'block'; // Show the result container

    // Calculate the score percentage
    let percentage = (scoreCount / 10) * 100;

    // Update the score-result text to show the score percentage
    const scoreResult = document.getElementById('score-result');
    scoreResult.innerHTML = `Your Score: ${percentage}%`;

    // Optionally, update the "Passed/Failed" message based on the score
    const passedMessage = document.getElementById('pass-fail');
    const feedback = document.getElementById('feedback');

    if (percentage >= 60) {
        passedMessage.innerHTML = "Passed!!!"; // Display "Passed" message
        feedback.innerHTML = "CONGRATULATION !!!"; // Display congratulations message
    } else {
        passedMessage.innerHTML = "Failed!!!"; // Display "Failed" message
        passedMessage.style.color = "red"; // Change the color to red
        scoreResult.style.color = "red"; // Change the score color to red
        feedback.innerHTML = "Best Of Luck For Next Time"; // Display feedback message for failure
    }
}
