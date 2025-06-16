import { Router } from "express";
import { getCarbonIntensity } from "../controller/getCarbonIntensity.ts";
import { AppDataSource } from "../db/data-source.ts";
import { CarbonIntensityPeriod } from "../domain/entity/CarbonIntensityPeriod.ts";
import { CarbonIntensityRepository } from "../repository/CarbonIntensityRepository.ts";
import { CarbonIntensityService } from "../service/CarbonIntensityService.ts";

const router = Router();

const repository = new CarbonIntensityRepository(
  AppDataSource.getRepository(CarbonIntensityPeriod),
);

const service = new CarbonIntensityService(repository);
const controller = getCarbonIntensity(service);
router.get("/intensity", controller);

export default router;
