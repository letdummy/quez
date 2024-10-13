"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Question from './Question';
import Timer from './Timer';
import Results from './Results';
import { saveQuizState, loadQuizState } from '../utils/localStorage';
import { Question as QuestionType, QuizState } from '../types';

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('/api/question');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log("API Response:", data);
                if (data.results && Array.isArray(data.results)) {
                    setQuestions(data.results);
                    // Reset other state variables
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                    setTimeLeft(60);
                    setQuizFinished(false);
                } else {
                    throw new Error("Invalid data structure received from API");
                }
            } catch (err) {
                console.error("Error fetching questions:", err);
                setError("Failed to load questions. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        const savedState = loadQuizState();
        if (savedState && savedState.questions.length > 0) {
            setQuestions(savedState.questions);
            setCurrentQuestionIndex(savedState.currentQuestionIndex);
            setAnswers(savedState.answers);
            setTimeLeft(savedState.timeLeft);
            setIsLoading(false);
        } else {
            fetchQuestions();
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('username')) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setQuizFinished(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const state: QuizState = { questions, currentQuestionIndex, answers, timeLeft };
            saveQuizState(state);
        }
    }, [questions, currentQuestionIndex, answers, timeLeft]);

    const handleAnswer = (answer: boolean) => {
        setAnswers([...answers, answer]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (isLoading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (quizFinished) {
        return <Results answers={answers} questions={questions} />;
    }

    if (questions.length === 0) {
        return <div>No questions available. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Timer timeLeft={timeLeft} />
            <div className="mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <Question
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
            />
        </div>
    );
};

export default Quiz;