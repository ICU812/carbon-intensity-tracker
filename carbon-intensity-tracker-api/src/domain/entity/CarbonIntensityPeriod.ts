import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenerationMix } from './GenerationMix.ts';

@Entity({ name: 'carbon_intensity_period' })
export class CarbonIntensityPeriod {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'text',
        nullable: false,
        transformer: {
            to: (value: Date) => value.toISOString(),
            from: (value: string) => new Date(value),
        },
    })
    from!: Date;

    @Column({
        type: 'text',
        nullable: false,
        transformer: {
            to: (value: Date) => value.toISOString(),
            from: (value: string) => new Date(value),
        },
    })
    to!: Date;

    @Column({ type: 'integer', nullable: false })
    forecast!: number;

    @Column({ type: 'integer', nullable: false })
    actual!: number;

    @Column({ type: 'text', nullable: false })
    index!: string;

    @OneToMany(() => GenerationMix, generationMix => generationMix.period, {
        cascade: true,
        eager: true,
    })
    generationMix!: Awaited<GenerationMix[]>;
}
