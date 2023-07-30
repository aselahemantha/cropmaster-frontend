// Home.jsx
import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import FarmLandCard from '../components/FarmLandCard';

const Home = () => {
    const nic = '200021404098';
    const [farmerData, setFarmerData] = useState([]);

    useEffect(() => {
        const fetchFarmerData = async () => {
            try {
                const response = await fetch('http://localhost:8080/farmer/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch farmer data');
                }
                const data = await response.json();
                setFarmerData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFarmerData();
    }, []);

    return (
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">
                Welcome again! Mr. - Farmer Name -
            </Typography>
            <Divider sx={styles.divider} />
            <Box sx={styles.columnsContainer}>
                {farmerData.map((farmer) => (
                    <FarmLandCard
                        key={farmer.farmerID}
                        sx={styles.item}
                        nic={farmer.nic}
                        name={farmer.name}
                        age={farmer.age}
                        mobile={farmer.mobile}
                        experience={farmer.experince}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Home;


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

