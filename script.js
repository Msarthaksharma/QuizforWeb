var currentQuestion = 0;
var score = 0;

var questions = document.getElementsByClassName('question');
var startButton = document.getElementById('start-btn');
var qzw = document.getElementById('qzw');
var nextButton = document.getElementById('next-btn');
var resultDiv = document.getElementById('result');
var scoreDiv = document.getElementById('score');
function showQuestion(index) {
	qzw.style.display='none';
    for (var i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }
    questions[index].style.display = 'block';

    if (index === questions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}

function showResult() {
    resultDiv.innerHTML = 'Your Score: ' + score + ' out of ' + questions.length;
}

function updateScore() {
    scoreDiv.innerHTML = 'Score: ' + score;
}

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="q' + (currentQuestion + 1) + '"]:checked');

    if (selectedOption) {
        var isCorrect = false;
        var selectedValue = selectedOption.value;
        var correctAnswers = ['52', '48', 'Five', 'East', 'Cheetah'];

        if (correctAnswers.includes(selectedValue)) {
            score++;
            resultDiv.innerHTML = 'Correct!';
            resultDiv.classList.remove('incorrect');
            resultDiv.classList.add('correct');
            isCorrect = true;
        } else {
            resultDiv.innerHTML = 'Incorrect!';
            resultDiv.classList.remove('correct');
            resultDiv.classList.add('incorrect');
        }

        updateScore();
        nextButton.style.display = 'block';

        var options = questions[currentQuestion].querySelectorAll('.options label');
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove('correct-answer', 'incorrect-answer');
            var input = options[i].querySelector('input');
            if (correctAnswers.includes(input.value)) {
                options[i].classList.add('correct-answer');
            } else if (isCorrect && input.checked) {
                options[i].classList.add('incorrect-answer');
            }
            input.disabled = true;
        }
    } else {
        alert('Please select an answer!');
    }
}




startButton.addEventListener('click', function() {
    showQuestion(currentQuestion);
    startButton.style.display = 'none';
    nextButton.style.display = 'block';
});

nextButton.addEventListener('click', function() {
    if (currentQuestion < questions.length - 1) {
        checkAnswer();
        if (resultDiv.innerHTML !== '') {
            currentQuestion++;
            showQuestion(currentQuestion);
            resultDiv.innerHTML = '';
            updateScore();
        }
    } else {
        checkAnswer();
        if (resultDiv.innerHTML !== '') {
            showResult();
            nextButton.style.display = 'none';
        }
    }
});

updateScore();
