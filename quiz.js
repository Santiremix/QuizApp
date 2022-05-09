const question = document.getElementById('question');
const options = document.querySelector('.quiz-options');
const checkBtn = document.getElementById('check-answer');
const playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _currentScore = document.getElementById('current-question');
const _totalQuestion = document.getElementById('total-question');
const restartBtn = document.getElementById('restart');

const showScore = document.getElementById('show-score');

const end = document.querySelector('.end');

const headDiv = document.querySelector('.quiz-head');

const bodyDiv = document.querySelector('.quiz-body');

const footDiv = document.querySelector('.quiz-foot');

let correctAnswer = '';
let currentScore = 0;
let askedCount = 0;
let totalQuestion = 10;
let contador = 1;
let incorrectAnswers = '';

async function loadQuestion() {
  const APIUrl =
    'https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple';
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  // console.log(APIUrl);
  // console.log(result);
  console.log(data);
  _result.innerHTML = '';
  end.style.display = 'none';
  showQuestion(data.results[0]);
}

// Event listeners
function eventListeners() {
  restartBtn.addEventListener('click', restartQuiz);
  checkBtn.addEventListener('click', checkAnswer);
  playAgainBtn.addEventListener('click', restartQuiz);
  showScore.addEventListener('click', showResults);
}
document.addEventListener('DOMContentLoaded', function () {
  loadQuestion();
  eventListeners();
  _totalQuestion.textContent = totalQuestion;
  _currentScore.textContent = currentScore;
});

//LOAD QUESTIONS API*********

// async function loadQuestions() {
//   const API_URL = 'https://opentdb.com/api.php?amount=10';
// }

// function showQuestions(res) {
//   correctAnswer = res.data.results.correct_answer;
//   console.log(correctAnswer);
// }

function showQuestion(data) {
  correctAnswer = data.correct_answer;
  //console.log(correctAnswer);
  incorrectAnswers = data.incorrect_answers;
  console.log(incorrectAnswers);
  let optionList = incorrectAnswers;
  optionList.splice(
    Math.floor(Math.random() * (incorrectAnswers.length + 1)),
    0,
    correctAnswer
  );
  question.innerHTML = `${data.question}<br><span class="category">${data.category}</span>`;
  options.innerHTML = `${optionList
    .map((option, index) => `<li> ${index + 1}. <span>${option}</span> </li>`)
    .join('')}`;
  selectOption();
  //JOIN en este caso nos quita las comas de la array porque estamos usando un LI en lugar de botones
}

//*********FUNCTION SELECT OPTION **********

// function select() {
//   options.querySelectorAll('li').forEach((option) => {
//     option.addEventListener('click', selectOne());
//   });
// }

/********FUNCTION OPTION SELECTED **********/
// function selectOne() {
//   if (options.querySelector('.selected')) {
//     const activeOption = options.querySelector('.selected');
//     activeOption.classList.remove('selected');
//   } else {
//     console.log(options.classList.add('selected'));
//   }
// }

function selectOption() {
  options.querySelectorAll('li').forEach(function (option) {
    option.addEventListener('click', function () {
      if (options.querySelector('.selected')) {
        const activeOption = options.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
    });
  });
}

/*************FUNCTION CHECKANSWER**********/
function checkAnswer() {
  // _checkBtn.disabled = true;
  if (options.querySelector('.selected')) {
    let selectedAnswer = options.querySelector('.selected span').innerHTML;
    if (selectedAnswer == correctAnswer) {
      localStorage.setItem('aciertos', contador++);
      currentScore++;
      _result.innerHTML = `<p>Correct Answer!</p>`;
    } else {
      _result.innerHTML = `<p>Incorrect Answer!</p>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p>Please select an option!</p>`;
    // _checkBtn.disabled = false;
  }
}

/************************************************/

function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == totalQuestion) {
    restartBtn.style.display = 'none';
    playAgainBtn.style.display = 'block';
    showScore.style.display = 'block';
    checkBtn.style.display = 'none';
  } else {
    setTimeout(function () {
      loadQuestion();
    }, 0); //Cambiar//
  }
}

/*********RESTART****************/
function restartQuiz() {
  contador = 1;
  localStorage.clear();
  currentScore = askedCount = 0;
  checkBtn.style.display = 'block';
  playAgainBtn.style.display = 'none';
  restartBtn.style.display = 'none'
  showScore.style.display = 'none';
  // _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}
/**************************/
function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _currentScore.textContent = currentScore;
}

/******************************/
function showResults() {
  end.style.display = 'flex';
  restartBtn.style.display = 'block'
  headDiv.style.display = 'none';
  bodyDiv.style.display = 'none';
  footDiv.style.display = 'none';
}
