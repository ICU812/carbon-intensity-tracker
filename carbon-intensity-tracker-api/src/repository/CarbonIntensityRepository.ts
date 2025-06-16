import { Repository } from "typeorm";
import { CarbonIntensityPeriod } from "../domain/entity/CarbonIntensityPeriod.ts";
import { ICarbonIntensityPeriodRepository } from "../domain/ICarbonIntensityRepository.ts";
import { mapToGenerationDTO } from "../mapper/carbonIntensityMapper.ts";

export class CarbonIntensityRepository
  implements ICarbonIntensityPeriodRepository
{
  constructor(private readonly repo: Repository<CarbonIntensityPeriod>) {}

  async findAll() {
    return await this.repo.find();
  }

  async save(entity: CarbonIntensityPeriod) {
    return await this.repo.save(entity);
  }

  async findAllWithGenerationMix() {
    const periods = await this.repo.find({
      relations: ["generationMix"],
      order: { from: "ASC" },
    });

    return periods.map(mapToGenerationDTO);
  }
}
