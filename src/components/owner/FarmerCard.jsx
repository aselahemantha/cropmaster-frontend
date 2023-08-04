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

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{farmer.name}</Typography>
                <Typography>ID: {farmer.farmerID}</Typography>
                <Typography>Age: {farmer.age}</Typography>
                <Typography>Mobile: {farmer.mobile}</Typography>
                <Typography>Experience: {farmer.experience || 'N/A'}</Typography>
            </CardContent>
            <Button onClick={handleOpenModal}>View Details</Button>
            <FarmerDetailsModal open={open} onClose={handleCloseModal} farmer={farmer} />
        </Card>
    );
};

const FarmerDetailsModal = ({ open, onClose, farmer }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{farmer.name}'s Farmlands</DialogTitle>
            <DialogContent>
                <List>
                    {farmer.farmlands.map((farmland) => (
                        <ListItem key={farmland.id}>
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
