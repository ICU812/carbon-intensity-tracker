import { CarbonIntensityPeriod } from "./entity/CarbonIntensityPeriod.ts";

export interface ICarbonIntensityPeriodRepository {
  findAll(): Promise<CarbonIntensityPeriod[]>;
  save(entity: CarbonIntensityPeriod): Promise<CarbonIntensityPeriod>;
}
