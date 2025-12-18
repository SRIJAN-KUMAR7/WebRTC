import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const CameraTest = () => {
    const [videoTrack, setVideoTrack] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('Initializing...');

    useEffect(() => {
        const initCamera = async () => {
            try {
                setStatus('Requesting camera permission...');
                console.log('Creating camera track...');

                const track = await AgoraRTC.createCameraVideoTrack();
                console.log('Camera track created:', track);

                setVideoTrack(track);
                setStatus('Camera ready!');

                // Play the video
                track.play('local-video');
            } catch (err) {
                console.error('Camera error:', err);
                setError(err.message);
                setStatus('Error: ' + err.message);
            }
        };

        initCamera();

        return () => {
            if (videoTrack) {
                videoTrack.close();
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-4">Camera Test</h1>
            <p className="mb-4">Status: {status}</p>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div
                id="local-video"
                className="w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-blue-500"
            />

            <div className="mt-4 text-sm text-gray-400">
                <p>If you see yourself above, the camera is working!</p>
                <p>If not, check browser console (F12) for errors.</p>
            </div>
        </div>
    );
};

export default CameraTest;
