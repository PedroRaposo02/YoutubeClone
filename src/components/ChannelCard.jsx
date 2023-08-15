import { Box, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail: channel }) => {
    return (
        <Box sx={{
            boxShadow: 'none', borderRadius: '20px', '&:hover': {},
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', md: 358 },
            height: '326px',
            margin: 'auto'
        }}>
            <Link to={`/channel/${channel?.id?.channelId}`}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                }}>
                    <CardMedia
                        image={channel?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channel?.snippet?.title}
                        sx={{
                            borderRadius: '50%',
                            height: '180px',
                            width: '100%',
                            marginBottom: '2px',
                            border: '1px solid #e3e3e3'
                        }}
                    />
                    <Typography variant="h6">
                        {channel?.snippet?.title}
                        <CheckCircle sx={{
                            fontSize: 12, color: 'gray', ml: '5px'
                        }} />
                    </Typography>
                </CardContent>
            </Link>
        </Box>);
};

export default ChannelCard;