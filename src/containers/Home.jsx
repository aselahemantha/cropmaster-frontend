import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import backgroundImage from '../assets/background/background.jpg';
import { Link, useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const [userType, setUserType] = useState('farmer');

    const handleSignIn = () => {
        if (userType === 'farmer') {
            navigate('/farmerhome');
        } else if (userType === 'owner') {
            navigate('/ownerhome');
        }
    };

    return (
        <Container style={containerStyle}>
            <Typography variant="h2" align="center" color="text.primary">
                Welcome to Your Farm App
            </Typography>
            <Box mt={4}>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="userType"
                        name="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <FormControlLabel value="farmer" control={<Radio />} label="I'm a Farmer" />
                        <FormControlLabel value="owner" control={<Radio />} label="I'm an Owner" />
                    </RadioGroup>
                </FormControl>
                <Box mt={2}>
                    <Button variant="contained" color="primary" size="large" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
