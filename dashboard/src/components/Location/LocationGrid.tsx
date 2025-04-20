import {
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import LocationCard from "./LocationCard";
import Location from "../../interfaces/location.interface";
import location from "../../api/location";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";

const defaultLocations: Location[] = [
  {
    id: "1",
    name: "Patio",
    description: "Patio snippet text",
    thumbnailPath: "./backyard.webp",
    thumbnailDescription: "Default Backyard",
  },
];
import defaultThumbnail from "../../assets/backyard.webp";

function LocationGrid() {
  const [locations, setLocations] = useState(defaultLocations);
  const fetchLocations = async () => {
    try {
      const { data } = await location.list();
      setLocations(data);
    } catch (error) {
      // Handle API errors
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <Outlet />
      <Grid container spacing={4}>
        <Grid key="AddLocation" size={{ xs: 6 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={defaultThumbnail}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add New Location
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        {locations.map((loc) => (
          <Grid key={loc.id} size={{ xs: 6 }}>
            <LocationCard location={loc} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LocationGrid;
