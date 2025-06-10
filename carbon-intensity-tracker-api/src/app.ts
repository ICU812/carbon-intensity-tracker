import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

// Test Route
app.get('/api/ping', (_req, res) => {
    res.send('🏓 Pong!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});