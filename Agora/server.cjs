const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const APP_ID = process.env.VITE_AGORA_APP_ID || process.env.NEXT_PUBLIC_AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

console.log('Server Config:');
console.log('APP_ID:', APP_ID);
console.log('APP_CERTIFICATE:', APP_CERTIFICATE ? 'Set' : 'Missing');

const nocache = (_, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

const generateAccessToken = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const channelName = req.body.channelName;
  const uid = req.body.uid || 0;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  if (!channelName) {
    return res.status(400).json({ 'error': 'channel name is required' });
  }

  // If uid is 0, we can use 0, but best to use what client sends or 0 for any
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
  return res.json({ 'token': token });
};

app.post('/api/agora/token', nocache, generateAccessToken);

app.post('/api/ai/mom', nocache, async (req, res) => {
  const { transcript } = req.body;
  console.log("Received transcript for MOM:", transcript);

  // TODO: Integrate with Google Gemini here
  // For now, return a mock summary
  const mockSummary = `
    ## Minutes of Meeting
    **Date**: ${new Date().toLocaleDateString()}
    
    ### Key Discussion Points
    - Participants discussed the new Agora integration.
    - AI MOM generation was tested using the transcript: "${transcript.substring(0, 50)}..."
    
    ### Action Items
    1. Complete the frontend integration.
    2. Verify AI summary accuracy.
    `;

  // Simulate delay
  setTimeout(() => {
    res.json({ summary: mockSummary });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
