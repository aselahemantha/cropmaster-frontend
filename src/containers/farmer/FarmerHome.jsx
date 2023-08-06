// FarmerSignUp.jsx
import React, { useState, useEffect } from 'react';
import {Box, Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from '@mui/material';
import FarmLandCard from '../../components/farmer/FarmLandCard.jsx';
import TextField from "@mui/material/TextField";
import {useNic} from "../../components/NicContext.jsx";

const FarmerHome = () => {
    const { nic } = useNic(); // Get the nic value from context

    const [cropedFarmland, setcropedFarmland] = useState([]);
    const [uncropedFarmland, setuncropedFarmland] = useState([]);

    const [name, setName] = useState('');
    const [variety, setVariety] = useState('');

    const [crops, setCrops] = useState([]); // State to store the list of crops
    const [selectedFarmland, setSelectedFarmland] = useState(''); // State to store the selected farmland
    const [selectedCrop, setSelectedCrop] = useState(''); // State to store the selected crop


    useEffect(() => {
        const fetchCropedData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/farmland/croped/${nic}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setcropedFarmland(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCropedData();
    }, [nic]);

    useEffect(() => {
        const fetchUncropedData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/farmland/uncroped/${nic}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setuncropedFarmland(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUncropedData();
    }, [nic]);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await fetch('http://localhost:8080/crop/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch crop data');
                }
                const data = await response.json();
                setCrops(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCrops();
    }, []);


    const handleSubmit = () => {
        // Prepare the data object to send in the POST request
        const data = {
            name: name,
            variety: variety
        };

        // Make the POST request using fetch
        fetch('http://localhost:8080/crop/addNew', {
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

    const handleAssignCrop = async () => {
        if (!selectedFarmland || !selectedCrop) {
            console.error('Both farmland and crop must be selected');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/farmland/updateCrop/${selectedFarmland}/${selectedCrop}`, {
                method: 'PUT', // Use the appropriate HTTP method (e.g., PUT, POST)
            });

            if (!response.ok) {
                throw new Error('Failed to update farmland with crop');
            }
            window.location.reload();
            // Perform any additional actions after successful update
            // For example, you could refetch the data to refresh the display.
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">
                Welcome again! Mr. - {nic} -
            </Typography>
            <Divider sx={styles.divider} />

            <Typography sx={styles.pageTitle} variant="h5">
                Farmlands that has cropped
            </Typography>

            <Box sx={styles.columnsContainer}>
                {cropedFarmland.map((farmland) => (
                    <FarmLandCard
                        key={farmland.farmlandID}
                        sx={styles.item}
                        farmlandID={farmland.farmlandID}
                        name={farmland.name}
                        size={farmland.size}
                        location={farmland.location}
                        experience={farmland.experience}
                        isCropped={true} // Indicate that this is a cropped farmland
                    />
                ))}
            </Box>

            <Divider sx={styles.divider} />

            <Typography sx={styles.pageTitle} variant="h5">
                Farmlands that has uncropped
            </Typography>

            <Box sx={styles.columnsContainer}>
                {uncropedFarmland.map((farmland) => (
                    <FarmLandCard
                        key={farmland.farmlandID}
                        sx={styles.item}
                        farmlandID={farmland.farmlandID}
                        name={farmland.name}
                        size={farmland.size}
                        location={farmland.location}
                        experience={farmland.experience}
                        isCropped={false} // Indicate that this is an uncropped farmland
                    />
                ))}
            </Box>


            <Box display="flex" justifyContent="center" alignItems="center" height={50}>
                <h1>Add a Crop</h1>
            </Box>

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
                label="Variety"
                variant="outlined"
                fullWidth={true}
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
            />

            <Box display="flex" justifyContent="left" alignItems="center" height={50} margin="auto">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    SUBMIT
                </Button>
            </Box>

            <Typography sx={styles.pageTitle} variant="h5">
                Assign Crops to Uncropped Farmlands
            </Typography>
            <Box sx={styles.columnsContainer}>
                <FormControl sx={styles.item} fullWidth variant="outlined">
                    <InputLabel>Farmland</InputLabel>
                    <Select
                        value={selectedFarmland}
                        onChange={(e) => setSelectedFarmland(e.target.value)}
                        label="Farmland"
                    >
                        {uncropedFarmland.map((farmland) => (
                            <MenuItem key={farmland.farmlandID} value={farmland.farmlandID}>
                                {farmland.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={styles.item} fullWidth variant="outlined">
                    <InputLabel>Crop</InputLabel>
                    <Select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        label="Crop"
                    >
                        {crops.map((crop) => (
                            <MenuItem key={crop.cropId} value={crop.cropId}>
                                {crop.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAssignCrop}
                >
                    Assign Crop
                </Button>

            </Box>

        </Box>
    );
};

export default FarmerHome;


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    pageTitle: {
        mb: 2
    },
    columnsContainer: {
        columns: '280px 3',
        maxWidth: 1400
    },
    item: {
        mb: 2,
    },
    divider: {
        my: 2
    },
    videoStatsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
        '&:hover': {
            color: 'primary.main',
            cursor: 'pointer'
        }
    },
    cardAction: {
        mt: 2
    },
    ideaContent: {
        display: 'flex',
    },
    ideaImage: {
        width: 80,
        alignSelf: 'center',
        ml: 5
    },
    ideaQuestion: {
        fontSize: '0.9rem',
        fontWeight: 500,
        my: 2
    },
    avatar: {
        width: '30px',
        height: 'auto',
        marginRight: 1
    },
    postStats: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridAutoRows: '25px'
    },
    postAuthorSection: {
        display: 'flex',
        alignItems: 'center',
        my: 3
    },
    postMeta: {
        mr: 1,
        fontSize: '0.8rem',
        color: 'neutral.normal'
    },
    videoThumbnail: {
        width: 80,
        ml: 'auto'
    },
    commentRow: {
        display: 'flex',
        alignItems: 'flex-start',
        mt: 2
    },
    commentDetailsSection: {
        display: 'flex',
        alignItems: 'center',
    },
    commentText: {
        fontSize: '0.8rem',
        mt: 0.5,
        mr: 2
    },
    insiderImage: {
        width: '100%',
        mt: 1
    }
}

