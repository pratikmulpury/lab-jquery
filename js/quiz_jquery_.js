/*
 * Simple quiz generator.
 *
 * @author Pratik Mulpury and Christine Wang
 */

// the possible questions in the quiz

$(function(){

    var questions = [
        
        {
            "question": 'Who is the quarterbacker of the 49ers??',
            "choices": ["Colin Kaepernick", "Alex Smith", "Trent Dilfer", "Jimmy GQ", "Shaun Hill"],
            "correctAnswer": 4
        },
        {
            "question": 'How Many wins will the 49ers have next year? ',
            "choices:" [3, 6, 9, 12, 21],
            "correctAnswer:" 21
        },
        {
            "question:" 'Who did the niners draft last year?',
            choices: ["Aldon Smith", "Reuben Foster", "Eli Harold", "Jimmie Ward", "Carlos Hyde"],
            correctAnswer: 2
        },
        {
            question: 'How many Superbowls have the 49ers won?',
            choices: [5, 1, 2, 3, 8],
            correctAnswer: 5
        },
        {
            question: 'What is 8*8?',
            choices: [20, 30, 40, 50, 64],
            correctAnswer: 4
        }
    ];
    var quiz = document.getElementById('quiz');
    var questionsCompleted = 0;
    
    
    // returns a random element from a given list
    function randomElement(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    
    // return question data user is working on now
    function currentQuestion () {
        return questions[questionsCompleted];
    }
    
    // returns user's selected answer
    function getChoice() {
        var element = document.querySelector('input[name="answer"]:checked');
        if (element === null) {
            return -1;
        } else {
            return parseInt(element.value, 10);
        }
    }
    
    // returns list of the answer choices as radio inputs
    function createRadios(questionData) {
        var radioList = document.createElement('ul');
        questionData.choices.forEach(function (text, index) {
            var item = document.createElement('li');
            item.innerHTML = '<input type="radio" name="answer" value=' + index + ' />' + text;
            radioList.append(item);
        });
        return radioList;
    }
    
    // create div that contains question and the possible answers
    function createQuestionElement(questionData) {
        var qElement = document.createElement('div');
        var question = document.createElement('p');
        question.innerHTML = questionData.question;
        qElement.appendChild(question);
        qElement.appendChild(createRadios(questionData));
        qElement.id = 'question';
        return qElement;
    }
    
    // displays current question
    function displayQuestion() {
        quiz.appendChild(createQuestionElement(currentQuestion()));
    }
    
    // check if user's response is correct or not
    function checkResponse() {
        var choice = getChoice();
        if (choice < 0) {
            alert('Please make a selection!');
        } else if (choice === currentQuestion().correctAnswer) {
            alert('Correct!');
        } else {
            alert('Sorry, try again!');
        }
        return false;
    }
    
    // moves to next question by removing the current one
    function nextQuestion() {
        questionsCompleted += 1;
        quiz.removeChild(quiz.children[0]);
        if (questionsCompleted === questions.length) {
            quiz.innerHTML = '<h2>You completed the quiz!<h2>';
            document.getElementById('submit').removeEventListener('click', checkResponse, false);
            document.getElementById('next').removeEventListener('click', nextQuestion, false);
        }
        else {
            displayQuestion();
        }
    }
    
    
    // add interactivity to HTML elements
    document.getElementById('submit').addEventListener('click', checkResponse, false);
    document.getElementById('next').addEventListener('click', nextQuestion, false);
    
    // display initial question
    displayQuestion();
      
  });