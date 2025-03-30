import {
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import PlantCard from "./PlantCard";
import Plant from "../../interfaces/plant.interface";

function PlantGrid() {
  const myPlants: Plant[] = [
    {
      id: "1",
      name: "Patio",
      description: "Patio snippet text",
      thumbnailPath: "./backyard.webp",
      thumbnailDescription: "Default Backyard",
    },
    {
      id: "2",
      name: "Backyard",
      description: "Backyard snippet text",
      thumbnailPath: "./backyard.webp",
      thumbnailDescription: "Default Backyard",
    },
  ];
  return (
    <>
      <Grid container spacing={4}>
        <Grid key="AddPlant" size={{ xs: 6 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="backyard.webp"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add New Plant
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        {myPlants.map((plant) => (
          <Grid key={plant.id} size={{ xs: 6 }}>
            <PlantCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PlantGrid;
