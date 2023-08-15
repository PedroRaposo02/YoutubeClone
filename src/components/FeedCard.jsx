import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { demoChannelTitle, demoChannelUrl, demoVideoTitle, demoVideoUrl } from '../utils/constants';
import { CheckCircle } from '@mui/icons-material';

const FeedCard = ({ id, snippet, type }) => {

    let typeOfMedia;


    if (type === 'video') {
        typeOfMedia = 'video';
    } else if (type === 'playlist') {
        typeOfMedia = 'playlist';
    } else {
        return <></>;
    }


    return (
        <Card
            width={'100%'}
            sx={{
            borderRadius: 1, backgroundColor: '#1e1e1e', color: 'white', mb: '10px', '&:hover': { boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)'}
        }}>
            <Link to={id ? `/${typeOfMedia}/${id}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                    sx={{
                        width: '100%',
                        aspectRatio: '358/180',
                    }}
                />
            </Link>
            <CardContent sx={{
                backgroundColor: '#1e1e1e', width: '100%',
                aspectRatio: '358/70'
            }} >
                <Link to={id ? `/video/${id}` : demoVideoUrl}>
                    <Typography variant="subtitle1" fontWeight={"bold"} color={"white"}>
                        {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                        {snippet?.title.length > 60 ? ' ...' : ''}
                    </Typography>
                </Link>
                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
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

export default FeedCard;