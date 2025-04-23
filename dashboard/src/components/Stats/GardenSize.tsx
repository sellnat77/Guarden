import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import location from "../../api/location";
import plant from "../../api/plant";
import routine from "../../api/routine";

function GardenSize() {
  const [locationCount, setLocationCount] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [routineCount, setRountineCount] = useState(0);

  const fetchStats = async () => {
    try {
      const { data: locationCount } = await location.stats();
      setLocationCount(locationCount);
      const { data: plantCount } = await plant.stats();
      setPlantCount(plantCount);
      const { data: routineCount } = await routine.stats();
      setRountineCount(routineCount);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchStats();
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
