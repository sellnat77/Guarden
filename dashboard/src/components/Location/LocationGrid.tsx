import {
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import LocationCard from "./LocationCard";
import Location from "../../interfaces/location.interface";

function LocationGrid() {
  const myLocations: Location[] = [
    {
      id: "1",
      title: "Patio",
      description: "Patio snippet text",
      thumbnailPath: "./backyard.webp",
      thumbnailDescription: "Default Backyard",
      plants: [
        {
          id: "plant 1",
          name: "Patio plant",
          description: "Patio snippet text",
          thumbnailPath: "./backyard.webp",
          thumbnailDescription: "Default Backyard",
        },
      ],
    },
    {
      id: "2",
      title: "Backyard",
      description: "Backyard snippet text",
      thumbnailPath: "./backyard.webp",
      thumbnailDescription: "Default Backyard",
      plants: [
        {
          id: "plant 2",
          name: "Backyard plant",
          description: "backyard plant snippet text",
          thumbnailPath: "./backyard.webp",
          thumbnailDescription: "Default Backyard",
        },
      ],
    },
  ];
  return (
    <>
      <Grid container spacing={4}>
        <Grid key="AddLocation" size={{ xs: 6 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="backyard.webp"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add New Location
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        {myLocations.map((loc) => (
          <Grid key={loc.id} size={{ xs: 6 }}>
            <LocationCard location={loc} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LocationGrid;
