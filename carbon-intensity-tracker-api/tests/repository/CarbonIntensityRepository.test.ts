import { CarbonIntensityRepository } from "../../src/repository/CarbonIntensityRepository.ts";
import { CarbonIntensityPeriod } from "../../src/domain/entity/CarbonIntensityPeriod.ts";
import { GenerationMix } from "../../src/domain/entity/GenerationMix.ts";
import { FuelType } from "../../src/domain/value-objects/FuelType.ts";
import { Repository } from "typeorm";
import { GenerationPeriodDTO } from "../../src/mapper/carbonIntensityMapper.ts";

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

  it("should map entities to DTOs correctly for findAllWithGenerationMix", async () => {
    const mockEntity: CarbonIntensityPeriod = {
      id: 1,
      from: new Date("2024-06-16T10:00:00Z"),
      to: new Date("2024-06-16T10:30:00Z"),
      forecast: 200,
      actual: 190,
      index: "moderate",
      generationMix: [
        {
          id: 1,
          fuel: FuelType.Gas,
          percentage: 45.2,
          period: {} as CarbonIntensityPeriod,
        },
        {
          id: 2,
          fuel: FuelType.Wind,
          percentage: 30.5,
          period: {} as CarbonIntensityPeriod,
        },
      ],
    };
    (mockRepo.find as jest.Mock).mockResolvedValue([mockEntity]);

    const result = await repository.findAllWithGenerationMix();

    const expected: GenerationPeriodDTO[] = [
      {
        from: "2024-06-16T10:00:00.000Z",
        to: "2024-06-16T10:30:00.000Z",
        generationmix: [
          { fuel: "gas", percentage: 45.2 },
          { fuel: "wind", percentage: 30.5 },
        ],
      },
    ];

    expect(result).toEqual(expected);
  });
});
