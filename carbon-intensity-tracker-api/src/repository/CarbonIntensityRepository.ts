import { Repository } from 'typeorm';
import { CarbonIntensity } from '../entity/CarbonIntensity.ts';

export class CarbonIntensityRepository {
  constructor(private readonly repo: Repository<CarbonIntensity>) { }

  async findAll() {
    return await this.repo.find();
  }

  async save(entity: CarbonIntensity) {
    return await this.repo.save(entity);
  }
}
