import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

function GardenSize() {
  const [locationCount, setLocationCount] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [routineCount, setRountineCount] = useState(0);

  useEffect(() => {
    setLocationCount(2);
    setPlantCount(20);
    setRountineCount(5);
  }, []);

  return (
    <>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Your Garden"] }]}
        series={[
          { label: "Locations", data: [locationCount] },
          { label: "Plants", data: [plantCount] },
          { label: "Routines", data: [routineCount] },
        ]}
        height={300}
      />
    </>
  );
}

export default GardenSize;
