import { CarbonIntensity } from './CarbonIntensity.ts';

export class CarbonIntensityBuilder {
    private readonly data: Omit<CarbonIntensity, 'id'>;

    constructor() {
        // Initialize with default values that will be overwritten
        this.data = {
            from: new Date(),
            to: new Date(),
            intensity_forecast: 0,
            intensity_actual: 0,
            index: 'moderate',
            gas: 0,
            coal: 0,
            biomass: 0,
            nuclear: 0,
            hydro: 0,
            imports: 0,
            wind: 0,
            solar: 0,
            other: 0,
            total: 0
        };
    }

    withFrom(from: Date): this {
        this.data.from = from;
        return this;
    }

    withTo(to: Date): this {
        this.data.to = to;
        return this;
    }

    withIntensityForecast(forecast: number): this {
        this.data.intensity_forecast = forecast;
        return this;
    }

    withIntensityActual(actual: number): this {
        this.data.intensity_actual = actual;
        return this;
    }

    withIndex(index: string): this {
        this.data.index = index;
        return this;
    }

    withGas(gas: number): this {
        this.data.gas = gas;
        return this;
    }

    withCoal(coal: number): this {
        this.data.coal = coal;
        return this;
    }

    withBiomass(biomass: number): this {
        this.data.biomass = biomass;
        return this;
    }

    withNuclear(nuclear: number): this {
        this.data.nuclear = nuclear;
        return this;
    }

    withHydro(hydro: number): this {
        this.data.hydro = hydro;
        return this;
    }

    withImports(imports: number): this {
        this.data.imports = imports;
        return this;
    }

    withWind(wind: number): this {
        this.data.wind = wind;
        return this;
    }

    withSolar(solar: number): this {
        this.data.solar = solar;
        return this;
    }

    withOther(other: number): this {
        this.data.other = other;
        return this;
    }

    withTotal(total: number): this {
        this.data.total = total;
        return this;
    }

    build(): CarbonIntensity {
        return new CarbonIntensity(
            this.data.from,
            this.data.to,
            this.data.intensity_forecast,
            this.data.intensity_actual,
            this.data.index,
            this.data.gas,
            this.data.coal,
            this.data.biomass,
            this.data.nuclear,
            this.data.hydro,
            this.data.imports,
            this.data.wind,
            this.data.solar,
            this.data.other,
            this.data.total
        );
    }
}