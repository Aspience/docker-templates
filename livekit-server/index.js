const express = require('express');
const {AccessToken, RoomServiceClient} = require('livekit-server-sdk');
const cors = require('cors');

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_HOST = process.env.LIVEKIT_HOST;

if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET || !LIVEKIT_HOST) {
    console.error('Environment variables LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_HOST are not set.');
    process.exit(1);
}

const app = express();
const roomService = new RoomServiceClient(LIVEKIT_HOST, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
const port = 3001;

const opts = {
    name: 'room',
    emptyTimeout: 10 * 60, // 10 minutes
    maxParticipants: 20,
};
roomService.createRoom(opts).then((room) => {
    console.log('room created', room);
});

app.use(cors());

/**
 * Query: /getToken
 * params: roomName, participantName
 */
app.get('/api/getToken', (req, res) => {
    const {roomName, participantName} = req.query;

    if (!roomName || !participantName) {
        return res.status(400).send('Define "roomName" & "participantName"');
    }

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
        identity: participantName,
        name: participantName,
    });
    const grant = {
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
    };
    at.addGrant(grant);
    at.toJwt().then((token) => {
        res.json({token});
    })
});

app.listen(port, () => {
    console.log(`Token server on: http://localhost:${port}`);
    console.log(`LiveKit API Key: ${LIVEKIT_API_KEY}`);
    console.log(`Connect to LiveKit API Host: ${LIVEKIT_HOST}`);
});