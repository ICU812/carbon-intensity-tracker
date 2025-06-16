import { CarbonIntensityPeriod } from "../../src/domain/entity/CarbonIntensityPeriod.ts";
import { GenerationMix } from "../../src/domain/entity/GenerationMix.ts";
import { FuelType } from "../../src/domain/value-objects/FuelType.ts";
import { CarbonIntensityRepository } from "../../src/repository/CarbonIntensityRepository.ts";
import { CarbonIntensityService } from "../../src/service/CarbonIntensityService.ts";

describe("CarbonIntensityService", () => {
  it("should return all intensities", async () => {
    const fromUtc = new Date(Date.UTC(2025, 5, 12, 0, 0, 0));
    const toUtc = new Date(Date.UTC(2025, 5, 12, 1, 0, 0));

    const generationMix: GenerationMix[] = [
      Object.assign(new GenerationMix(), {
        fuel: FuelType.Gas,
        percentage: 40,
      }),
      Object.assign(new GenerationMix(), {
        fuel: FuelType.Wind,
        percentage: 20,
      }),
    ];

    const carbonIntensityPeriod: CarbonIntensityPeriod = Object.assign(
      new CarbonIntensityPeriod(),
      {
        id: 1,
        from: fromUtc,
        to: toUtc,
        forecast: 100,
        actual: 95,
        index: "moderate",
        generationMix: generationMix,
      },
    );

    generationMix.forEach((gm) => (gm.period = carbonIntensityPeriod));

    const mockRepo: Partial<CarbonIntensityRepository> = {
      findAll: jest.fn().mockResolvedValue([carbonIntensityPeriod]),
    };

    const service = new CarbonIntensityService(
      mockRepo as CarbonIntensityRepository,
    );

    const result = await service.getAll();

    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual({
      data: [
        {
          from: fromUtc,
          to: toUtc,
          intensity: {
            forecast: 100,
            actual: 95,
            index: "moderate",
          },
        },
      ],
    });
  });
});
