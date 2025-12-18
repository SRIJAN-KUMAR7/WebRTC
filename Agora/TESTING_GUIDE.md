# 🎥 Video Testing Guide

## Step 1: Test Camera Directly

1. **Stop your dev server** (Ctrl+C)
2. **Restart it**: `npm run dev`
3. **Go to**: `http://localhost:5173/test`
4. **You should see**: Your camera feed in a simple test page
5. **If camera works here**: The issue is with the Agora integration
6. **If camera doesn't work**: Browser permissions or hardware issue

## Step 2: Check Browser Console

Open Developer Tools (F12) and look for:

### ✅ Good Signs:
```
=== VideoPlayer Debug ===
App ID: 2f1c504285494d68ba3acee68216f16f
Channel: [your-channel-name]
Token: 0062f1c504285494d68b...
Local Mic Track: [MediaStreamTrack object]
Local Camera Track: [MediaStreamTrack object]
```

### ❌ Bad Signs:
```
App ID: undefined
Token: MISSING
Local Camera Track: null
```

## Step 3: Browser Permissions

### Chrome/Edge:
1. Click the 🔒 or ⓘ icon in the address bar
2. Look for "Camera" and "Microphone"
3. Set both to "Allow"
4. Refresh the page

### If you see "Camera blocked" icon:
1. Go to `chrome://settings/content/camera`
2. Remove `localhost:5173` from blocked list
3. Add it to allowed list
4. Restart browser

## Step 4: Test Meeting Flow

1. Go to `http://localhost:5173`
2. Click "New Meeting"
3. **Allow camera/microphone** when prompted
4. You should see:
   - Your video in a box with blue border (labeled "You (Local)")
   - A gray box saying "Waiting for others to join..."

5. **Copy the URL** from address bar
6. **Open in Incognito/Private window** (Ctrl+Shift+N)
7. **Paste the URL** and press Enter
8. **Allow camera/microphone** again
9. You should now see:
   - Your video in both windows
   - The other participant's video

## Step 5: Common Issues & Fixes

### Issue: "Initializing camera..." forever
**Cause**: Browser didn't grant permissions
**Fix**: 
- Look for permission popup at top of browser
- Click "Allow"
- If no popup, check browser settings (see Step 3)

### Issue: Black video box
**Cause**: Camera in use by another app
**Fix**:
- Close other apps using camera (Zoom, Teams, etc.)
- Refresh the page

### Issue: Can see yourself but not others
**Cause**: Not in same channel or token issue
**Fix**:
- Make sure both users use EXACT same URL
- Check server console for token generation errors

### Issue: Console shows "App ID: undefined"
**Cause**: Environment variable not loaded
**Fix**:
- Stop dev server (Ctrl+C)
- Run `npm run dev` again
- Clear browser cache (Ctrl+Shift+Delete)

## Step 6: Verify Environment

Run this in terminal:
```bash
Get-Content .env
```

Should show:
```
VITE_AGORA_APP_ID=2f1c504285494d68ba3acee68216f16f
AGORA_APP_CERTIFICATE=10d33e5a8a354240b4193855c519ccbb
```

## Need More Help?

1. **Take a screenshot** of the browser console (F12)
2. **Copy any error messages** (red text)
3. **Share what you see** on the screen
