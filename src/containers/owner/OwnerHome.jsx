import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import CropCard from "../../components/owner/CropCard.jsx";
import {useNic} from "../../components/NicContext.jsx";

const Home = () => {
    const totalFarmlands = 10; // Replace with actual values
    const croppedFarmlands = 7; // Replace with actual values
    const uncroppedFarmlands = 3; // Replace with actual values
    const { nic } = useNic(); // Get the nic value from context


    return (
        <Box>
            <Typography variant="h5">Home</Typography>
            <Divider />
            {/* Other content */}

            {/* Other content */}
        </Box>
    );
};

export default Home;
