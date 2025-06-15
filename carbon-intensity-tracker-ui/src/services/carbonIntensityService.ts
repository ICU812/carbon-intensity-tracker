import type { CarbonIntensity } from '../types/CarbonIntensity.ts';
import apiClient from './apiClient.ts';

export const fetchCarbonIntensity = async (): Promise<CarbonIntensity[]> => {
  const response = await apiClient.get<{ data: CarbonIntensity[] }>('/intensity');
  return response.data.data;
};
