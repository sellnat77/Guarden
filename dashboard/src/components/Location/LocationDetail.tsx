import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Location from "../../interfaces/location.interface";
import location from "../../api/location";

const defaultData: Location = {
  id: "default",
  name: "Backyard",
  description: "Backyard snippet text",
  thumbnailPath: "assets/backyard.webp",
  thumbnailDescription: "Default Backyard",
};
import defaultThumbnail from "../../assets/backyard.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useSession } from "../../SessionContext";

function LocationDetail() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { locationId = defaultData.id } = useParams();
  const [locationDetail, setLocation] = useState(defaultData);
  const token = session?.user.token || "";

  const fetchLocation = async () => {
    try {
      const { data } = await location.detail(locationId, token);
      setLocation(data);
    } catch (error) {
      // Handle API errors
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={locationDetail.thumbnailPath ?? defaultThumbnail}
        title={
          locationDetail.thumbnailDescription ??
          defaultData.thumbnailDescription
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {locationDetail.name ?? defaultData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {locationDetail.description ?? defaultData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/${locationId}/plants`, { replace: true });
          }}
        >
          Plants
        </Button>
      </CardActions>
    </Card>
  );
}
export default LocationDetail;
