import React, { useState } from "react";
import { fetchCarbonIntensity } from "../services/carbonIntensityService";
import type { CarbonIntensity } from "../types/CarbonIntensity";

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<CarbonIntensity[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = async () => {
    console.log("Button has been clicked");
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCarbonIntensity();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message ?? "An unexpected error occurred.");
      } else {
        console.error("Unknown error", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Carbon Intensity Data</h1>
      <button onClick={handleLoadData}>Load Data</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Forecast</th>
              <th>Actual</th>
              <th>Index</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, idx) => (
              <tr key={idx}>
                <td>{record.from}</td>
                <td>{record.to}</td>
                <td>{record.intensity.forecast}</td>
                <td>{record.intensity.actual}</td>
                <td>{record.intensity.index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
