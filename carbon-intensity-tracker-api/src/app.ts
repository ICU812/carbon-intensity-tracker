import express from 'express';
import { AppDataSource } from './db/data-source';

const app = express();
const PORT = 3001;

app.use(express.json());

// Test Route
app.get('/api/ping', (_req, res) => {
    res.send('🏓 Pong!');
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));