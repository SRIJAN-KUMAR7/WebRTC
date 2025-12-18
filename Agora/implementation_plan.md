# Goal: Agora Video Calling & AI Minutes of Meeting (MOM)

This plan outlines the integration of real-time video calling using Agora and automatic Minutes of Meeting generation using AI, adapted for a **Vite + Express** architecture.

## User Review Required
> [!IMPORTANT]
> **Agora Credentials**: You will need an Agora Account. Please provide `VITE_AGORA_APP_ID` and `AGORA_APP_CERTIFICATE` in your `.env` file.
>
> **Architecture Adapation**: Since the project is using Vite, we will add a lightweight **Express.js** server (`server.js`) to handle secure token generation and AI processing, running concurrently with the frontend.

## Proposed Changes

### Dependencies
- **Frontend**: `agora-rtc-react`, `react-router-dom`
- **Backend**: `express`, `cors`, `dotenv`, `agora-access-token`, `concurrently` (to run both)

### Backend (`server.js`)
#### [NEW] [server.js](file:///c:/Users/srija/OneDrive/Desktop/WebRtc/Agora/server.js)
- **Purpose**: Acts as the API server.
- **Routes**:
    - `POST /api/agora/token`: Generates a temporary access token using `agora-access-token`.
        - Input: `channelName`, `uid`.
    - `POST /api/ai/mom`: Generates Minutes of Meeting.
        - Input: `transcript` (string).
        - Process: Uses Google Gemini to summarize text.

### Frontend Components (`src/components/agora/`)
#### [NEW] [VideoRoom.jsx](file:///c:/Users/srija/OneDrive/Desktop/WebRtc/Agora/src/components/agora/VideoRoom.jsx)
- Wrappers for `AgoraRTCProvider`.
- Handles joining/leaving channels.

#### [NEW] [VideoPlayer.jsx](file:///c:/Users/srija/OneDrive/Desktop/WebRtc/Agora/src/components/agora/VideoPlayer.jsx)
- Renders individual user video streams.

#### [NEW] [MeetingControls.jsx](file:///c:/Users/srija/OneDrive/Desktop/WebRtc/Agora/src/components/agora/MeetingControls.jsx)
- Mute/Unmute, Camera On/Off, End Call.
- **Audio Capture**: Captures audio for Web Speech API (transcription).

### Pages
#### [NEW] [MeetingPage.jsx](file:///c:/Users/srija/OneDrive/Desktop/WebRtc/Agora/src/pages/MeetingPage.jsx)
- The main meeting interface.
- Displays "Live Transcript" sidebar.
- Triggers MOM API on call end.

## Verification Plan
### Manual Verification
1.  **Setup**: Run `npm run dev` (which will run `concurrently "vite" "node server.js"`).
2.  **Video Call**: Open two different tabs to the same Meeting ID. Verify video/audio.
3.  **Transcription**: Speak and verify text appears in the transcript area.
4.  **MOM**: End call and check console/UI for the AI summary.
