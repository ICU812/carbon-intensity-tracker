import { CarbonIntensityPeriod } from "../domain/entity/CarbonIntensityPeriod.ts";

export interface GenerationPeriodDTO {
  from: string;
  to: string;
  generationmix: {
    fuel: string;
    percentage: number;
  }[];
}

export function mapToGenerationDTO(
  period: CarbonIntensityPeriod,
): GenerationPeriodDTO {
  return {
    from: period.from.toISOString(),
    to: period.to.toISOString(),
    generationmix: period.generationMix.map((mix) => ({
      fuel: mix.fuel.toLowerCase(),
      percentage: mix.percentage,
    })),
  };
}
