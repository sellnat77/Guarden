import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Location from "../../interfaces/location.interface";

const defaultData: Location = {
  id: "default",
  title: "Backyard",
  description: "Backyard snippet text",
  thumbnailPath: "./backyard.webp",
  thumbnailDescription: "Default Backyard",
};

function LocationCard({ location = defaultData }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={location.thumbnailPath}
        title={location.thumbnailDescription}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {location.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            console.log(location.plants);
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
export default LocationCard;
