import { Box, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, customStyles }) => {

    const formatter = new Intl.NumberFormat('en-US'); // Use the appropriate locale code here
    const subscriberCount = channelDetail?.statistics?.subscriberCount;
    const formattedNumber = formatter.format(subscriberCount);

    return (
        <Box sx={{
            boxShadow: 'none',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', md: 358 },
            height: '326px',
            margin: 'auto',
            ...customStyles
        }}>
            <Link to={`/channel/${channelDetail?.id?.channelId}`}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                }}>
                    <CardMedia
                        image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channelDetail?.snippet?.title}
                        sx={{
                            borderRadius: '50%',
                            minHeight: '180px',
                            maxHeight: '250px',
                            aspectRatio: '1/1',
                            marginBottom: '2px',
                            border: '1px solid #e3e3e3'
                        }}
                    />
                    <Typography variant="h6">
                        {channelDetail?.snippet?.title}
                        <CheckCircle sx={{
                            fontSize: 12, color: 'gray', ml: '5px'
                        }} />
                    </Typography>
                    {channelDetail?.statistics?.subscriberCount && <Typography variant="subtitle2" color="gray">
                        {
                            formattedNumber
                        } Subscribers
                    </Typography>} 
        
                </CardContent>
            </Link>
        </Box>);
};

export default ChannelCard;