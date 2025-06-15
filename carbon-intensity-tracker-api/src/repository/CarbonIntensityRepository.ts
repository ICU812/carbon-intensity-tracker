import { Repository } from 'typeorm';
import { CarbonIntensityPeriod } from '../domain/entity/CarbonIntensityPeriod.ts';
import { ICarbonIntensityPeriodRepository } from '../domain/ICarbonIntensityRepository.ts';

export class CarbonIntensityRepository implements ICarbonIntensityPeriodRepository {
  constructor(private readonly repo: Repository<CarbonIntensityPeriod>) { }

  async findAll() {
    return await this.repo.find();
  }

  async save(entity: CarbonIntensityPeriod) {
    return await this.repo.save(entity);
  }
}
