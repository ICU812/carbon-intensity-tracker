import { Request, Response } from 'express';
import { getCarbonIntensity } from '../../src/controller/getCarbonIntensity.ts';
import { CarbonIntensityService } from '../../src/service/CarbonIntensityService.ts';
import { CarbonIntensity } from '../../src/domain/entity/CarbonIntensity.ts';

describe('getCarbonIntensity controller', () => {
    let mockService: CarbonIntensityService;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        mockService = {
            getAllIntensities: jest.fn()
        } as unknown as CarbonIntensityService;

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it('should return carbon intensities successfully', async () => {
        const carbonIntensityList: CarbonIntensity[] =
            [{
                id: 1,
                from: new Date('2025-06-12T00:00:00Z'),
                to: new Date('2025-06-12T01:00:00Z'),
                intensity_forecast: 100,
                intensity_actual: 95,
                index: 'moderate',
                gas: 40,
                coal: 10,
                biomass: 5,
                nuclear: 20,
                hydro: 3,
                imports: 7,
                wind: 10,
                solar: 8,
                other: 2,
                total: 105,
            }
            ];

        (mockService.getAllIntensities as jest.Mock).mockResolvedValue(carbonIntensityList);

        await getCarbonIntensity(mockService)(req as Request, res as Response);

        expect(mockService.getAllIntensities).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(carbonIntensityList);
    });

    it('should throw internal server error if unexpected error occurs', async () => {
        (mockService.getAllIntensities as jest.Mock).mockRejectedValue(new Error('Unit test simulated DB error'));

        await getCarbonIntensity(mockService)(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
