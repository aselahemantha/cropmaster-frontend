// AddFarmland.jsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddFarmland = () => {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');

    const handleAddFarmland = () => {
        // Perform logic to add farmland using the entered data
        // For example, you can send an API request to the backend
        // to add the farmland with the provided details.
        console.log('Adding Farmland:', { name, size, location });
    };

    return (
        <Container>
            <Typography variant="h4" align="center" mt={5} mb={3}>
                Add Farmland
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2, width: '70%' }}
                />
                <TextField
                    label="Size"
                    variant="outlined"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    fullWidth
                    sx={{ mb: 2, width: '70%' }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                />
                <Button variant="contained" color="primary" onClick={handleAddFarmland}>
                    Add Farmland
                </Button>
            </Box>
        </Container>
    );
};

export default AddFarmland;
