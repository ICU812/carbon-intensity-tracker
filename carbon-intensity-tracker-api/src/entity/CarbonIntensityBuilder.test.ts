import { CarbonIntensityBuilder } from './CarbonIntensityBuilder';

describe('CarbonIntensityBuilder', () => {
    describe('should build entity with correct default values', () => {

        const now = new Date();
        const entity = new CarbonIntensityBuilder()
            .build();

        it('should set from correctly', () => {
            expect(entity.from instanceof Date).toBe(true);
            expect(isNaN(entity.from.getTime())).toBe(false);
        });

        it('should set to correctly', () => {
            expect(entity.to instanceof Date).toBe(true);
            expect(isNaN(entity.to.getTime())).toBe(false);
        });

        it('should set intensity_forecast correctly', () => {
            expect(entity.intensity_forecast).toBe(0);
        });

        it('should set intensity_actual correctly', () => {
            expect(entity.intensity_actual).toBe(0);
        });

        it('should set index correctly', () => {
            expect(entity.index).toBe('moderate');
        });

        it('should set gas correctly', () => {
            expect(entity.gas).toBe(0);
        });

        it('should set coal correctly', () => {
            expect(entity.coal).toBe(0);
        });

        it('should set biomass correctly', () => {
            expect(entity.biomass).toBe(0);
        });

        it('should set nuclear correctly', () => {
            expect(entity.nuclear).toBe(0);
        });

        it('should set hydro correctly', () => {
            expect(entity.hydro).toBe(0);
        });

        it('should set imports correctly', () => {
            expect(entity.imports).toBe(0);
        });

        it('should set wind correctly', () => {
            expect(entity.wind).toBe(0);
        });

        it('should set solar correctly', () => {
            expect(entity.solar).toBe(0);
        });

        it('should set other correctly', () => {
            expect(entity.other).toBe(0);
        });

        it('should set total correctly', () => {
            expect(entity.total).toBe(0);
        });
    });
});
