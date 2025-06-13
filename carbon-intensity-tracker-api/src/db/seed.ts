import { AppDataSource } from './data-source.ts';
import { CarbonIntensity } from '../entity/CarbonIntensity.ts';
import { CarbonIntensityBuilder } from '../entity/CarbonIntensityBuilder.ts';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import stream from 'stream';

const pipeline = promisify(stream.pipeline);

const parseCsv = async (filePath: string): Promise<any[]> => {
  const results: any[] = [];
  await pipeline(
    fs.createReadStream(filePath),
    csv(),
    async function* (source) {
      for await (const chunk of source) {
        results.push(chunk);
      }
    }
  );
  return results;
};

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    await AppDataSource.getRepository(CarbonIntensity).clear();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, './carbon-intensity-data.csv');
    const rows = await parseCsv(filePath);

    const intensities = rows.map((row) =>
      new CarbonIntensityBuilder()
        .withFrom(new Date(row.from))
        .withTo(new Date(row.to))
        .withIntensityForecast(parseInt(row.intensity_forecast))
        .withIntensityActual(parseInt(row.intensity_actual))
        .withIndex(row.index)
        .withGas(parseFloat(row.gas))
        .withCoal(parseFloat(row.coal))
        .withBiomass(parseFloat(row.biomass))
        .withNuclear(parseFloat(row.nuclear))
        .withHydro(parseFloat(row.hydro))
        .withImports(parseFloat(row.imports))
        .withWind(parseFloat(row.wind))
        .withSolar(parseFloat(row.solar))
        .withOther(parseFloat(row.other))
        .withTotal(parseFloat(row.total))
        .build()
    );

    await AppDataSource.manager.save(intensities);

    console.log(`✅ Inserted ${intensities.length} records`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
