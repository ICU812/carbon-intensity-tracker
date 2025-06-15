import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CarbonIntensityPeriod } from '../domain/entity/CarbonIntensityPeriod.ts';
import { GenerationMix } from '../domain/entity/GenerationMix.ts';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './src/db/carbon_intensity.sqlite',
  synchronize: true,
  logging: false,
  entities: [CarbonIntensityPeriod, GenerationMix],
  migrations: [],
  subscribers: [],
});