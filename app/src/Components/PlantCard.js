import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddPlantModal from "./Modals/AddPlantModal";

const Plant = ({ token, plant, locationId, updatePlant }) => {
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const handlePlantModalOpen = () => {
    setPlantModalOpen(!plantModalOpen);
  };
  const handleAddPlant = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const species = formJson.species;
    const notes = formJson.notes;
    axios
      .post(
        `http://localhost:5000/plants/plant`,
        {
          name,
          species,
          notes,
          locationId,
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
    setPlantModalOpen(false);
  };

  const handleUpdatePlant = () => {
    const formData = new FormData();
    formData.append("name", plant.name);
    formData.append("species", plant.species);
    formData.append("notes", plant.notes);

    axios
      .patch(`http://localhost:5000/plants/${plant.id}`, formData, {
        headers: {
          Authorization: `Bearer ${updatePlant}`,
        },
      })
      .then((response) => {
        updatePlant();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {plant ? (
        <CardActionArea>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="plant.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {plant.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "Highlight" }}>
              {plant.species}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {plant.notes}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Chip
              icon={<LocalFloristIcon />}
              label={`${plantCount} ${plantCount === 1 ? "plant" : "plants"}`}
              variant="outlined"
            /> */}
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </CardActionArea>
      ) : (
        <div>
          <CardActionArea onClick={handlePlantModalOpen}>
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
          <AddPlantModal
            open={plantModalOpen}
            handleClose={handlePlantModalOpen}
            handleAddPlant={handleAddPlant}
          />
        </div>
      )}
    </Card>
  );
};

export default Plant;
