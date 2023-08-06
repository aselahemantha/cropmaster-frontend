import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';

const FarmlandDetailsCard = ({ farmlands }) => {
    const [selectedFarmland, setSelectedFarmland] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [soilData, setSoilData] = useState(null);
    const [openWeatherDialog, setOpenWeatherDialog] = useState(false);
    const [openSoilDialog, setOpenSoilDialog] = useState(false);

    useEffect(() => {
        // Fetch weather data
        if (selectedFarmland) {
            fetch(`http://localhost:8080/weather/getDetails/${selectedFarmland.farmlandID}`)
                .then((response) => response.json())
                .then((data) => setWeatherData(data))
                .catch((error) => console.error('Error fetching weather data:', error));

            // Fetch soil data
            fetch(`http://localhost:8080/soil/getDetails/${selectedFarmland.farmlandID}`)
                .then((response) => response.json())
                .then((data) => setSoilData(data))
                .catch((error) => console.error('Error fetching soil data:', error));
        }
    }, [selectedFarmland]);

    const handleOpenWeatherDialog = () => {
        setOpenWeatherDialog(true);
    };

    const handleCloseWeatherDialog = () => {
        setOpenWeatherDialog(false);
    };

    const handleOpenSoilDialog = () => {
        setOpenSoilDialog(true);
    };

    const handleCloseSoilDialog = () => {
        setOpenSoilDialog(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
                Farmland Details
            </Typography>
            <Divider />
            {selectedFarmland && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Selected Farmland: {selectedFarmland.name}</Typography>
                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleOpenWeatherDialog}>
                        View Weather Data
                    </Button>
                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleOpenSoilDialog}>
                        View Soil Data
                    </Button>
                </div>
            )}
            {farmlands.map((farmland) => (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f7f7f7' }} key={farmland.farmlandID}>
                    <Typography variant="h6">{farmland.name}</Typography>
                    <Typography>Size: {farmland.size}</Typography>
                    <Typography>Location: {farmland.location}</Typography>
                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => setSelectedFarmland(farmland)}>
                        View Details
                    </Button>
                </div>
            ))}
            <Dialog open={openWeatherDialog} onClose={handleCloseWeatherDialog}>
                <DialogTitle>Weather Data for {selectedFarmland?.name}</DialogTitle>
                <DialogContent>
                    {weatherData ? (
                        <List>
                            <ListItem>
                                <ListItemText primary={`Temperature: ${weatherData.temperature}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Humidity: ${weatherData.humidity}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Wind Speed: ${weatherData.windspeed}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Rainfall: ${weatherData.rainfall}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Radiation: ${weatherData.radiation}`} />
                            </ListItem>
                        </List>
                    ) : (
                        <Typography>No weather data available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWeatherDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Soil Data Dialog */}
            <Dialog open={openSoilDialog} onClose={handleCloseSoilDialog}>
                <DialogTitle>Soil Data for {selectedFarmland?.name}</DialogTitle>
                <DialogContent>
                    {soilData ? (
                        <List>
                            <ListItem>
                                <ListItemText primary={`Temperature: ${soilData.temperature}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`pH: ${soilData.ph}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Structure: ${soilData.structure}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Water Holding: ${soilData.waterholding}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Nutrition: ${soilData.nutrition}`} />
                            </ListItem>
                        </List>
                    ) : (
                        <Typography>No soil data available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSoilDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default FarmlandDetailsCard;
