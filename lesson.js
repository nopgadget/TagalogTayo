class Lesson {
    constructor() {
        this.questions = [
            {
                id: 1,
                question: "How do you say 'Good morning' in Tagalog?",
                options: ["Magandang umaga", "Magandang hapon", "Magandang gabi", "Magandang araw"],
                correctAnswer: "Magandang umaga",
                explanation: "'Magandang umaga' is the correct way to say 'Good morning' in Tagalog."
            },
            {
                id: 2,
                question: "What does 'Kumusta ka?' mean?",
                options: ["Good morning", "How are you?", "Thank you", "Goodbye"],
                correctAnswer: "How are you?",
                explanation: "'Kumusta ka?' is the Tagalog way of asking 'How are you?'"
            },
            {
                id: 3,
                question: "How do you say 'Thank you' in Tagalog?",
                options: ["Paalam", "Salamat", "Oo", "Hindi"],
                correctAnswer: "Salamat",
                explanation: "'Salamat' is the Tagalog word for 'Thank you'."
            },
            {
                id: 4,
                question: "What is the response to 'Kumusta ka?'?",
                options: ["Mabuti", "Salamat", "Oo", "Hindi"],
                correctAnswer: "Mabuti",
                explanation: "'Mabuti' means 'I'm good' and is a common response to 'Kumusta ka?'"
            },
            {
                id: 5,
                question: "How do you say 'Good afternoon' in Tagalog?",
                options: ["Magandang umaga", "Magandang hapon", "Magandang gabi", "Magandang araw"],
                correctAnswer: "Magandang hapon",
                explanation: "'Magandang hapon' is the correct way to say 'Good afternoon' in Tagalog."
            },
            {
                id: 6,
                question: "What does 'Oo' mean?",
                options: ["No", "Yes", "Maybe", "Thank you"],
                correctAnswer: "Yes",
                explanation: "'Oo' is the Tagalog word for 'Yes'."
            },
            {
                id: 7,
                question: "How do you say 'Good evening' in Tagalog?",
                options: ["Magandang umaga", "Magandang hapon", "Magandang gabi", "Magandang araw"],
                correctAnswer: "Magandang gabi",
                explanation: "'Magandang gabi' is the correct way to say 'Good evening' in Tagalog."
            }
        ];
        this.state = {
            currentQuestionIndex: 0,
            score: 0,
            incorrectQuestions: [],
            isComplete: false,
            showExplanation: false
        };
        this.initializeElements();
        this.renderQuestion();
        this.updateProgress();
        // Add Escape key support
        this.handleEscape = this.handleEscape.bind(this);
        document.addEventListener('keydown', this.handleEscape);
    }
    initializeElements() {
        // Create lesson container
        this.lessonContainer = document.createElement('div');
        this.lessonContainer.className = 'fixed inset-0 bg-white z-50 overflow-y-auto';
        // Create header
        const header = document.createElement('div');
        header.className = 'bg-blue-600 text-white p-4 flex justify-between items-center';
        header.innerHTML = `
            <h2 class="text-xl font-bold">Basic Greetings</h2>
            <button id="closeLesson" class="text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        `;
        // Create progress bar
        this.progressElement = document.createElement('div');
        this.progressElement.className = 'w-full bg-gray-200 h-2';
        // Create question container
        this.questionElement = document.createElement('div');
        this.questionElement.className = 'p-6 text-xl font-bold text-gray-800';
        // Create options container
        this.optionsContainer = document.createElement('div');
        this.optionsContainer.className = 'p-6 space-y-4';
        // Create explanation container
        this.explanationElement = document.createElement('div');
        this.explanationElement.className = 'p-6 bg-gray-50 hidden';
        // Create score display
        this.scoreElement = document.createElement('div');
        this.scoreElement.className = 'p-4 text-center text-gray-600';
        // Append all elements
        this.lessonContainer.appendChild(header);
        this.lessonContainer.appendChild(this.progressElement);
        this.lessonContainer.appendChild(this.questionElement);
        this.lessonContainer.appendChild(this.optionsContainer);
        this.lessonContainer.appendChild(this.explanationElement);
        this.lessonContainer.appendChild(this.scoreElement);
        // Add close button functionality
        const closeButton = header.querySelector('#closeLesson');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeLesson());
        }
        // Add to body
        document.body.appendChild(this.lessonContainer);
    }
    renderQuestion() {
        const currentQuestion = this.questions[this.state.currentQuestionIndex];
        // Update question text
        this.questionElement.textContent = currentQuestion.question;
        // Clear and update options
        this.optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors';
            button.textContent = option;
            button.addEventListener('click', () => this.handleAnswer(option));
            this.optionsContainer.appendChild(button);
        });
        // Hide explanation
        this.explanationElement.classList.add('hidden');
    }
    handleAnswer(selectedAnswer) {
        const currentQuestion = this.questions[this.state.currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        // Disable all options
        const options = this.optionsContainer.querySelectorAll('button');
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('bg-green-100', 'border-green-500');
            }
            else if (option.textContent === selectedAnswer && !isCorrect) {
                option.classList.add('bg-red-100', 'border-red-500');
            }
        });
        if (isCorrect) {
            this.state.score++;
        }
        else {
            this.state.incorrectQuestions.push(currentQuestion);
        }
        // Show explanation
        this.explanationElement.classList.remove('hidden');
        this.explanationElement.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow">
                <p class="text-gray-800">${currentQuestion.explanation}</p>
                <button class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    Next Question
                </button>
            </div>
        `;
        // Add next button functionality
        const nextButton = this.explanationElement.querySelector('button');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextQuestion());
        }
        this.updateProgress();
    }
    nextQuestion() {
        this.state.currentQuestionIndex++;
        if (this.state.currentQuestionIndex >= this.questions.length) {
            if (this.state.incorrectQuestions.length > 0) {
                // Add incorrect questions to the end
                this.questions = [...this.questions, ...this.state.incorrectQuestions];
                this.state.incorrectQuestions = [];
                this.renderQuestion();
            }
            else {
                this.completeLesson();
            }
        }
        else {
            this.renderQuestion();
        }
    }
    completeLesson() {
        this.state.isComplete = true;
        this.lessonContainer.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gray-50">
                <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-check text-green-600 text-3xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
                        <p class="text-gray-600 mb-6">You scored ${this.state.score} out of ${this.questions.length}</p>
                        <button id="closeLesson" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        const closeButton = this.lessonContainer.querySelector('#closeLesson');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeLesson());
        }
    }
    updateProgress() {
        const progress = ((this.state.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressElement.innerHTML = `
            <div class="h-full bg-blue-600 transition-all duration-300" style="width: ${progress}%"></div>
        `;
        this.scoreElement.textContent = `Score: ${this.state.score}/${this.state.currentQuestionIndex + 1}`;
    }
    handleEscape(event) {
        if (event.key === 'Escape') {
            this.closeLesson();
        }
    }
    closeLesson() {
        this.lessonContainer.remove();
        document.removeEventListener('keydown', this.handleEscape);
    }
}
// Export the Lesson class
export default Lesson;
