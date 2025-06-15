import { CarbonIntensity } from "../entity/CarbonIntensity.ts";

export interface ICarbonIntensityRepository {
    findAll(): Promise<CarbonIntensity[]>;
    save(entity: CarbonIntensity): Promise<CarbonIntensity>;
}