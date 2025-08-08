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
import { useState, useEffect, useCallback } from "react";

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
import { useSession } from "../../SessionContext";
import AddLocationFormDialog from "./AddLocationFormDialog";

function LocationGrid() {
  const { session } = useSession();
  const [locations, setLocations] = useState(defaultLocations);
  const token = session?.user.token || "";

  const getLocations = useCallback(async () => {
    try {
      const { data } = await location.list(token);
      setLocations(data);
    } catch (error) {
      // Handle API errors
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <>
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
              <AddLocationFormDialog token={token} />
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
