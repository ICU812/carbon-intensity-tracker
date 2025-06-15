import { CarbonIntensity } from '../../src/domain/entity/CarbonIntensity.ts';
import { ICarbonIntensityRepository } from '../../src/domain/ICarbonIntensityRepository.ts';
import { CarbonIntensityService } from '../../src/service/CarbonIntensityService.ts';

describe('CarbonIntensityService', () => {
    it('should return all intensities', async () => {
        const carbonIntensityList: CarbonIntensity[] =
            [{
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
            }
            ];

        const mockRepo: ICarbonIntensityRepository = {
            findAll: jest.fn().mockResolvedValue(carbonIntensityList),
            save: jest.fn()
        };
        const service = new CarbonIntensityService(mockRepo);

        const result = await service.getAllIntensities();

        expect(mockRepo.findAll).toHaveBeenCalled();
        expect(result).toEqual(carbonIntensityList);
    });
});