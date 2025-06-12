import { CarbonIntensityRepository } from '../../src/repository/CarbonIntensityRepository';
import { CarbonIntensity } from '../../src/entity/CarbonIntensity';
import { Repository } from 'typeorm';

describe('CarbonIntensityRepository', () => {
  let repository: CarbonIntensityRepository;
  let mockRepo: jest.Mocked<Repository<CarbonIntensity>>;

  mockRepo = {
    find: jest.fn(),
  } as unknown as jest.Mocked<Repository<CarbonIntensity>>;

  repository = new CarbonIntensityRepository(mockRepo);


  it('should call repo.find() and return all entities', async () => {
    const carbonIntensity: CarbonIntensity =
    {
      id: 1,
      from: new Date('2025-06-12T00:00:00Z'),
      to: new Date('2025-06-12T01:00:00Z'),
      intensity_forecast: 100,
      intensity_actual: 95,
      index: 'moderate',
      gas: 40,
      coal: 10,
      biomass: 5,
      nuclear: 20,
      hydro: 3,
      imports: 7,
      wind: 10,
      solar: 8,
      other: 2,
      total: 105,
    };

    mockRepo.find.mockResolvedValue([carbonIntensity]);

    const result = await repository.findAll();

    expect(mockRepo.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual([carbonIntensity]);
  });
});
