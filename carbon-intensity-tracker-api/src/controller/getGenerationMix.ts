import { Request, Response } from "express";
import { CarbonIntensityService } from "../service/CarbonIntensityService.ts";

export const getGenerationMix =
  (carbonIntensityService: CarbonIntensityService) =>
  async (_req: Request, res: Response) => {
    try {
      const generationMix = await carbonIntensityService.getGenerationMix();
      res.json({ data: generationMix });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching data:", err.message);
      } else {
        console.error("Error fetching data:", err);
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };
