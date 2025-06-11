import express from 'express';
import { AppDataSource } from './db/data-source';
import { CarbonIntensity } from './entity/CarbonIntensity';
import { CarbonIntensityRepository } from './repository/CarbonIntensityRepository';

const app = express();
const PORT = 3001;

app.use(express.json());

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        // Wire up repositories
        const carbonIntensityRepo = new CarbonIntensityRepository(
            AppDataSource.getRepository(CarbonIntensity)
        );

        app.get('/api/intensity', async (req, res) => {
            try {
                const record = await carbonIntensityRepo.findAll();
                res.json(record);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();

