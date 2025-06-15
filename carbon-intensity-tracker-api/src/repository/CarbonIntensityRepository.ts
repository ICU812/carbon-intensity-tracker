import { Repository } from 'typeorm';
import { CarbonIntensity } from '../domain/entity/CarbonIntensity.ts';
import { ICarbonIntensityRepository } from '../domain/ICarbonIntensityRepository.ts';

export class CarbonIntensityRepository implements ICarbonIntensityRepository {
  constructor(private readonly repo: Repository<CarbonIntensity>) { }

  async findAll() {
    return await this.repo.find();
  }

  async save(entity: CarbonIntensity) {
    return await this.repo.save(entity);
  }
}
