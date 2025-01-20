import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Typography,
  CardActionArea,
  Chip,
} from "@mui/material";
import AddLocationModal from "./Modals/AddLocationModal";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate } from "react-router-dom";

const LocationCard = ({ token, location }) => {
  const navigate = useNavigate();
  const [locationModalOpen, setOpen] = React.useState(false);

  const openLocationModal = () => {
    setOpen(!locationModalOpen);
  };

  const goToLocationDetail = () => {
    navigate("/location", { state: { location, token } });
  };

  const handleAddLocation = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const description = formJson.description;
    axios
      .post(
        `http://localhost:5000/locations/location`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    setOpen(false);
  };

  const [plantCount, setPlantCount] = useState(0); // Placeholder for the actual plant count
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (location) {
      axios
        .get(`http://localhost:5000/plants/location/${location.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setPlants(response.data);
            setPlantCount(plants.length);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location, plants, token]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {location ? (
        <CardActionArea onClick={goToLocationDetail}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="plant.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {location.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Chip
              icon={<LocalFloristIcon />}
              label={`${plantCount} ${plantCount === 1 ? "plant" : "plants"}`}
              variant="outlined"
            />
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </CardActionArea>
      ) : (
        <div>
          <CardActionArea onClick={openLocationModal}>
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
          <AddLocationModal
            open={locationModalOpen}
            handleClose={openLocationModal}
            handleAddLocation={handleAddLocation}
          />
        </div>
      )}
    </Card>
  );
};

export default LocationCard;
