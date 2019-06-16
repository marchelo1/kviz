const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Sveto drvo kod Srba je",
    answers: [
      { text: "Breza", correct: false },
      { text: "Lipa", correct: false },
      { text: "Bor", correct: false },
      { text: "Hrast", correct: true }
    ]
  },
  {
    question: "Kako se zove Boginja noći, zime i smrti kod Srba?",
    answers: [
      { text: "Vesna", correct: false },
      { text: "Morana", correct: true }
    ]
  },
  {
    question: "Koja životinja je simbol noći kod Srba?",
    answers: [
      { text: "Medved", correct: false },
      { text: "Konj", correct: true }
    ]
  },
  {
    question: "Sva moć Vile leži u njenoj?",
    answers: [
      { text: "Haljini", correct: false },
      { text: "Kosi", correct: true },
      { text: "Pesmi", correct: false },
      { text: "Noktima", correct: false }
    ]
  },
  {
    question: "Nečista mesta u verovanju kod Srba?",
    answers: [
      { text: "Mostovi i Raskršća", correct: true },
      { text: "Centralni deo Kuće i Krov", correct: false }
    ]
  },
  {
    question: "Vukodlak je spoj čoveka i?",
    answers: [{ text: "Psa", correct: false }, { text: "Vuka", correct: true }]
  },
  {
    question: "Kom Bogu je bio posvećen hram na Arkoni",
    answers: [
      { text: "Svetovidu", correct: true },
      { text: "Perunu", correct: false },
      { text: "Jarilu", correct: false },
      { text: "Dažbogu", correct: false }
    ]
  },
  {
    question: "Raskovnik je trava magične moći koja može da?",
    answers: [
      { text: "Umiri i zaštiti od prehlade", correct: false },
      {
        text: "Otvori sva vrata",
        correct: true
      }
    ]
  }
];
