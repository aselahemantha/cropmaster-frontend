import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';


export default function Student() {

    const nic = '200021404098';

    const paperStyle = { padding: '50px 20px', width: '500', margin: '20px auto' };
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [symptom, setSymptom] = useState('');


    const [selectedDisease, setSelectedDisease] = useState('');
    const [selectedFarmland, setSelectedFarmland] = useState('');

    const [farmlandData, setFarmlandData] = useState([]);
    const [diseaseData, setDiseaseData] = useState([]);

    useEffect(() => {
        const fetchFarmLandData = async () => {
            try {
                const response = await fetch('http://localhost:8080/farmland/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch farmer data');
                }
                const data = await response.json();
                setFarmlandData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFarmLandData();
    }, []);

    useEffect(() => {
        const fetchDiseaseData = async () => {
            try {
                const response = await fetch('http://localhost:8080/disease/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch disease data');
                }
                const data = await response.json();
                setDiseaseData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDiseaseData();
    }, []);



    const handleSubmit = () => {
        // Prepare the data object to send in the POST request
        const data = {
            name: name,
            type: type,
            symptom: symptom,
            transmission: transmission,
        };

        // Make the POST request using fetch
        fetch('http://localhost:8080/disease/addNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit the form.');
                }
                return response.json();
            })
            .then((responseData) => {
                // Handle the response from the backend if needed
                console.log('Form submitted successfully:', responseData);
                // Add any logic you need here after the form is successfully submitted
            })
            .catch((error) => {
                // Handle errors
                console.error('Error submitting the form:', error);
                // Add any error handling logic here if needed
            });
    };

    const handleDiseaseSubmit = () => {
        // Prepare the data object to send in the POST request
        const data = {
            farmlandID: selectedFarmland,
            diseaseID: selectedDisease,
            nic: nic,
        };

        // Make the POST request using fetch
        fetch('http://localhost:8080/hostcrop/addNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit the form.');
                }
                return response.json();
            })
            .then((responseData) => {
                // Handle the response from the backend if needed
                console.log('Form submitted successfully:', responseData);
                // Add any logic you need here after the form is successfully submitted
            })
            .catch((error) => {
                // Handle errors
                console.error('Error submitting the form:', error);
                // Add any error handling logic here if needed
            });
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box display="flex" justifyContent="center" alignItems="center" height={50}>
                    <h1>Add a Disease</h1>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h3>Enter details here!</h3>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        fullWidth={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Type"
                        variant="outlined"
                        fullWidth={true}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Transmission"
                        variant="outlined"
                        fullWidth={true}
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Symptoms"
                        variant="outlined"
                        fullWidth={true}
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                    />
                    <br />
                    <Box display="flex" justifyContent="left" alignItems="center" height={50} margin="auto">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            SUBMIT
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <Box display="flex" justifyContent="center" alignItems="center" height={50}>
                    <h1>Add a Disease</h1>
                </Box>

                {/* Select for Farmers */}
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Farm Land</InputLabel>
                    <Select
                        value={selectedFarmland}
                        onChange={(e) => setSelectedFarmland(e.target.value)}
                        label="Farmeland"
                    >
                        {farmlandData.map((farmland) => (
                            <MenuItem key={farmland.farmlandID} value={farmland.farmlandID}>
                                {farmland.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <InputLabel>Disease</InputLabel>
                    <Select
                        value={selectedDisease}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                        label="Disease"
                    >
                        {diseaseData.map((disease) => (
                            <MenuItem key={disease.diseaseID} value={disease.diseaseID}>
                                {disease.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Rest of the form... */}

                <br />
                <Box display="flex" justifyContent="left" alignItems="center" height={50} margin="auto">
                    <Button variant="contained" color="primary" onClick={handleDiseaseSubmit}>
                        SUBMIT
                    </Button>
                </Box>
            </Paper>

        </Container>

    );
}