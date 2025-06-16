import { CarbonIntensityPeriod } from "../domain/entity/CarbonIntensityPeriod.ts";
import { ICarbonIntensityPeriodRepository } from "../domain/ICarbonIntensityRepository.ts";
import { GenerationPeriodDTO } from "../mapper/carbonIntensityMapper.ts";

export interface CarbonIntensityPeriodDto {
  from: Date;
  to: Date;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
}

export class CarbonIntensityService {
  constructor(private readonly repo: ICarbonIntensityPeriodRepository) { }

  async getAll(): Promise<{ data: CarbonIntensityPeriodDto[] }> {
    const periods: CarbonIntensityPeriod[] = await this.repo.findAll();

    const data: CarbonIntensityPeriodDto[] = periods.map((period) => ({
      from: period.from,
      to: period.to,
      intensity: {
        forecast: period.forecast,
        actual: period.actual,
        index: period.index,
      },
    }));

    return { data };
  }

  async getGenerationMix(): Promise<GenerationPeriodDTO[]> {
    return this.repo.findAllWithGenerationMix();
  }
}
