import { Button, Card, CardActions, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function TipOfTheDay() {
  const tips = [
    "Water plants deeply but less frequently to encourage strong roots.",
    "Mulch around your plants to retain moisture and suppress weeds.",
    "Choose plants that thrive in your local climate and soil conditions for best growth.",
    "Use a timer or plant tags to help you remember which plants need watering and when.",
    "Experiment with different types of mulches like wood chips, straw, or compost to improve soil health.",
    "Plant flowers around the edges of your garden beds to add color and fragrance.",
    "Regularly remove dead leaves and spent blooms to encourage new growth.",
    "Consider using drip irrigation for a more efficient watering system that helps reduce water loss through evaporation.",
  ];

  // Select a random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const [tip, setTip] = useState(randomTip);

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Tip of the day
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {tip}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setTip(randomTip);
            }}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default TipOfTheDay;
