# Agora Video Calling & AI MOM Walkthrough

This project enables real-time video calling using **Agora** and generates meeting minutes using **AI**.

## 🚀 How to Run

1.  **Install Dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Ensure your `.env` file has the correct keys:
    ```
    VITE_AGORA_APP_ID=your_agora_app_id
    AGORA_APP_CERTIFICATE=your_agora_certificate
    ```
    *(Note: Using `VITE_` prefix for frontend access)*

3.  **Start the App**:
    This command runs both the frontend (Vite) and backend (Express) concurrently:
    ```bash
    npm run dev
    ```

4.  **Access**:
    - Open `http://localhost:5173` in your browser.
    - Click **"New Meeting"** or enter a code to join.
    - Share the URL/code with another user (or open a new tab).

## 🧪 Testing Features

### Video Call
- **Join**: Ensure you can see yourself and the other participant.
- **Controls**: Test Mute/Unmute and Camera Toggle.

### AI Minutes of Meeting (MOM)
1.  **Speak**: Talk during the meeting. The browser's native **Web Speech API** captures audio.
2.  **Leave**: Click **"End Call & Gen MOM"**.
3.  **Result**: 
    - The backend receives the transcript.
    - A predefined AI summary logic runs (integration with Gemini pending strict API connection).
    - Check the **Console** or **Browser Alert** for the summary.

## 🛠️ Architecture
- **Frontend**: Vite + React + Agora RTC React SDK.
- **Backend**: Express + Agora Access Token + AI Route.
- **Transription**: Client-side Web Speech API.
