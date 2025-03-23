import React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import { Box, Divider } from "@mui/material";

const Location = ({ token }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { location } = state;

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Guardian
          </Typography>
          <Button variant="contained" onClick={goHome}>
            Home
          </Button>
          <Button variant="contained">Profile</Button>
          <Button variant="contained">Settings</Button>
          <Button variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">{location.name}</Typography>
      </Box>
      <Divider />
      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Grid2 of location cards */}
        <Grid2 container spacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
          {location &&
            location.plants &&
            location.plants.map((plant) => (
              <Grid2 item key={plant.id}>
                <PlantCard token={token} plant={plant} />
              </Grid2>
            ))}
          <Grid2 item key={"add-plant"}>
            <PlantCard token={token} locationId={location.id} />
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default Location;
