import React, { useState, useEffect } from 'react';
import { Question as QuestionType } from '../types';

interface QuestionProps {
    question: QuestionType;
    onAnswer: (correct: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [randomizedAnswers, setRandomizedAnswers] = useState<string[]>([]);

    useEffect(() => {
        // Randomize answers when the question changes
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        setRandomizedAnswers(allAnswers.sort(() => Math.random() - 0.5));
        setSelectedAnswer(''); // Reset selected answer for new question
    }, [question]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAnswer) {
            onAnswer(selectedAnswer === question.correct_answer);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            {randomizedAnswers.map((answer, index) => (
                <div key={index} className="flex items-center">
                    <input
                        type="radio"
                        id={`answer-${index}`}
                        name="answer"
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="mr-2"
                    />
                    <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }}></label>
                </div>
            ))}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={!selectedAnswer}>
                Next
            </button>
        </form>
    );
};

export default Question;