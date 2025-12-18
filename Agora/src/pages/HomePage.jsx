
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (meetingId.trim()) {
            navigate(`/meet/${meetingId}`);
        }
    };

    const createMeeting = () => {
        const id = Math.random().toString(36).substring(7);
        navigate(`/meet/${id}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Web RTC</h1>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={createMeeting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold mb-6 transition-colors"
                >
                    New Meeting
                </button>

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-600"></div>
                    <span className="px-4 text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-600"></div>
                </div>

                <form onSubmit={handleJoin} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter Meeting Code"
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        disabled={!meetingId.trim()}
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
