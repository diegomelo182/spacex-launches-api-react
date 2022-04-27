import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Topbar } from '../shared/components';
import { LaunchList, LaunchFavorites, LaunchFilter } from '../launches/components';
import { ListContextProvider } from '../launches/contexts';

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ListContextProvider>
      <div>
        <Topbar />

        <Container>
          <h1>Launches filter</h1>

          <LaunchFilter />

          <h1>Launches list</h1>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Launches"
          >
            <Tab label="Upcoming launches" />
            <Tab label="Past launches" />
            <Tab label="Favorite launches" />
          </Tabs>

          {value === 0 && <LaunchList />}
          {value === 1 && <LaunchList order='desc' />}
          {value === 2 && <LaunchFavorites />}
        </Container>
      </div>
    </ListContextProvider>
  )
}
