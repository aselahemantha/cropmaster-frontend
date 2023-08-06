import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function FarmLandCard({
                          farmlandID,
                          name,
                          size,
                          location,
                          experience,
                          isCropped,
                      }) {
    const [plantDetails, setPlantDetails] = React.useState(null);
    const [soilDetails, setSoilDetails] = React.useState(null);
    const [weatherDetails, setWeatherDetails] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleViewPlantClick = () => {
        fetch(`http://localhost:8080/farmland/getCrop/${farmlandID}`)
            .then((response) => response.json())
            .then((data) => {
                setPlantDetails(data);
                setOpenDialog(true);
            })
            .catch((error) => {
                console.error('Error fetching plant details:', error);
            });
    };

    const handleViewSoilClick = () => {
        fetch(`http://localhost:8080/soil/getDetails/${farmlandID}`)
            .then((response) => response.json())
            .then((data) => {
                setSoilDetails(data);
                setOpenDialog(true);
            })
            .catch((error) => {
                console.error('Error fetching soil details:', error);
            });
    };

    const handleViewWeatherClick = () => {
        fetch(`http://localhost:8080/weather/getDetails/${farmlandID}`)
            .then((response) => response.json())
            .then((data) => {
                setWeatherDetails(data);
                setOpenDialog(true);
            })
            .catch((error) => {
                console.error('Error fetching weather details:', error);
            });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const cardContent = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Farmland ID: {farmlandID}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Size: {size}
                </Typography>
                <Typography variant="body2">Location: {location}</Typography>
            </CardContent>
            <CardActions>
                {isCropped ? (
                    <Button size="small" color="primary" onClick={handleViewPlantClick}>
                        View Plant
                    </Button>
                ) : (
                    <>
                        <Button size="small" color="primary" onClick={handleViewSoilClick}>
                            View Soil
                        </Button>
                        <Button size="small" color="primary" onClick={handleViewWeatherClick}>
                            View Weather
                        </Button>
                    </>
                )}
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{cardContent}</Card>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    {plantDetails && (
                        <Typography variant="body2">
                            <h3><b>Plant Details:</b></h3>
                            Name: {soilDetails.name}<br/>
                            Variety: {soilDetails.variety}<br/>
                            <br/>
                        </Typography>
                    )}
                    {soilDetails && (
                        <Typography variant="body2">
                            <h3><b>Soil Details:</b></h3>
                            Temperature: {soilDetails.temperature}<br/>
                            pH: {soilDetails.ph}<br/>
                            Structure: {soilDetails.structure}<br/>
                            Water Holding: {soilDetails.waterholding}<br/>
                            Nutrition: {soilDetails.nutrition}<br/>
                            <br/>
                        </Typography>
                    )}
                    {weatherDetails && (
                        <Typography variant="body2">
                            <h3><b>Weather Details:</b></h3>
                            Temperature: {weatherDetails.temperature}<br/>
                            Rainfall: {weatherDetails.rainfall}<br/>
                            Humidity: {weatherDetails.humidity}<br/>
                            Wind Speed: {weatherDetails.windspeed}<br/>
                            Radiation: {weatherDetails.radiation}<br/>
                            <br/>
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default FarmLandCard;
