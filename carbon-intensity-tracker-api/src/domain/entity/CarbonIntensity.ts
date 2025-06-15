import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CarbonIntensity {
  @PrimaryGeneratedColumn()
  id?: number;  // Non-null assertion for TypeScript

  @Column({ type: 'text', nullable: false })
  from!: Date;

  @Column({ type: 'text', nullable: false })
  to!: Date;

  @Column({ type: 'integer', nullable: false })
  intensity_forecast!: number;

  @Column({ type: 'integer', nullable: false })
  intensity_actual!: number;

  @Column({ type: 'text', nullable: false })
  index!: string;

  @Column({ type: 'real', nullable: false })
  gas!: number;

  @Column({ type: 'real', nullable: false })
  coal!: number;

  @Column({ type: 'real', nullable: false })
  biomass!: number;

  @Column({ type: 'real', nullable: false })
  nuclear!: number;

  @Column({ type: 'real', nullable: false })
  hydro!: number;

  @Column({ type: 'real', nullable: false })
  imports!: number;

  @Column({ type: 'real', nullable: false })
  wind!: number;

  @Column({ type: 'real', nullable: false })
  solar!: number;

  @Column({ type: 'real', nullable: false })
  other!: number;

  @Column({ type: 'real', nullable: false })
  total!: number;

  constructor(
    from: Date,
    to: Date,
    intensity_forecast: number,
    intensity_actual: number,
    index: string,
    gas: number,
    coal: number,
    biomass: number,
    nuclear: number,
    hydro: number,
    imports: number,
    wind: number,
    solar: number,
    other: number,
    total: number
  ) {
    this.from = from;
    this.to = to;
    this.intensity_forecast = intensity_forecast;
    this.intensity_actual = intensity_actual;
    this.index = index;
    this.gas = gas;
    this.coal = coal;
    this.biomass = biomass;
    this.nuclear = nuclear;
    this.hydro = hydro;
    this.imports = imports;
    this.wind = wind;
    this.solar = solar;
    this.other = other;
    this.total = total;
  }
}
