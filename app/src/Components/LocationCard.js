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
import EditLocationModal from "./Modals/EditLocationModal";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate } from "react-router-dom";

const LocationCard = ({ token, location, handleAddNewLocation }) => {
  const navigate = useNavigate();
  const [locationModalOpen, setOpen] = React.useState(false);
  const [editLocationModalOpen, setOpenEditModal] = React.useState(false);
  const [deleteLocationModalOpen, setOpenDeleteModal] = React.useState(false);
  const plantCount = location && location.plants ? location.plants.length : 0;

  const openLocationModal = () => {
    setOpen(!locationModalOpen);
  };

  const openEditLocationModal = () => {
    setOpenEditModal(!editLocationModalOpen);
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
      .then((response) => {
        console.log(response.data);
        handleAddNewLocation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setOpen(false);
  };

  const handleEditLocation = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const description = formJson.description;
    axios
      .patch(
        `http://localhost:5000/locations/location/${location.id}`,
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
    setOpenEditModal(false);
  };

  const handleDeleteLocation = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/locations/location/${location.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    setOpenDeleteModal(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {location ? (
        <div>
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
          </CardActionArea>
          <CardActions>
            <Chip
              icon={<LocalFloristIcon />}
              label={`${plantCount} ${plantCount === 1 ? "plant" : "plants"}`}
              variant="outlined"
            />
            <Button size="small" onClick={openEditLocationModal}>
              Edit
            </Button>
            <Button size="small">Delete</Button>
          </CardActions>
          <EditLocationModal
            location={location}
            open={editLocationModalOpen}
            handleClose={openEditLocationModal}
            handleEditLocation={handleEditLocation}
          />
        </div>
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
