import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Video } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";

const VideoDetail = () => {

  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {

    // fetch video
    const cachedVideos = localStorage.getItem(id);
    if (cachedVideos !== 'undefined' && cachedVideos !== null) {
      console.log(JSON.parse(cachedVideos));
      setVideo(JSON.parse(cachedVideos));
    }
    else {
      fetchFromApi('videos', {
        params: {
          part: 'snippet,statistics',
          id: id,
        }
      }).then(data => {
        localStorage.setItem(id, JSON.stringify(data?.items[0]));
        console.log(data?.items[0]);
        setVideo(data?.items[0]);
      });
    }


    // fetch related videos
    const cachedRelatedVideos = localStorage.getItem(id + 'related');
    if (cachedRelatedVideos !== 'undefined' && cachedRelatedVideos !== null) {
      setRelatedVideos(JSON.parse(cachedRelatedVideos));

    }
    else {
      fetchFromApi('search', {
        params: {
          part: 'snippet',
          relatedToVideoId: id,
          maxResults: 20,
          type: 'video',
        }
      }).then(data => {
        localStorage.setItem(id + 'related', JSON.stringify(data?.items));
        setRelatedVideos(data?.items);
      });
    }

    // fetch comments
    const cachedComments = localStorage.getItem(id + 'comments');
    if (cachedComments !== 'undefined' || cachedComments !== null) {
      console.log(JSON.parse(cachedComments));
      setComments(JSON.parse(cachedComments));
    }
    else {
      fetchFromApi('commentThreads', {
        params: {
          part: 'snippet',
          videoId: id,
          maxResults: 20,
        }
      }).then(data => {
        console.log(data?.items);
        localStorage.setItem(id + 'comments', JSON.stringify(data?.items));
        setComments(data?.items);
      });
    }

  }, [id]);

  return (
    <Box minHeight={'95vh'} >
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box height={"100%"}>
          <Box sx={{
            width: '100%',
            height: 'auto',
            position: 'sticky',
            top: '8vh',
            zIndex: 1,
          }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              width="100%"
              height="30vh"
              controls
            />
          </Box>
          <Box
            width='100%'
            height='100%'
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              gap: 2,
              borderBottom: '1px solid #ccc',
            }}>
              <Box flex={1}>
                <Link to={`/channel/${video?.snippet?.channelId}`}>
                  <img
                    src={video?.snippet?.thumbnails?.default?.url}
                    alt={video?.snippet?.title}
                    style={{
                      width: '40px',
                      borderRadius: '50%',
                    }}
                  />
                </Link>
              </Box>
              

              <Box flex={12}>
                <Typography variant='body1' fontWeight='bold' color={'white'}>
                  {video?.snippet?.title}
                </Typography>
                <Link to={`/channel/${video?.snippet?.channelId}`}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                  alignItems={'center'}>
                    <Typography variant='body2' color='#606060'>
                      {video?.snippet?.channelTitle}
                    </Typography>
                    <CheckCircle sx={{
                      color: '#606060',
                      width: '15px',
                      marginLeft: '5px',
                    }} />
                  </Box>
                </Link>
                <Typography variant='body2' color='#606060'>
                  {video?.statistics?.viewCount} views • {new Date(video?.snippet?.publishedAt).toDateString()}
                </Typography>
              </Box>

              <Typography variant='body2' color='#606060'>
                Likes: {video?.statistics?.likeCount}
              </Typography>
            </Box>
            <Box sx={{
              p: 2,
              borderBottom: '1px solid #ccc',
            }}>
              <Typography variant='body1' fontWeight='bold' color={'white'}>
                Comments
              </Typography>
              <Box>
                {comments?.map(comment => (
                  <Box key={comment?.id} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mt: 2,
                  }}>
                    <Link to={`/channel/${comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
                    >
                      <img
                        src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                        alt={comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                        style={{
                          width: '40px',
                          borderRadius: '50%',
                        }}
                      />
                    </Link>
                    <Box>
                      <Typography variant='body1' fontWeight='bold' color={'white'}>
                        {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                      </Typography>
                      <Typography variant='body2' color='#606060'>
                        {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
                      </Typography>
                      <Typography variant='body2' color='#606060'>
                        {new Date(comment?.snippet?.topLevelComment?.snippet?.publishedAt).toDateString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;