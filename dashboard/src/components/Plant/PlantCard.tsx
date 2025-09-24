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
  species: "Succulent",
  notes: "Backyard snippet text",
  thumbnailPath: "assets/backyard.webp",
  thumbnailDescription: "Default Backyard",
};
import defaultThumbnail from "../../assets/plant.svg";
interface PlantProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={plant.thumbnailPath ?? defaultThumbnail}
        title={plant.thumbnailDescription ?? defaultData.thumbnailDescription}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name ?? defaultData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {plant.notes ?? defaultData.notes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {}}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
export default PlantCard;
