# 🚀 Quick Start - Video Not Showing Fix

## The Problem
You're not seeing your camera feed in the meeting.

## The Solution

### 1. **STOP Everything**
Press `Ctrl + C` in your terminal to stop the dev server.

### 2. **Verify .env File**
Run this command:
```bash
Get-Content .env
```

You should see:
```
VITE_AGORA_APP_ID=2f1c504285494d68ba3acee68216f16f
AGORA_APP_CERTIFICATE=10d33e5a8a354240b4193855c519ccbb
```

If it says `NEXT_PUBLIC_AGORA_APP_ID` instead, I've already fixed it for you.

### 3. **Start Fresh**
```bash
npm run dev
```

Wait for both servers to start. You should see:
```
Server Config:
APP_ID: 2f1c504285494d68ba3acee68216f16f
APP_CERTIFICATE: Set
Server listening at http://localhost:3001
```

### 4. **Test Camera First**
1. Open browser: `http://localhost:5173/test`
2. Click "Allow" when browser asks for camera permission
3. **You should see yourself!**

If you see yourself here, camera works! ✅

### 5. **Test Full Meeting**
1. Go to: `http://localhost:5173`
2. Click "New Meeting"
3. Click "Allow" for camera/microphone
4. **You should see**:
   - Blue box with your video (labeled "You (Local)")
   - Gray box saying "Waiting for others..."

### 6. **Test with Two Users**
1. Copy the meeting URL
2. Open **Incognito/Private window** (Ctrl+Shift+N)
3. Paste URL and press Enter
4. Allow camera/microphone again
5. **You should see both videos!**

## Still Not Working?

### Check Browser Console (F12)
Look for these messages:
- ✅ `App ID: 2f1c504285494d68ba3acee68216f16f`
- ✅ `Local Camera Track: [MediaStreamTrack]`
- ❌ `App ID: undefined` → Restart dev server
- ❌ `Local Camera Track: null` → Check permissions

### Browser Permissions
1. Click the 🔒 icon in address bar
2. Set Camera and Microphone to "Allow"
3. Refresh page

### Clear Everything
```bash
# Stop server (Ctrl+C)
# Clear browser cache (Ctrl+Shift+Delete)
# Restart
npm run dev
```

## What I Fixed
1. ✅ Changed `.env` to use `VITE_AGORA_APP_ID`
2. ✅ Updated `server.cjs` to read correct env var
3. ✅ Added better logging to VideoPlayer
4. ✅ Created camera test page at `/test`
5. ✅ Added visual feedback for loading states

The video SHOULD work now! If not, open the browser console (F12) and tell me what errors you see.
