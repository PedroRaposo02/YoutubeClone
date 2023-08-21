import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromApi } from '../utils/fetchFromApi';
import { Box, Stack, Typography } from '@mui/material';
import Videos from './Videos';

const SearchFeed = () => {

  const { searchTerm } = useParams()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const cachedVideos = localStorage.getItem(searchTerm)
    if (cachedVideos) {
      setVideos(JSON.parse(cachedVideos))
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
      })
    }
  }, [searchTerm])
  

  
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
          {searchTerm}
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
  )
}

export default SearchFeed