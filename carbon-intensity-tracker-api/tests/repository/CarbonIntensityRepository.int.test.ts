import { DataSource } from 'typeorm';
import { CarbonIntensity } from '../../src/domain/entity/CarbonIntensity';
import { CarbonIntensityRepository } from '../../src/repository/CarbonIntensityRepository';

describe('CarbonIntensityRepository Integration Test', () => {
    let dataSource: DataSource;
    let repository: CarbonIntensityRepository;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [CarbonIntensity],
        });

        await dataSource.initialize();
        repository = new CarbonIntensityRepository(dataSource.getRepository(CarbonIntensity));
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it('should save and retrieve a CarbonIntensity entity', async () => {
        const carbonIntensity: CarbonIntensity = {
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

        await repository.save(carbonIntensity);

        const result = await repository.findAll();

        expect(result).toHaveLength(1);

        expect(result[0].intensity_forecast).toBe(carbonIntensity.intensity_forecast);
        expect(result[0].intensity_actual).toBe(carbonIntensity.intensity_actual);
        expect(result[0].index).toBe(carbonIntensity.index);
        expect(result[0].gas).toBe(carbonIntensity.gas);
        expect(result[0].coal).toBe(carbonIntensity.coal);
        expect(result[0].biomass).toBe(carbonIntensity.biomass);
        expect(result[0].nuclear).toBe(carbonIntensity.nuclear);
        expect(result[0].hydro).toBe(carbonIntensity.hydro);
        expect(result[0].imports).toBe(carbonIntensity.imports);
        expect(result[0].wind).toBe(carbonIntensity.wind);
        expect(result[0].solar).toBe(carbonIntensity.solar);
        expect(result[0].other).toBe(carbonIntensity.other);
        expect(result[0].total).toBe(carbonIntensity.total);
        expect(result[0].from).toEqual('2025-06-12 00:00:00.000');
        expect(result[0].to).toEqual('2025-06-12 01:00:00.000');
    });
});
