
// Native fetch is available in Node 22
// const fetch = require('node-fetch');
// Since node version is v22, native fetch is available.

async function testToken() {
    try {
        console.log("Testing Token Endpoint...");
        const response = await fetch('http://localhost:3001/api/agora/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channelName: 'test_channel', uid: 12345 })
        });

        if (!response.ok) {
            console.error("Server returned error:", response.status, response.statusText);
            const text = await response.text();
            console.error("Body:", text);
            return;
        }

        const data = await response.json();
        console.log("Success! Token received:", data.token ? "Yes (Length: " + data.token.length + ")" : "No");
        console.log("Token Preview:", data.token.substring(0, 20) + "...");
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
}

testToken();
