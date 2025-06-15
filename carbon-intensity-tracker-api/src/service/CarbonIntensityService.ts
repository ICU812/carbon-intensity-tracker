import { CarbonIntensityRepository } from '../repository/CarbonIntensityRepository.ts';

export class CarbonIntensityService {
    constructor(private readonly repo: CarbonIntensityRepository) { }

    async getAllIntensities() {
        return this.repo.findAll();
    }
}