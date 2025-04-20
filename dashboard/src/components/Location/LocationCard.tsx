import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Location from "../../interfaces/location.interface";
import { useNavigate } from "react-router";

const defaultData: Location = {
  id: "default",
  name: "Backyard",
  description: "Backyard snippet text",
  thumbnailPath: "assets/backyard.webp",
  thumbnailDescription: "Default Backyard",
};
import defaultThumbnail from "../../assets/backyard.webp";

function LocationCard({ location }: { location: Location }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={location.thumbnailPath ?? defaultThumbnail}
        title={
          location.thumbnailDescription ?? defaultData.thumbnailDescription
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location.name ?? defaultData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {location.description ?? defaultData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            const locationId = location.id;
            console.log(locationId);
            navigate(`/${locationId}/plants`, { replace: true });
            console.log("test");
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
export default LocationCard;
