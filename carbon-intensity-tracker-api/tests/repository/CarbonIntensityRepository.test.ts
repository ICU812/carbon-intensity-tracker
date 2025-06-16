import { CarbonIntensityRepository } from "../../src/repository/CarbonIntensityRepository.ts";
import { CarbonIntensityPeriod } from "../../src/domain/entity/CarbonIntensityPeriod.ts";
import { GenerationMix } from "../../src/domain/entity/GenerationMix.ts";
import { FuelType } from "../../src/domain/value-objects/FuelType.ts";
import { Repository } from "typeorm";

describe("CarbonIntensityRepository", () => {
  let repository: CarbonIntensityRepository;
  let mockRepo: jest.Mocked<Repository<CarbonIntensityPeriod>>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<CarbonIntensityPeriod>>;

    repository = new CarbonIntensityRepository(mockRepo);
  });

  it("should call repo.find() and return all entities", async () => {
    const generationMix: GenerationMix[] = [
      Object.assign(new GenerationMix(), {
        fuel: FuelType.Gas,
        percentage: 40,
      }),
      Object.assign(new GenerationMix(), {
        fuel: FuelType.Coal,
        percentage: 10,
      }),
    ];

    const carbonIntensityPeriod: CarbonIntensityPeriod = Object.assign(
      new CarbonIntensityPeriod(),
      {
        id: 1,
        from: new Date("2025-06-12T00:00:00Z"),
        to: new Date("2025-06-12T01:00:00Z"),
        forecast: 100,
        actual: 95,
        index: "moderate",
        generationMix: generationMix,
      },
    );

    mockRepo.find.mockResolvedValue([carbonIntensityPeriod]);

    const result = await repository.findAll();

    expect(mockRepo.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual([carbonIntensityPeriod]);
  });
});
