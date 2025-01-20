import React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationCard from "./LocationCard"; // Import the LocationCard component
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const HomePage = ({ token }) => {
  const [locations, setLocations] = useState([]);
  const [chartData, setChartData] = useState([]);
  const xLabels = [
    "day 1",
    "day 2",
    "day 3",
    "day 4",
    "day 5",
    "day 6",
    "day 7",
    "day 8",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setLocations(response.data);

        // Dummy data for the chart
        const chartData = [1, 1, 3, 2, 2, 6, 3, 8];

        setChartData(chartData);
        console.log(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Guardian
          </Typography>
          <Button variant="contained">Profile</Button>
          <Button variant="contained">Settings</Button>
          <Button variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Tip of the day card */}
        <Card sx={{ width: "100%", marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h5" component="h3">
            Tip of the Day
          </Typography>
          <Typography gutterBottom>
            {"Don't forget to water the plants."}
          </Typography>
        </Card>

        {/* Grid2 of location cards */}
        <Grid2 container spacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
          {locations.map((location) => (
            <Grid2 item key={location.id}>
              <LocationCard token={token} location={location} />
            </Grid2>
          ))}
          <Grid2 item key={"add-location"}>
            <LocationCard token={token} />
          </Grid2>
        </Grid2>

        {/* Plant health over time card */}
        <Card sx={{ width: "100%", marginTop: 4 }}>
          <Typography variant="h5" component="h3">
            Plant Health Over Time
          </Typography>
          {chartData.length > 0 && (
            <LineChart
              width={500}
              height={300}
              series={[
                {
                  data: chartData,
                  label: "Health Score",
                },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
