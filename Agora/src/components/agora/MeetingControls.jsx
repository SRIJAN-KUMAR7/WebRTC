
import React, { useState, useEffect, useRef } from 'react';
import { useLocalMicrophoneTrack, useLocalCameraTrack } from 'agora-rtc-react';
import { useNavigate } from 'react-router-dom';

const MeetingControls = () => {
    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { localCameraTrack } = useLocalCameraTrack();
    const navigate = useNavigate();

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [transcript, setTranscript] = useState('');

    // Speech Recognition Ref
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }

                if (finalTranscript) {
                    console.log('Final Transcript Chunk:', finalTranscript);
                    setTranscript(prev => prev + ' ' + finalTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
            };

            // Start recognition automatically
            recognitionRef.current.start();
        } else {
            console.warn("Web Speech API not supported in this browser.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const toggleMic = async () => {
        if (localMicrophoneTrack) {
            await localMicrophoneTrack.setMuted(!micOn);
            setMicOn(!micOn);
        }
    };

    const toggleCamera = async () => {
        if (localCameraTrack) {
            await localCameraTrack.setMuted(!cameraOn);
            setCameraOn(!cameraOn);
        }
    };

    const leaveCall = async () => {
        // Stop recording/transcription
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        // Trigger MOM generation
        try {
            console.log("Generating MOM for transcript...");
            const response = await fetch('http://localhost:3001/api/ai/mom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript }),
            });
            const data = await response.json();
            console.log("MOM Summary:", data.summary);
            alert("Meeting Ended. check console for MOM summary (simulated implementation).");
        } catch (e) {
            console.error("Error generating MOM:", e);
        }

        navigate('/'); // Go back to home
        window.location.reload(); // Force reload to clear Agora state effectively
    };

    return (
        <div className="h-16 bg-gray-800 border-t border-gray-700 flex items-center justify-center gap-4 px-4">
            <button
                onClick={toggleMic}
                className={`p-3 rounded-full ${micOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}
            >
                {micOn ? 'Mic On' : 'Mic Off'}
            </button>

            <button
                onClick={toggleCamera}
                className={`p-3 rounded-full ${cameraOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}
            >
                {cameraOn ? 'Camera On' : 'Camera Off'}
            </button>

            <button
                onClick={leaveCall}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors font-semibold px-6"
            >
                End Call & Gen MOM
            </button>
        </div>
    );
};

export default MeetingControls;
