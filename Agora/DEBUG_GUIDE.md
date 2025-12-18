# Video Not Showing - Debug Guide

## Step 1: Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab for:
1. **"VideoPlayer: Joining with AppID:"** - Should show your App ID
2. **"VideoRoom: Token received"** - Should show the token
3. Any **red error messages** from Agora SDK

## Step 2: Verify Environment Variables
The app needs `VITE_AGORA_APP_ID` to be set. 

**Action:** Open `.env` file and ensure it has:
```
VITE_AGORA_APP_ID=2f1c504285494d68ba3acee68216f16f
AGORA_APP_CERTIFICATE=10d33e5a8a354240b4193855c519ccbb
```

**Important:** After changing `.env`, you MUST restart `npm run dev`!

## Step 3: Check Camera/Microphone Permissions
1. Look for a browser permission popup asking for camera/mic access
2. Click **Allow**
3. If you accidentally clicked "Block", go to browser settings and enable permissions for localhost

## Step 4: Common Issues

### Issue: "Loading Token..." forever
**Solution:** Backend server not running. Run `npm run dev` (not just `vite`)

### Issue: Black video boxes
**Causes:**
- Camera/Mic permissions denied
- Wrong App ID
- Environment variable not loaded (restart dev server after .env changes)

### Issue: Can't see other users
**Causes:**
- Both users need to be in the same channel (same meeting ID)
- Token generation failed (check server console)
- Network/firewall blocking Agora servers

## Step 5: Test Checklist
- [ ] Backend server running on port 3001
- [ ] Frontend running on port 5173
- [ ] Browser console shows App ID (not undefined)
- [ ] Browser console shows token received
- [ ] Camera/Mic permissions granted
- [ ] Two different browser tabs/windows with same meeting ID
