import { getCarbonIntensity } from '../../src/controller/getCarbonIntensity.ts';
import { CarbonIntensityService } from '../../src/service/CarbonIntensityService.ts';
import { Request, Response } from 'express';

describe('CarbonIntensityController', () => {
    let service: jest.Mocked<CarbonIntensityService>;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        service = {
            getAll: jest.fn(),
        } as unknown as jest.Mocked<CarbonIntensityService>;

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should return intensity data from service', async () => {
        const mockData = {
            data: [
                {
                    from: new Date(Date.UTC(2025, 5, 12, 0, 0, 0)),
                    to: new Date(Date.UTC(2025, 5, 12, 1, 0, 0)),
                    intensity: {
                        forecast: 100,
                        actual: 95,
                        index: 'moderate',
                    },
                },
            ],
        };

        service.getAll.mockResolvedValue(mockData);

        await getCarbonIntensity(service)(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith(mockData);
        expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors correctly', async () => {
        service.getAll.mockRejectedValue(new Error('Unit test simulated DB error'));

        await getCarbonIntensity(service)(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
