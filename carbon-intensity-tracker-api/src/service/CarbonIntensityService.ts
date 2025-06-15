import { ICarbonIntensityRepository } from '../domain/ICarbonIntensityRepository.ts';

export class CarbonIntensityService {
    constructor(private readonly repo: ICarbonIntensityRepository) { }

    async getAllIntensities() {
        return this.repo.findAll();
    }
}