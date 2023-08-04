import React, {useEffect, useState} from 'react';
import {
    Typography,
    TextField,
    Button,
    Container,
    Paper, MenuItem, Select,
} from '@mui/material';

const AddStorageMethod = () => {
    const [storageData, setStorageData] = useState({
        name: '',
        location: '',
        capacity: '',
        humidity: '',
        temperature: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStorageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/storage/addNew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storageData),
            });

            if (!response.ok) {
                throw new Error('Failed to add storage method');
            }

            // Show success message or update state
            console.log('Storage method added successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const [storageMethods, setStorageMethods] = useState([]);
    const [farmlands, setFarmlands] = useState([]);
    const [selectedStorageMethod, setSelectedStorageMethod] = useState('');
    const [selectedFarmland, setSelectedFarmland] = useState('');

    useEffect(() => {
        const fetchStorageMethods = async () => {
            try {
                const response = await fetch('http://localhost:8080/storage/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch storage methods');
                }
                const data = await response.json();
                setStorageMethods(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchFarmlands = async () => {
            try {
                const response = await fetch('http://localhost:8080/farmland/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch farmlands');
                }
                const data = await response.json();
                setFarmlands(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStorageMethods();
        fetchFarmlands();
    }, []);

    const handleAssignStorage = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/farmland/updateStorage/${selectedFarmland}/${selectedStorageMethod}`,
                {
                    method: 'PUT',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to assign storage to farmland');
            }

            // Show success message or update state
            console.log('Storage assigned to farmland successfully');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Storage Method
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={storageData.name}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    value={storageData.location}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Capacity"
                    name="capacity"
                    fullWidth
                    value={storageData.capacity}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Humidity"
                    name="humidity"
                    fullWidth
                    value={storageData.humidity}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Temperature"
                    name="temperature"
                    fullWidth
                    value={storageData.temperature}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Add Storage Method
                </Button>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Assign Storage to Farmland
                </Typography>
                <Select
                    value={selectedStorageMethod}
                    onChange={(e) => setSelectedStorageMethod(e.target.value)}
                    fullWidth
                    label="Select Storage Method"
                    sx={{ mt: 2 }}
                >
                    {storageMethods.map((method) => (
                        <MenuItem key={method.storageID} value={method.storageID}>
                            {method.name}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={selectedFarmland}
                    onChange={(e) => setSelectedFarmland(e.target.value)}
                    fullWidth
                    label="Select Farmland"
                    sx={{ mt: 2 }}
                >
                    {farmlands.map((farmland) => (
                        <MenuItem key={farmland.farmlandID} value={farmland.farmlandID}>
                            {farmland.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    onClick={handleAssignStorage}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Assign Storage to Farmland
                </Button>
            </Paper>

        </Container>
    );
};

export default AddStorageMethod;
