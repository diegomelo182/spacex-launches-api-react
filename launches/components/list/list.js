import React, { useEffect, useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ListContext } from '../../contexts';
import { LaunchItem } from '../../components';
import { LaunchesService } from '../../../shared/services';

const launchesService = new LaunchesService();

export default function List({ order = 'asc' }) {
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { items = [], setItems, filter } = useContext(ListContext);

  useEffect(() => {
    launchesService.fetchAll({ limit: 4, order, ...filter }).then(({ data }) => {
      setItems(data);

      if (data?.length > 0 && !hasMore) setHasMore(true);
      if (Object.keys(filter).length === 0 && offset > 0) setOffset(0)
    }).catch(err => {
      console.log('error', err);
    })
  }, [setItems, order, filter]);

  const fetchMoreItems = async () => {
    try {
      const { data } = await launchesService.fetchAll({
        limit: 4, offset: (offset + 4), order, ...filter,
      });
      setOffset(offset + 4);
      setItems([...items, ...data]);

      if (data?.length === 0) setHasMore(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="scrollable-container">
      <InfiniteScroll
        dataLength={items.length * 20}
        next={() => fetchMoreItems()}
        hasMore={hasMore}
        loader={<h4 style={{ 'textAlign': 'center' }}>Loading...</h4>}
      >
        <Grid container spacing={2}>
          {items.map((i, k) =>
            <LaunchItem key={k} launchesData={i} />)}
        </Grid>
      </InfiniteScroll>
    </div>
  );
}
