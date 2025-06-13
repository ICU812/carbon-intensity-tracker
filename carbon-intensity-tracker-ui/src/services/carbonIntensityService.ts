import axios from 'axios';

export interface CarbonIntensity {
    id: number;
    from: string;
    to: string;
    intensity_forecast: number;
    intensity_actual: number;
    index: string;
    gas: number;
    coal: number;
    biomass: number;
    nuclear: number;
    hydro: number;
    imports: number;
    wind: number;
    solar: number;
    other: number;
    total: number;
}

const API_BASE_URL = '/api';

export const fetchCarbonIntensity = async (): Promise<CarbonIntensity[]> => {
    const response = await axios.get(`${API_BASE_URL}/intensity`);
    return response.data;
};
