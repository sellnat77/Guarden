import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Plant from "../../interfaces/plant.interface";

const defaultData: Plant = {
  id: "default",
  name: "Backyard Succ",
  description: "Backyard snippet text",
  thumbnailPath: "./backyard.webp",
  thumbnailDescription: "Default Backyard",
};

function PlantCard({ plant = defaultData }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={plant.thumbnailPath}
        title={plant.thumbnailDescription}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {plant.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
export default PlantCard;
