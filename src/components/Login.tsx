"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        // Clear any existing quiz state when the login page loads
        localStorage.clear();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('username', username);
            router.push('/quiz');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-black">Login</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full p-2 mb-4 border rounded text-black"
                    required
                />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

export default Login;