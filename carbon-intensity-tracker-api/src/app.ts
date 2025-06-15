import express from 'express';
import { AppDataSource } from './db/data-source.ts';
import carbonIntensityRoutes from './routes/carbonIntensityRoutes.ts';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api', carbonIntensityRoutes);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
