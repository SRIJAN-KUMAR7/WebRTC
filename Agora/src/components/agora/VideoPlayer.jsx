import React, { useEffect, useRef } from 'react';
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers
} from 'agora-rtc-react';

const VideoPlayer = ({ channelName, token, uid }) => {
    // Get App ID from environment
    const APP_ID = import.meta.env.VITE_AGORA_APP_ID || import.meta.env.NEXT_PUBLIC_AGORA_APP_ID;

    // Create tracks
    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { localCameraTrack } = useLocalCameraTrack();

    // Enhanced logging
    useEffect(() => {
        console.log("=== VideoPlayer Debug ===");
        console.log("App ID:", APP_ID);
        console.log("Channel:", channelName);
        console.log("Token:", token ? `${token.substring(0, 20)}...` : "MISSING");
        console.log("UID:", uid);
        console.log("Local Mic Track:", localMicrophoneTrack);
        console.log("Local Camera Track:", localCameraTrack);
    }, [APP_ID, channelName, token, uid, localMicrophoneTrack, localCameraTrack]);

    // Join the channel
    useJoin(
        { appid: APP_ID, channel: channelName, token: token, uid: uid },
        true // ready to join
    );

    // Publish tracks only when both are ready
    useEffect(() => {
        console.log("Publish check - Mic:", localMicrophoneTrack ? "Ready" : "Not Ready", "Camera:", localCameraTrack ? "Ready" : "Not Ready");
    }, [localMicrophoneTrack, localCameraTrack]);

    // Only publish non-null tracks
    const tracksToPublish = [localMicrophoneTrack, localCameraTrack].filter(track => track !== null);
    usePublish(tracksToPublish);

    // Track remote users
    const remoteUsers = useRemoteUsers();

    useEffect(() => {
        console.log("Remote Users Count:", remoteUsers.length);
        remoteUsers.forEach(user => {
            console.log("Remote User:", user.uid, "Has Video:", user.hasVideo, "Has Audio:", user.hasAudio);
        });
    }, [remoteUsers]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full bg-gray-900">
            {/* Local User */}
            <div className="relative rounded-lg overflow-hidden border-2 border-blue-500 bg-gray-800">
                <div className="aspect-video w-full">
                    {localCameraTrack ? (
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            cameraOn={true}
                            micOn={true}
                            videoTrack={localCameraTrack}
                            playVideo={true}
                            playAudio={false}
                        >
                            <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded text-sm text-white">
                                You (Local)
                            </div>
                        </LocalUser>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-4xl mb-2">📹</div>
                                <div>Initializing camera...</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Remote Users */}
            {remoteUsers.map((user) => (
                <div key={user.uid} className="relative rounded-lg overflow-hidden border-2 border-green-500 bg-gray-800">
                    <div className="aspect-video w-full">
                        <RemoteUser
                            user={user}
                            playVideo={true}
                            playAudio={true}
                        >
                            <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded text-sm text-white">
                                User {user.uid}
                            </div>
                        </RemoteUser>
                    </div>
                </div>
            ))}

            {/* Show message if no remote users */}
            {remoteUsers.length === 0 && (
                <div className="relative rounded-lg overflow-hidden border-2 border-gray-600 bg-gray-800">
                    <div className="aspect-video w-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <div className="text-4xl mb-2">👥</div>
                            <div>Waiting for others to join...</div>
                            <div className="text-sm mt-2">Share the meeting link!</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
