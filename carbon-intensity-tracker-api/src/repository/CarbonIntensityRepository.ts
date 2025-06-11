import { Repository } from 'typeorm';
import { CarbonIntensity } from '../entity/CarbonIntensity';

export class CarbonIntensityRepository {
  constructor(private readonly repo: Repository<CarbonIntensity>) {}

  async findAll() {
    return await this.repo.find();
  }
}
