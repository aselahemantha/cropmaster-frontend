// FarmLandCard.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function FarmLandCard({ nic, name, age, mobile, experience }) {
    const cardContent = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Farmer ID: {nic}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Age: {age}
                </Typography>
                <Typography variant="body2">Mobile: {mobile}</Typography>
                <Typography variant="body2">Experience: {experience || 'N/A'}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{cardContent}</Card>
        </Box>
    );
}

export default FarmLandCard;
