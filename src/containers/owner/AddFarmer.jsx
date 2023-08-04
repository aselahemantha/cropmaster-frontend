// Home.jsx
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import FarmerCard from "../../components/owner/FarmerCard.jsx";

const OwnerHome = () => {
    const farmers = [
        {
            farmerID: 1,
            name: 'John Doe',
            age: 40,
            mobile: '+123456789',
            experience: '10 years',
            farmlands: [
                { id: 1, name: 'Farm 1', size: '10 acres', location: 'Location A' },
                { id: 2, name: 'Farm 2', size: '5 acres', location: 'Location B' },
            ],
        },
        // ... other farmer data
    ];

    return (
        <Box>
            <Typography variant="h5">Farmers</Typography>
            <Divider />
            {farmers.map((farmer) => (
                <FarmerCard key={farmer.farmerID} farmer={farmer} />
            ))}
        </Box>
    );
};

export default OwnerHome;
