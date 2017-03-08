(function() {

    var questions = [{
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0
    }, {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        choices: ["At the end of the document", "In the <head> section", "In the <body> section"],
        correctAnswer: 1
    }, {

        question: "Which HTML tag is used to define an internal style sheet?",
        choices: ["script", "css", "style"],
        correctAnswer: 2
    }, {
        question: "Which HTML attribute is used to define inline styles?",
        choices: ["class", "styles", "style", "font"],
        correctAnswer: 2
    }, {
        question: "Which property is used to change the background color?",
        choices: ["bgcolor", "background-color", "color"],
        correctAnswer: 1
    },

    {
        question: "Which CSS property is used to change the text color of an element?",
        choices: ["fgcolor", "color", "text-color"],
        correctAnswer: 2
    },

    {
        question: "Which CSS property controls the text size?",
        choices: ["font-size", "text-style", "text-size","font-style"],
        correctAnswer: 0
    },

    {
        question: "How do you make each word in a text start with a capital letter?",
        choices: ["text-transform:capitalize", "You can't do that with CSS", "text-transform:uppercase"],
        correctAnswer: 2
    },

    {
        question: "Which property is used to change the font of an element?",
        choices: ["font-family", "font", "Both font-family and font can be used"],
        correctAnswer: 0
    },

    {
        question: "Which property is used to change the left margin of an element?",
        choices: ["margin-left", "indent", "padding-left"],
        correctAnswer: 0
    }];



    var questionCounter = 0;
    var selections = [];
    var quiz = $('#quiz');


    // initial questions display
    questionDisplay();

    // Next button for click Handler
    $('#next').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }

        choose();

        if (isNaN(selections[questionCounter])) {
            alert('Please selecet your desire Answer');

        } else {
            questionCounter++;
            questionDisplay();
        }

    });


    // previous Button for click Handler
    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }

        choose();
        questionCounter--;
        questionDisplay();

    });


    // startover button click handler
    $('#start').on('click', function(e) {

        e.preventDefault();


        if (quiz.is(':animated')) {
            return false;
        }

        questionCounter = 0;
        selections = [];
        questionDisplay();
        $('#start').hide();

        $('.timer').show();

    });




    $("#slideNavigation a").click(function() {
      clearInterval(int);
      setTimeout(function() {
        setInterval($.fn.nextSlide, 3000);
      }, 10000);
    });
    // create question list with dom element
    function createQuestionElement(index) {

        var questionSelector = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        questionSelector.append(header);

        var question = $('<p>').append(questions[index].question);
        questionSelector.append(question);

        var radioButtons = createRadios(index);
        questionSelector.append(radioButtons);

        return questionSelector;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {

        var radiolist = $('<ul>');
        var item;
        var input = '';

        for (var i = 0; i < questions[index].choices.length; i++) {

            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radiolist.append(item);
        }

        return radiolist;
    }




    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // display question list
    function questionDisplay() {

        // Full question FadeIn
        quiz.fadeOut(function() {
            $('#question').remove();


            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();

                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();

                } else if (questionCounter === 0) {
                    $('#prev').hide();
                    $('#next').show();

                }

            } else {
                var scoreElem = displayfinalScore();

                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('.timer').hide();
                $('#start').show();
            }

        });
    }

    // quiz timing function
    function getClocktime(totalSeconds) {
        function prettyClock(num) {
            return (num < 10 ? "0" : "") + num;
        }

        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;

        var minutes = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;

        var seconds = Math.floor(totalSeconds);

        // Pad the minutes and seconds with leading zeros, if required
        hours = prettyClock(hours);
        minutes = prettyClock(minutes);
        seconds = prettyClock(seconds);

        // Compose the string for display
        var currentTimeString = "Time spent:" + hours + ":" + minutes + ":" + seconds;

        return currentTimeString;
    }

    var timeInseconds = 0;

    setInterval(function() {
        timeInseconds = timeInseconds + 1;
        $('.timer').text(getClocktime(timeInseconds));
    }, 100);



    function displayfinalScore() {
        var score = $('<p>', {
            id: 'question'
        });

        var scoreCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                scoreCorrect++;
            }
        }
        score.append(' You Answerd ' + scoreCorrect + ' questions out of ' + questions.length);
        return score;


    }


})();
