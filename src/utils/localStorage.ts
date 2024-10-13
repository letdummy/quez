import { QuizState } from '../types';

export const saveQuizState = (state: QuizState): void => {
    localStorage.setItem('quizState', JSON.stringify(state));
};

export const loadQuizState = (): QuizState | null => {
    const state = localStorage.getItem('quizState');
    return state ? JSON.parse(state) : null;
};