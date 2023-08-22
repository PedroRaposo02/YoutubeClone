import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromApi } from '../utils/fetchFromApi';
import { Box, Typography } from '@mui/material';
import Videos from './Videos';

const SearchFeed = () => {

  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const cachedVideos = localStorage.getItem(searchTerm);
    if (cachedVideos) {
      setVideos(JSON.parse(cachedVideos));
    }
    else {
      fetchFromApi('search', {
        params: {
          part: 'snippet',
          q: searchTerm,
        }
      }).then(data => {
        setVideos(data?.items);
        localStorage.setItem(searchTerm, JSON.stringify(data?.items));
      });
    }
  }, [searchTerm]);

  return (
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
        Search Results for
        <span style={{
          color: '#f31503',
          marginLeft: '0.5rem',
          marginRight: '0.5rem'
        }}>
          {searchTerm}
        </span>
        videos 
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;