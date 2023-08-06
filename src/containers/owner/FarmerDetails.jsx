import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import FarmerCard from "../../components/owner/FarmerCard.jsx";

const FarmerDetails = () => {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        // Fetch farmer data from API
        fetch('http://localhost:8080/farmer/getAll')
            .then(response => response.json())
            .then(data => setFarmers(data))
            .catch(error => console.error('Error fetching farmers:', error));
    }, []);

    return (
        <Box>
            <Typography variant="h5">Farmers</Typography>
            <Divider />
            {farmers.map(farmer => (
                <FarmerCard key={farmer.farmerID} farmer={farmer} />
            ))}
        </Box>
    );
};

export default FarmerDetails;
