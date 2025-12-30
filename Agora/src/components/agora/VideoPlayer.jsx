import React, { useEffect } from 'react';
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
    useIsConnected
} from 'agora-rtc-react';

const VideoPlayer = ({ channelName, token, uid }) => {
    // Get App ID from environment
    const APP_ID = import.meta.env.VITE_AGORA_APP_ID || import.meta.env.NEXT_PUBLIC_AGORA_APP_ID;
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

    const isConnected = useIsConnected();//connected?


    useJoin(
        { appid: APP_ID, channel: channelName, token: token, uid: uid },
        true
    );

    // Publish tracks when ready
    usePublish([localMicrophoneTrack, localCameraTrack]);

    // Get remote users
    const remoteUsers = useRemoteUsers();

    // Debug logging
    useEffect(() => {
        console.log("=== VideoPlayer Status ===");
        console.log("Connected:", isConnected);
        console.log("Mic Loading:", isLoadingMic, "Track:", localMicrophoneTrack);
        console.log("Cam Loading:", isLoadingCam, "Track:", localCameraTrack);
        console.log("Remote Users:", remoteUsers.length);
    }, [isConnected, isLoadingMic, isLoadingCam, localMicrophoneTrack, localCameraTrack, remoteUsers]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full bg-gray-900">
            {/* Local User */}
            <div className="relative rounded-lg overflow-hidden border-2 border-blue-500 bg-gray-800">
                <div className="aspect-video w-full">
                    <LocalUser
                        audioTrack={localMicrophoneTrack}
                        videoTrack={localCameraTrack}
                        cameraOn={true}
                        micOn={false}
                    >
                        <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded text-sm text-white z-10">
                            You (Local)
                        </div>
                    </LocalUser>
                </div>
            </div>

            {/* Remote Users */}
            {remoteUsers.map((user) => (
                <div key={user.uid} className="relative rounded-lg overflow-hidden border-2 border-green-500 bg-gray-800">
                    <div className="aspect-video w-full">
                        <RemoteUser
                            user={user}
                        >
                            <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded text-sm text-white">
                                User {user.uid}
                            </div>
                        </RemoteUser>
                    </div>
                </div>
            ))}

            {/* Waiting message */}
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
