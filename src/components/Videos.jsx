import { Stack, Box } from '@mui/material';
import React from 'react';

import { ChannelCard, FeedCard } from './';

const Videos = ({ videos }) => {
  console.log(videos)
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row"
      }}
      flexWrap={"wrap"}
      justifyContent={{
        xs: "center",
        md: "space-between"	
      }}
      alignItems={{
        xs: "center",
        md: 'center'
      }}
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx} flex={1} maxWidth={{
          md: 550,
          xs: 450
        }} minWidth={{
          md: 358,
          xs: 450
        }}>
          {item.id.videoId && <FeedCard id={item.id.videoId} snippet={item.snippet} type={'video'} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
          {item.id.playlistId && <FeedCard id={item.id.playlistId} snippet={item.snippet} type={'playlist'} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;