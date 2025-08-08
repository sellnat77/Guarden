import { Button, Card, CardActions, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import tip from "../../api/tip";
import { useEffect, useState } from "react";

function TipOfTheDay() {
  const fetchTip = async () => {
    try {
      const { data } = await tip.random();
      setTip(data.tip);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTip();
  }, []);
  const [tipText, setTip] = useState("");

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Tip of the day
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {tipText}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={fetchTip}>
            More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default TipOfTheDay;
