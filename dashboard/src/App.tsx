// import React from "react";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import LocationGrid from "./components/Location/LocationGrid";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          <LocationGrid />
        </Box>
      </Container>
    </>
  );
}

export default App;
