// Home.jsx
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import backgroundImage from '../assets/background/background.jpg';

const Home = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    return (
        <Container style={containerStyle}>
            <Typography variant="h2" align="center" color="text.primary">
                Welcome to Your Farm App
            </Typography>
            <Box mt={4}>
                <Button variant="contained" color="primary" size="large">
                    I'm an Owner
                </Button>
                <Button variant="contained" color="secondary" size="large">
                    I'm a Farmer
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
