import { Request, Response } from 'express';
import { CarbonIntensityRepository } from '../repository/CarbonIntensityRepository.ts';

export const getCarbonIntensity = (carbonIntensityRepo: CarbonIntensityRepository) =>
    async (_req: Request, res: Response) => {
        try {
            const record = await carbonIntensityRepo.findAll();
            res.json(record);
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };