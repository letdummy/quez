export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    answers: boolean[];
    timeLeft: number;
}