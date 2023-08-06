import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import FarmlandDetailsCard from "../../components/owner/FarmlandDetailsCard.jsx";
import './OwnerHome.css'; // Import the CSS file for styling
import backgroundImg from '../../assets/background/background1.jpg';
import { Container } from '@mui/system';

const Home = () => {
    const [farmlands, setFarmlands] = useState([]);
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/farmland/getAll')
            .then((response) => response.json())
            .then((data) => setFarmlands(data))
            .catch((error) => console.error('Error fetching farmlands:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/farmer/getAll')
            .then((response) => response.json())
            .then((data) => setFarmers(data))
            .catch((error) => console.error('Error fetching farmlands:', error));
    }, []);

    const totalFarmlands = farmlands.length;
    const croppedFarmlands = farmlands.filter((farmland) => farmland.cropID !== 0).length;
    const uncroppedFarmlands = totalFarmlands - croppedFarmlands;

    const totalFarmers = farmers.length;
    const experincedFarmers = farmers.filter((farmer) => farmer.experince !== '').length;

    return (
        <Container style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px' }} >
            <Box   sx = {{backgroundColor: 'rgba(1, 32, 93, 0.2)',
                padding: '20px',
                borderRadius: '8px'}} >
                <Typography variant="h5" className="welcome-heading">
                    Welcome to the Dashboard
                </Typography>
                <Divider />

                {/* Display total, cropped, and uncropped farmland counts */}
                <div className="count-box">
                    <Typography className="count-label">
                        Total Farmlands:
                    </Typography>
                    <Typography className="count-value">
                        {totalFarmlands}
                    </Typography>
                </div>
                <div className="count-box">
                    <Typography className="count-label">
                        Cropped Farmlands:
                    </Typography>
                    <Typography className="count-value">
                        {croppedFarmlands}
                    </Typography>
                </div>
                <div className="count-box">
                    <Typography className="count-label">
                        Uncropped Farmlands:
                    </Typography>
                    <Typography className="count-value">
                        {uncroppedFarmlands}
                    </Typography>
                </div>
                <Divider />
                <div className="count-box">
                    <Typography className="count-label">
                        Total Farmers:
                    </Typography>
                    <Typography className="count-value">
                        {totalFarmers}
                    </Typography>
                </div>
                <div className="count-box">
                    <Typography className="count-label">
                        Experienced Farmers:
                    </Typography>
                    <Typography className="count-value">
                        {experincedFarmers}
                    </Typography>
                </div>
                <div className="count-box">
                    <Typography className="count-label">
                        Inexperienced Farmers:
                    </Typography>
                    <Typography className="count-value">
                        {totalFarmers - experincedFarmers}
                    </Typography>
                </div>
                {/* Display farmland details */}
                <FarmlandDetailsCard farmlands={farmlands} />
            </Box>
        </Container>
    );
};



export default Home;