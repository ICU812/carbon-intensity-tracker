import { GenerationPeriodDTO } from "../mapper/carbonIntensityMapper.ts";
import { CarbonIntensityPeriod } from "./entity/CarbonIntensityPeriod.ts";

export interface ICarbonIntensityPeriodRepository {
  findAll(): Promise<CarbonIntensityPeriod[]>;
  save(entity: CarbonIntensityPeriod): Promise<CarbonIntensityPeriod>;
  findAllWithGenerationMix(): Promise<GenerationPeriodDTO[]>;
}
