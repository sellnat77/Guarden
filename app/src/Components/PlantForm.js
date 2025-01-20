import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const PlantForm = ({ onSubmit, initialData }) => {
  const [data, setData] = useState({
    name: "",
    species: "",
    notes: "",
    lastWatered: null,
    lastPruned: null,
    lastFertilized: null,
    lastRePotted: null,
    locationId: "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateTimeChange = (event, name) => {
    setData({
      ...data,
      [name]: event,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Plant Details
      </Typography>
      <TextField
        name="name"
        value={data.name}
        onChange={handleInputChange}
        label="Name"
        fullWidth
      />
      <TextField
        name="species"
        value={data.species}
        onChange={handleInputChange}
        label="Species"
        fullWidth
      />
      <TextField
        name="notes"
        value={data.notes}
        onChange={handleInputChange}
        label="Notes"
        multiline
        rows={4}
        fullWidth
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} helperText={false} />}
          name="lastWatered"
          value={data.lastWatered}
          onChange={(event) => handleDateTimeChange(event, "lastWatered")}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} helperText={false} />}
          name="lastPruned"
          value={data.lastPruned}
          onChange={(event) => handleDateTimeChange(event, "lastPruned")}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} helperText={false} />}
          name="lastFertilized"
          value={data.lastFertilized}
          onChange={(event) => handleDateTimeChange(event, "lastFertilized")}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} helperText={false} />}
          name="lastRePotted"
          value={data.lastRePotted}
          onChange={(event) => handleDateTimeChange(event, "lastRePotted")}
        />
      </LocalizationProvider>
      <TextField
        name="locationId"
        value={data.locationId}
        onChange={handleInputChange}
        label="Location ID"
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PlantForm;
