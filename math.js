  var currentQuestion = 0;
        var score = 0;
        var totalQuestions = 10;
        var currentOperation;
        var num1, num2, correctAnswer;
        var grade;
        var level = 1;

        function selectGrade(selectedGrade) {
            grade = selectedGrade;
            document.getElementById('grade-section').style.display = 'none';
            document.getElementById('level-section').style.display = 'block';
            document.querySelector('#level-section h2').innerText = `المستوى ${level}`;
        }

        function startQuiz() {
            currentQuestion = 0;
            score = 0;
            document.getElementById('level-section').style.display = 'none';
            document.getElementById('quiz-content').style.display = 'block';
            document.getElementById('feedback').innerText = '';
            nextQuestion();
        }

        function nextQuestion() {
            if (currentQuestion < totalQuestions) {
                setQuestionParameters();
                document.getElementById('question').innerText = `${num1} ${currentOperation} ${num2} ؟`;
            } else {
                document.getElementById('feedback').innerText = `الاختبار انتهى! نتيجتك: ${score}/${totalQuestions}`;
                document.getElementById('quiz-content').style.display = 'none';
                if (level < 10) {
                    level++;
                    document.querySelector('#level-section h2').innerText = `المستوى ${level}`;
                    document.getElementById('level-section').style.display = 'block';
                } else {
                    document.getElementById('grade-section').style.display = 'block';
                }
            }
        }

        function setQuestionParameters() {
            switch (grade) {
                case 1:
                    currentOperation = '+';
                    break;
                case 2:
                    currentOperation = '-';
                    break;
                case 3:
                    currentOperation = ['+', '-'][Math.floor(Math.random() * 2)];
                    break;
                case 4:
                    currentOperation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                    currentOperation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                    break;
            }
            num1 = Math.floor(Math.random() * (level * 10)) + 1;
            num2 = Math.floor(Math.random() * (level * 10)) + 1;
            if (currentOperation === '/') {
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * (level * 10)) + 1;
                }
            }
            calculateCorrectAnswer();
        }

        function calculateCorrectAnswer() {
            switch (currentOperation) {
                case '+':
                    correctAnswer = num1 + num2;
                    break;
                case '-':
                    correctAnswer = num1 - num2;
                    break;
                case '*':
                    correctAnswer = num1 * num2;
                    break;
                case '/':
                    correctAnswer = (num1 / num2).toFixed(2);
                    break;
            }
        }

        function submitAnswer() {
            var userAnswer = parseFloat(document.getElementById('answer').value);
            var feedbackElement = document.getElementById('feedback');
            if (userAnswer === parseFloat(correctAnswer)) {
                score++;
                feedbackElement.innerText = 'إجابة صحيحة!';
                feedbackElement.style.color = '#28a745'; // اللون الأخضر
            } else {
                feedbackElement.innerText = `إجابة خاطئة. الإجابة الصحيحة هي ${correctAnswer}`;
                feedbackElement.style.color = '#d9534f'; // اللون الأحمر
            }
            currentQuestion++;
            document.getElementById('score').innerText = `النتيجة: ${score}/${currentQuestion}`;
            document.getElementById('answer').value = '';
            nextQuestion();
        }
