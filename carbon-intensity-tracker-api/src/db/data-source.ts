import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CarbonIntensity } from '../domain/entity/CarbonIntensity.ts';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './src/db/carbon_intensity.sqlite',
  synchronize: true,
  logging: false,
  entities: [CarbonIntensity],
  migrations: [],
  subscribers: [],
});