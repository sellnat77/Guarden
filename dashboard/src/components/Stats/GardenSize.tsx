import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import location from "../../api/location";
import plant from "../../api/plant";
import routine from "../../api/routine";
import { useSession } from "../../SessionContext";

function GardenSize() {
  const [locationCount, setLocationCount] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [routineCount, setRountineCount] = useState(0);
  const { session } = useSession();
  const token = session?.user.token || "";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: locationCount } = await location.stats(token);
        setLocationCount(locationCount);
        const { data: plantCount } = await plant.stats(token);
        setPlantCount(plantCount);
        const { data: routineCount } = await routine.stats(token);
        setRountineCount(routineCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [token]);

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
