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
    const additionalOptionsChannel = {
      params: {
        part: 'snippet,statistics',
        id: id
      }
    };
    fetchFromApi(`channels`, additionalOptionsChannel)
      .then(data => setChannelDetail(data?.items[0]));

    const additionalOptionsChannelVideos = {
      params: {
        channelId: id,
        part: 'snippet',
        order: 'date',
      },
    };

    fetchFromApi(`search`, additionalOptionsChannelVideos)
      .then(data => setVideos(data?.items));
  }, [id]);

  return (
    <Box minHeight={'95vh'}>
      <Box sx={{
        background: 'linear-gradient(90deg, rgba(21, 244, 255, 0.9954441913439636) 0%, rgba(242, 0, 255, 1) 100%)',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'bottom',
      }}>
        <Box sx={{
          mt: '200px',
        }}>
          {channelDetail && <ChannelCard channelDetail={channelDetail}  />}
        </Box>
      </Box>
      <Box display={'flex'} p='2'>
        <Box sx={{
          mr: { sm: '100px' }
        }}>
          {videos && <Videos videos={videos} />}
        </Box>

      </Box>
    </Box>
  );
};

export default ChannelDetail;