import { CheckCircle } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { demoChannelTitle, demoThumbnailUrl, demoVideoUrl } from '../utils/constants';

const PlaylistCard = ({ playlist: { id: { playlistId }, snippet }}) => {
    console.log(playlistId);
    console.log(snippet);
    return (
        <Card sx={{
            width: { md: '320px', xs: '100%' }, boxShadow: 'none', borderRadius: 0, '&:hover': {}
        }}>
            <Link to={playlistId ? `/playlist/${playlistId}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                    alt={snippet?.title}
                    sx={{
                        width: 358, height: 180,
                    }}
                />
            </Link>
            <CardContent sx={{
                backgroundColor: '#1e1e1e', height: 106
            }} >
                <Link to={playlistId ? `/playlist/${playlistId}` : demoVideoUrl}>
                    <Typography variant="subtitle1" fontWeight={"bold"} color={"white"}>
                        {snippet?.title.slice(0, 60) || demoChannelTitle}
                        {snippet?.title.length > 60 ? ' ...' : ''}
                    </Typography>
                </Link>
                <Link to={snippet?.channelId && `/channel/${snippet?.channelId}`}>
                    <Typography variant="subtitle2" fontWeight={"bold"} color={"gray"}>
                        {snippet?.channelTitle || demoChannelTitle}
                        <CheckCircle sx={{
                            fontSize: 12, color: 'gray', ml: '5px'
                        }} />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

export default PlaylistCard;