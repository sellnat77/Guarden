import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Plant } from "./types";

export const PlantShow = () => {
  const { query } = useShow<Plant>({});

  const { data, isLoading } = query;

  const record: Plant | undefined = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {record?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={6}>{JSON.stringify(record)}</Grid>
      </Grid>
    </Show>
  );
};
