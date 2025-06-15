export interface Intensity {
  forecast: number;
  actual: number;
  index: string;
}

export interface CarbonIntensity {
  from: string;
  to: string;
  intensity: Intensity;
}
