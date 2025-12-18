import React, { useEffect, useRef } from 'react';

const LocalVideoDisplay = ({ track }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (track && videoRef.current) {
            console.log("🎥 Playing local video track:", track._ID);

            // Play the track directly on the video element
            track.play(videoRef.current, { fit: 'cover' });

            return () => {
                console.log("🛑 Stopping local video track");
                track.stop();
            };
        } else {
            console.log("⚠️ Track or ref not ready:", { track: !!track, ref: !!videoRef.current });
        }
    }, [track]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover bg-black"
            style={{ transform: 'scaleX(-1)' }}
        />
    );
};

export default LocalVideoDisplay;
