import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.response_code === 0 && Array.isArray(data.results)) {
            return NextResponse.json(data);
        } else {
            throw new Error('Invalid response from Open Trivia Database');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
    }
}