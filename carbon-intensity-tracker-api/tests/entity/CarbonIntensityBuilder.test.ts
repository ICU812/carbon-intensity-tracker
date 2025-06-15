import { CarbonIntensityBuilder } from '../../src/domain/entity/CarbonIntensityBuilder';
import { CarbonIntensity } from '../../src/domain/entity/CarbonIntensity';

describe('CarbonIntensityBuilder', () => {
    describe('should build entity with correct default values', () => {
        const carbonIntensity = new CarbonIntensityBuilder()
            .build();

        it('should set from correctly', () => {
            expect(carbonIntensity.from instanceof Date).toBe(true);
            expect(isNaN(carbonIntensity.from.getTime())).toBe(false);
        });

        it('should set to correctly', () => {
            expect(carbonIntensity.to instanceof Date).toBe(true);
            expect(isNaN(carbonIntensity.to.getTime())).toBe(false);
        });

        it('should set intensity_forecast correctly', () => {
            expect(carbonIntensity.intensity_forecast).toBe(0);
        });

        it('should set intensity_actual correctly', () => {
            expect(carbonIntensity.intensity_actual).toBe(0);
        });

        it('should set index correctly', () => {
            expect(carbonIntensity.index).toBe('moderate');
        });

        it('should set gas correctly', () => {
            expect(carbonIntensity.gas).toBe(0);
        });

        it('should set coal correctly', () => {
            expect(carbonIntensity.coal).toBe(0);
        });

        it('should set biomass correctly', () => {
            expect(carbonIntensity.biomass).toBe(0);
        });

        it('should set nuclear correctly', () => {
            expect(carbonIntensity.nuclear).toBe(0);
        });

        it('should set hydro correctly', () => {
            expect(carbonIntensity.hydro).toBe(0);
        });

        it('should set imports correctly', () => {
            expect(carbonIntensity.imports).toBe(0);
        });

        it('should set wind correctly', () => {
            expect(carbonIntensity.wind).toBe(0);
        });

        it('should set solar correctly', () => {
            expect(carbonIntensity.solar).toBe(0);
        });

        it('should set other correctly', () => {
            expect(carbonIntensity.other).toBe(0);
        });

        it('should set total correctly', () => {
            expect(carbonIntensity.total).toBe(0);
        });
    });

    describe('should build entity with specified values', () => {
        const from = new Date('2018-01-20T17:00Z');
        const to = new Date('2018-01-20T17:30Z');
        const forecast = 270;
        const actual = 268;
        const index = 'moderate';
        const gas = 35.6;
        const coal = 12.7;
        const biomass = 5.2;
        const nuclear = 14.6;
        const hydro = 3.1;
        const imports = 11.5;
        const wind = 12.8;
        const solar = 19.1;
        const other = 2.3;
        const total = 116.9;

        const carbonIntensity: CarbonIntensity = new CarbonIntensityBuilder()
            .withFrom(from)
            .withTo(to)
            .withIntensityForecast(forecast)
            .withIntensityActual(actual)
            .withIndex(index)
            .withGas(gas)
            .withCoal(coal)
            .withBiomass(biomass)
            .withNuclear(nuclear)
            .withHydro(hydro)
            .withImports(imports)
            .withWind(wind)
            .withSolar(solar)
            .withOther(other)
            .withTotal(total)
            .build();

        it('should set from', () => {
            expect(carbonIntensity.from).toEqual(from);
        });

        it('should set to', () => {
            expect(carbonIntensity.to).toEqual(to);
        });

        it('should set intensity_forecast', () => {
            expect(carbonIntensity.intensity_forecast).toBe(forecast);
        });

        it('should set intensity_actual', () => {
            expect(carbonIntensity.intensity_actual).toBe(actual);
        });

        it('should set index', () => {
            expect(carbonIntensity.index).toBe(index);
        });

        it('should set gas', () => {
            expect(carbonIntensity.gas).toBe(gas);
        });

        it('should set coal', () => {
            expect(carbonIntensity.coal).toBe(coal);
        });

        it('should set biomass', () => {
            expect(carbonIntensity.biomass).toBe(biomass);
        });

        it('should set nuclear', () => {
            expect(carbonIntensity.nuclear).toBe(nuclear);
        });

        it('should set hydro', () => {
            expect(carbonIntensity.hydro).toBe(hydro);
        });

        it('should set imports', () => {
            expect(carbonIntensity.imports).toBe(imports);
        });

        it('should set wind', () => {
            expect(carbonIntensity.wind).toBe(wind);
        });

        it('should set solar', () => {
            expect(carbonIntensity.solar).toBe(solar);
        });

        it('should set other', () => {
            expect(carbonIntensity.other).toBe(other);
        });

        it('should set total', () => {
            expect(carbonIntensity.total).toBe(total);
        });

    });
});
