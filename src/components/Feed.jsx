import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';


import { fetchFromApi } from '../utils/fetchFromApi';
import { Sidebar, Videos } from './';



const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`, null)
      .then((data) => {
        console.log(data);
        setVideos(data.items);
      });
  }, [selectedCategory]);

  return (
    <Stack sx={{
      flexDirection: { xs: "column", md: "row" }
    }}>
      <Box sx={{
        height: {
          xs: "auto",
          md: "89vh"
        }, borderRight: '1px solid #3d3d3d',
        px: { xs: 0, md: 2 },
      }}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography className='copyright' variant='body2' sx={{
          mt: 1.5, color: '#fff', textAlign: 'center', fontSize: '0.8rem'
          }}>
          Copyright 2022 Pedro Raposo
        </Typography>
      </Box>
      <Box sx={{
        p: 2,
        ml: 2,
        height: '89vh',
        overflowY: 'auto',
        flex: 2
      }}>
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{
          color: '#fff'
        }}>
          {selectedCategory}
          <span style={{
            color: '#f31503',
            marginLeft: '0.5rem'
          }}>
            videos
          </span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;