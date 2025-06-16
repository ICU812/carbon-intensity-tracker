import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import { AppDataSource } from '../db/data-source.ts';
import { CarbonIntensityPeriod } from '../domain/entity/CarbonIntensityPeriod.ts';
import { GenerationMix } from '../domain/entity/GenerationMix.ts';
import { FuelType } from '../domain/value-objects/FuelType.ts';

// Correct __filename and __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fuelTypes = [
  FuelType.Gas,
  FuelType.Coal,
  FuelType.Biomass,
  FuelType.Nuclear,
  FuelType.Hydro,
  FuelType.Imports,
  FuelType.Wind,
  FuelType.Solar,
  FuelType.Other
];

interface CarbonIntensityCsvRow {
  from: string;
  to: string;
  intensity_forecast: string;
  intensity_actual: string;
  index: string;
  [fuel: string]: string;
}

async function seedCarbonIntensityData() {
  // ✅ Fully ESM-safe path resolution:
  const filePath = path.resolve(__dirname, './carbon-intensity-data.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const records: CarbonIntensityCsvRow[] = [];

  await new Promise<void>((resolve, reject) => {
    parse(fileContent, { columns: true, trim: true }, (err, output) => {
      if (err) reject(err);
      records.push(...output);
      resolve();
    });
  });

  const carbonIntensityRepo = AppDataSource.getRepository(CarbonIntensityPeriod);

  for (const row of records) {
    const generationMix: GenerationMix[] = [];

    fuelTypes.forEach(fuel => {
      const percentage = parseFloat(row[fuel]);
      const generationMixEntity = new GenerationMix();
      generationMixEntity.fuel = fuel;
      generationMixEntity.percentage = percentage;
      generationMix.push(generationMixEntity);
    });

    const period = new CarbonIntensityPeriod();
    period.from = new Date(row.from);
    period.to = new Date(row.to);
    period.forecast = parseInt(row.intensity_forecast);
    period.actual = parseInt(row.intensity_actual);
    period.index = row.index;
    period.generationMix = generationMix;

    generationMix.forEach(gm => (gm.period = period));

    await carbonIntensityRepo.save(period);
  }

  console.log('Database successfully seeded');
}

AppDataSource.initialize()
  .then(async () => {
    console.log('Database initialized');
    await seedCarbonIntensityData();
    process.exit(0);
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.error('Error initializing database:', error.message);
    } else {
      console.error('Error initializing database:', JSON.stringify(error));
    }
    process.exit(1);
  });
