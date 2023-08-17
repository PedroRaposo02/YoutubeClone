import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { fetchFromApi } from '../utils/fetchFromApi';
import { Sidebar, Videos } from './';



const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [videos, setVideos] = useState([]);
  const { category } = useParams();
  const route = useNavigate();

  const handleCategoryChange = (category) => {
    if (category === 'New' || category === '') {
      route('/');
    }
    else {
      route(`/${category}`);
    }
  }

  console.log(category);

  // Set the selectedCategory based on the URL parameter
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('New');
    }
  }, [category]);

  useEffect(() => {

    const cachedVideos = localStorage.getItem(selectedCategory);
    if (cachedVideos) {
      setVideos(JSON.parse(cachedVideos));
    }
    else {
      const additionalOptions = {
        params: {
          part: 'snippet,statistics',
          q: selectedCategory,
        }
      };
      fetchFromApi('search', additionalOptions)
        .then((data) => {
          setVideos(data.items);
          localStorage.setItem(selectedCategory, JSON.stringify(data?.items));
        });
    }

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
          handleCategoryChange={handleCategoryChange}
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