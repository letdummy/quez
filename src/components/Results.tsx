import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '../types';

interface ResultsProps {
    answers: boolean[];
    questions: Question[];
}

const Results: React.FC<ResultsProps> = ({ answers, questions }) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const correctAnswers = answers.filter(Boolean).length;
    const incorrectAnswers = answers.length - correctAnswers;
    const unanswered = questions.length - answers.length;

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleRetry = () => {
        localStorage.removeItem("quizState");
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Quiz Results for {username}</h2>
            <div className="space-y-2">
                <p>Correct answers: {correctAnswers}</p>
                <p>Incorrect answers: {incorrectAnswers}</p>
                <p>Unanswered questions: {unanswered}</p>
            </div>
            <div className="mt-4 space-x-4">
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Results;
