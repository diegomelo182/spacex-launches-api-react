import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';

import { ListContext } from '../../contexts';
import { LaunchItem } from '../../components';

export default function Favorites() {
  const { favorites } = useContext(ListContext);

  return (
    <Grid container spacing={2}>
      {favorites?.map((i, k) =>
        <LaunchItem key={k} launchesData={i} hideControls={true} />)}
    </Grid>
  );
}
