import {
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import PlantCard from "./PlantCard";
import Plant from "../../interfaces/plant.interface";
import { useEffect, useState } from "react";
import plant from "../../api/plant";
import { useParams } from "react-router";
import defaultThumbnail from "../../assets/plant.svg";

function PlantGrid() {
  const { locationId } = useParams();
  const [plants, setPlants] = useState<Plant[] | null>(null);

  const fetchPlants = async (id: string | undefined) => {
    if (id) {
      try {
        const { data } = await plant.list(id);
        console.log(data);
        setPlants(data);
      } catch (error) {
        // Handle API errors
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("++++++++++++");
    fetchPlants(locationId);
  }, [locationId]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid key="AddPlant" size={{ xs: 6 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={defaultThumbnail}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add New Plant
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        {plants?.map((plant: Plant) => (
          <Grid key={plant.id} size={{ xs: 6 }}>
            <PlantCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PlantGrid;
