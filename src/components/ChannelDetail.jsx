import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromApi } from '../utils/fetchFromApi';

const ChannelDetail = () => {

  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const cachedChannel = localStorage.getItem(id);
    if (cachedChannel !== 'undefined' && cachedChannel !== null) {
      setChannelDetail(JSON.parse(cachedChannel));
    }
    else {
      const additionalOptionsChannel = {
        params: {
          part: 'snippet,statistics',
          id: id
        }
      };
      fetchFromApi(`channels`, additionalOptionsChannel)
        .then(data => {
          localStorage.setItem(id, JSON.stringify(data?.items[0]));
          setChannelDetail(data?.items[0]);
        });
    }

    const cachedVideos = localStorage.getItem(id + 'videos');
    if (cachedVideos !== 'undefined' && cachedVideos !== null) {
      setVideos(JSON.parse(cachedVideos));
    }
    else {
      const additionalOptionsChannelVideos = {
        params: {
          channelId: id,
          part: 'snippet',
          order: 'date',
        },
      };

      fetchFromApi(`search`, additionalOptionsChannelVideos)
        .then(data => {
          localStorage.setItem(id + 'videos', JSON.stringify(data?.items));
          setVideos(data?.items);
        });
    }

  }, [id]);

  const backgroundImage = `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})` || 'linear-gradient(90deg, rgba(21, 244, 255, 0.9954441913439636) 0%, rgba(242, 0, 255, 1) 100%)';
  console.log(backgroundImage);

  return (
    <Box minHeight={'95vh'}>
      <Box mb={'200px'} sx={{
        backgroundImage: backgroundImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'bottom',
      }}>
        <Box sx={{
          mt: '200px',
        }}>
          {channelDetail && <ChannelCard channelDetail={channelDetail} />}
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'center'} p='2'>
        <Box display='flex' justifyContent={'center'} mx={2}>
          {videos && <Videos videos={videos} />}
        </Box>

      </Box>
    </Box>
  );
};

export default ChannelDetail;