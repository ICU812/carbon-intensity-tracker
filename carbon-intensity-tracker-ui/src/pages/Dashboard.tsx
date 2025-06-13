import React, { useState } from 'react';
import { fetchCarbonIntensity, type CarbonIntensity } from '../services/carbonIntensityService';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<CarbonIntensity[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = async () => {
    console.log('Button has been clicked')
    setLoading(true);
    setError(null);
    try {
        console.log('Button has been clicked')
      const result = await fetchCarbonIntensity();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Carbon Intensity Data</h1>
      <button onClick={handleLoadData}>Load Data</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Forecast</th>
              <th>Actual</th>
            </tr>
          </thead>
          <tbody>
            {data.map(record => (
              <tr key={record.id}>
                <td>{record.from}</td>
                <td>{record.to}</td>
                <td>{record.intensity_forecast}</td>
                <td>{record.intensity_actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
