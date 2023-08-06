import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import FarmlandDetailsCard from "../../components/owner/FarmlandDetailsCard.jsx";

const Home = () => {
    const [farmlands, setFarmlands] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/farmland/getAll')
            .then((response) => response.json())
            .then((data) => setFarmlands(data))
            .catch((error) => console.error('Error fetching farmlands:', error));
    }, []);

    const totalFarmlands = farmlands.length;
    const croppedFarmlands = farmlands.filter((farmland) => farmland.cropID !== 0).length;
    const uncroppedFarmlands = totalFarmlands - croppedFarmlands;

    return (
        <Box>
            <Typography variant="h5">Home</Typography>
            <Divider />

            {/* Display total, cropped, and uncropped farmland counts */}
            <Typography>Total Farmlands: {totalFarmlands}</Typography>
            <Typography>Cropped Farmlands: {croppedFarmlands}</Typography>
            <Typography>Uncropped Farmlands: {uncroppedFarmlands}</Typography>

            {/* Display farmland details */}
            <FarmlandDetailsCard farmlands={farmlands} />
        </Box>
    );
};

export default Home;
