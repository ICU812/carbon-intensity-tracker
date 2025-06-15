import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FuelType } from '../value-objects/FuelType.ts';
import { CarbonIntensityPeriod } from './CarbonIntensityPeriod.ts';

@Entity({ name: 'generation_mix' })
export class GenerationMix {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    fuel!: FuelType;

    @Column('real')
    percentage!: number;

    @ManyToOne('CarbonIntensityPeriod', 'generationMix', { onDelete: 'CASCADE' })
    period!: Awaited<CarbonIntensityPeriod>;
}
