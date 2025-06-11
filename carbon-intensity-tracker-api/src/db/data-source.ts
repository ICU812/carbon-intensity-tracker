import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CarbonIntensity } from '../entity/CarbonIntensity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/db/carbon_intensity.sqlite',
  synchronize: true,
  logging: false,
  entities: [CarbonIntensity],
  migrations: [],
  subscribers: [],
});