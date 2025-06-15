import { Router } from 'express';
import { getCarbonIntensity } from '../controllers/getCarbonIntensity.ts';
import { AppDataSource } from '../db/data-source.ts';
import { CarbonIntensityRepository } from '../repository/CarbonIntensityRepository.ts';
import { CarbonIntensity } from '../entity/CarbonIntensity.ts';

const router = Router();

const repository = new CarbonIntensityRepository(
    AppDataSource.getRepository(CarbonIntensity)
);

router.get('/intensity', getCarbonIntensity(repository));

export default router;
