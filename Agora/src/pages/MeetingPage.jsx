
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoRoom from '../components/agora/VideoRoom';

const MeetingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // In a real app, uid would be from auth. Random for now.
    const [uid] = useState(Math.floor(Math.random() * 10000));//justt for test 

    if (!id) {
        return <div className="text-white">Invalid Meeting ID</div>;
    }

    return (
        <div className="h-screen w-screen bg-black">
            <div className="absolute top-4 left-4 z-10 text-white bg-black/50 px-3 py-1 rounded">
                <span className="text-gray-400">Meeting ID:</span> {id}
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied!');
                    }}
                    className="ml-2 text-blue-400 text-sm hover:underline"
                >
                    Copy Link
                </button>
            </div>
            <VideoRoom channelName={id} uid={uid} />
        </div>
    );
};

export default MeetingPage;
