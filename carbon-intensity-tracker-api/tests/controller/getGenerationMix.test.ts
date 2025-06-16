import { getGenerationMix } from "../../src/controller/getGenerationMix.ts";
import { GenerationPeriodDTO } from "../../src/mapper/carbonIntensityMapper.ts";
import { CarbonIntensityService } from "../../src/service/CarbonIntensityService.ts";
import { Request, Response } from "express";

describe("GenerationMixController", () => {
  let service: jest.Mocked<CarbonIntensityService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    service = {
      getGenerationMix: jest.fn(),
    } as unknown as jest.Mocked<CarbonIntensityService>;

    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should return generation mix data from service", async () => {
    const mockData: GenerationPeriodDTO[] = [
      {
        from: "2025-06-12T00:00:00.000Z",
        to: "2025-06-12T01:00:00.000Z",
        generationmix: [
          { fuel: "gas", percentage: 40 },
          { fuel: "wind", percentage: 20 },
        ],
      },
    ];

    service.getGenerationMix.mockResolvedValue(mockData);

    await getGenerationMix(service)(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ data: mockData });
    expect(service.getGenerationMix).toHaveBeenCalledTimes(1);
  });

  it("should handle errors correctly", async () => {
    service.getGenerationMix.mockRejectedValue(new Error("Unit test simulated DB error"));

    await getGenerationMix(service)(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
