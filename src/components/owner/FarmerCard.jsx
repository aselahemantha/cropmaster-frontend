// FarmerCard.jsx
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const FarmerCard = ({ farmer }) => {
    const [open, setOpen] = useState(false);
    const [farmlands, setFarmlands] = useState([]);

    const handleOpenModal = () => {
        // Fetch farmland data for the farmer from API
        fetch(`http://localhost:8080/farmland/getAll/${farmer.nic}`)
            .then(response => response.json())
            .then(data => setFarmlands(data))
            .catch(error => console.error('Error fetching farmlands:', error));

        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{farmer.name}</Typography>
                <Typography>NIC: {farmer.nic}</Typography>
                <Typography>Age: {farmer.age}</Typography>
                <Typography>Mobile: {farmer.mobile}</Typography>
                <Typography>Experience: {farmer.experince || 'N/A'}</Typography>
            </CardContent>
            <Button onClick={handleOpenModal}>View Details</Button>
            <FarmerDetailsModal open={open} onClose={handleCloseModal} farmer={farmer} farmlands={farmlands} />
        </Card>
    );
};

const FarmerDetailsModal = ({ open, onClose, farmer, farmlands }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{farmer.name}'s Farmlands</DialogTitle>
            <DialogContent>
                <List>
                    {farmlands.map(farmland => (
                        <ListItem key={farmland.farmlandID}>
                            <ListItemText primary={farmland.name} secondary={`Size: ${farmland.size}, Location: ${farmland.location}`} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FarmerCard;
