import { Request, Response } from 'express';
import { CarbonIntensityService } from '../service/CarbonIntensityService.ts';

export const getCarbonIntensity = (carbonIntensityService: CarbonIntensityService) =>
    async (_req: Request, res: Response) => {
        try {
            const carbonIntensities = await carbonIntensityService.getAllIntensities();
            res.json(carbonIntensities);
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
