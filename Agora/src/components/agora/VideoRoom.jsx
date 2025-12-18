
import React, { useState, useEffect } from 'react';
import { AgoraRTCProvider } from 'agora-rtc-react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoPlayer from './VideoPlayer';
import MeetingControls from './MeetingControls';

const VideoRoom = ({ channelName, uid }) => {
    const [client] = useState(() => AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' }));

    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/agora/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ channelName, uid }),
                });
                const data = await response.json();
                console.log("VideoRoom: Token received", data.token);
                setToken(data.token);
            } catch (error) {
                console.error('VideoRoom: Failed to fetch token:', error);
            }
        };

        if (channelName) {
            console.log("VideoRoom: Fetching token for channel", channelName);
            fetchToken();
        }
    }, [channelName, uid]);




    if (!token) {
        return <div className="flex items-center justify-center h-screen">n...</div>;
    }

    return (
        <AgoraRTCProvider client={client}>
            <div className="flex flex-col h-screen bg-gray-900 text-white">
                <div className="flex-1 overflow-hidden relative">
                    <VideoPlayer channelName={channelName} token={token} uid={uid} />
                </div>
                <MeetingControls />
            </div>
        </AgoraRTCProvider>
    );
};

export default VideoRoom;
