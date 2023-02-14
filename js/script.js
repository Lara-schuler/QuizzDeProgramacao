const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//perguntas

const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "let",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o nome original da linguagem Javascript?",
        "answers": [
            {
                "answer": "Js",
                "correct": false
            },
            {
                "answer": "TypeScript",
                "correct": false
            },
            {
                "answer": "Livescript",
                "correct": true
            },
            {
                "answer": "Java",
                "correct": false
            },
        ]
    },
]

//substituição do quizz para a primeira pergunta
function init() {

    //criar a primeira pergunta
    createQuestion(0);
}

//cria uma pergunta

function createQuestion(i) {

    //limpa a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    //Alterar o texto da pergunta

    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //insere as alternativas

    questions[i].answers.forEach(function(answer, i) {

        //cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //inserir a alternativa na tela

        answersBox.appendChild(answerTemplate);

        //inserir um evento de click no botão

        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });

    });

    //incrementar número da questão
    actualQuestion++;

}

//verificando resposta do usuário
function checkAnswer(btn) {
    //selecionar todos os botões
    const buttons = answersBox.querySelectorAll("button");

    //verifica se a resposta está correta e adciona classes nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");
            //checa se o usuário acertou a pergunta
            if(btn === button) {
                //incremento dos pontos
                points++;
            }

        } else{
            button.classList.add("wrong-answer");
        }

    });

    //exibir a próxima pergunta
    nextQuestion();
    
}

//exibi a próxima pergunta do quizz
function nextQuestion() {

    //timer para o usuário ver as respostas
    setTimeout(function() {

        //verifica se ainda há perguntas

    if(actualQuestion >= questions.length) {
        //apresenta a mensagem de sucesso
        showsuccessMessage();
        return;
    }

    createQuestion(actualQuestion); 

    }, 700);
}

//exibir tela final
function showsuccessMessage() {

    hideOfShowQuizz();

    //trocar dados da tela de sucesso

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    //alterar o número de perguntas corretas

    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

//mostra ou esconde o score
function hideOfShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//Reiniciar o quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOfShowQuizz();
    init();

})

//inicializando o quizz
init();
