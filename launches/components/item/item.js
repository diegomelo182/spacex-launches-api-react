import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ListContext } from '../../contexts';

export default function Item({
  launchesData,
  hideControls = false,
}) {
  const { addFavorite, showAlert } = useContext(ListContext);

  const addToFavorites = () => {
    addFavorite(launchesData);
    showAlert('Launch added to favorites!');
  }

  return (
    <Grid item md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="265"
          image={launchesData.links.mission_patch_small}
          alt={launchesData.mission_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Launch Info
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="launch number"
                secondary={launchesData.flight_number}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="mission name"
                secondary={launchesData.mission_name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="mission year"
                secondary={launchesData.launch_year}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="mission success"
                secondary={launchesData.launch_success ? 'yes' : 'no'}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="rocket name"
                secondary={launchesData.rocket.rocket_name}
              />
            </ListItem>
          </List>
        </CardContent>
        {!hideControls &&
          <CardActions>
            <Button size="small" onClick={() => addToFavorites()}>
              Add to Favorites
            </Button>
          </CardActions>}
      </Card>
    </Grid>
  );
}
