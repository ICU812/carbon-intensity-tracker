import { DataSource } from "typeorm";
import { CarbonIntensityRepository } from "../../src/repository/CarbonIntensityRepository";
import { CarbonIntensityPeriod } from "../../src/domain/entity/CarbonIntensityPeriod";
import { GenerationMix } from "../../src/domain/entity/GenerationMix";
import { FuelType } from "../../src/domain/value-objects/FuelType";

describe("CarbonIntensityRepository Integration Test (UTC-safe)", () => {
  let dataSource: DataSource;
  let repository: CarbonIntensityRepository;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [CarbonIntensityPeriod, GenerationMix],
    });

    await dataSource.initialize();
    repository = new CarbonIntensityRepository(
      dataSource.getRepository(CarbonIntensityPeriod),
    );
  });

  beforeEach(async () => {
    await dataSource.getRepository(CarbonIntensityPeriod).clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  const seedTestData = async () => {
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

    const fromUtc = new Date(Date.UTC(2025, 5, 12, 0, 0, 0));
    const toUtc = new Date(Date.UTC(2025, 5, 12, 1, 0, 0));

    const carbonIntensityPeriod: CarbonIntensityPeriod = Object.assign(
      new CarbonIntensityPeriod(),
      {
        from: fromUtc,
        to: toUtc,
        forecast: 100,
        actual: 95,
        index: "moderate",
        generationMix: generationMix,
      },
    );

    generationMix.forEach((gm) => (gm.period = carbonIntensityPeriod));

    await repository.save(carbonIntensityPeriod);

    return { fromUtc, toUtc };
  };


  it("should save and retrieve a CarbonIntensityPeriod (UTC-safe)", async () => {
    const { fromUtc, toUtc } = await seedTestData();
    const result = await repository.findAll();

    expect(result).toHaveLength(1);

    const period = result[0];

    expect(period.forecast).toBe(100);
    expect(period.actual).toBe(95);
    expect(period.index).toBe("moderate");

    expect(+new Date(period.from)).toBe(+fromUtc);
    expect(+new Date(period.to)).toBe(+toUtc);

    expect(period.generationMix).toHaveLength(2);

    const fuels = period.generationMix.map((mix) => mix.fuel);
    const percentages = period.generationMix.map((mix) => mix.percentage);

    expect(fuels).toContain(FuelType.Gas);
    expect(fuels).toContain(FuelType.Wind);
    expect(percentages).toContain(40);
    expect(percentages).toContain(20);
  });

  it("should retrieve GenerationMix mapped DTOs (findAllWithGenerationMix)", async () => {
    const { fromUtc, toUtc } = await seedTestData();

    const result = await repository.findAllWithGenerationMix();
    console.log({ result })

    expect(result).toEqual([
      {
        from: fromUtc.toISOString(),
        to: toUtc.toISOString(),
        generationmix: [
          { fuel: "gas", percentage: 40 },
          { fuel: "wind", percentage: 20 },
        ],
      },
    ]);
  });
});
