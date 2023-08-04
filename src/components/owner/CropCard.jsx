import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Pie } from 'react-chartjs-2';

const CropCard = ({ totalFarmlands, croppedFarmlands, uncroppedFarmlands }) => {
    const data = {
        labels: ['Cropped', 'Uncropped'],
        datasets: [
            {
                data: [croppedFarmlands, uncroppedFarmlands],
                backgroundColor: ['#3f51b5', '#f50057'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Crop Statistics
                </Typography>
                <Divider />
                <div style={{ marginTop: '16px' }}>
                    <Typography variant="body1" gutterBottom>
                        Total Farmlands: {totalFarmlands}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Cropped Farmlands: {croppedFarmlands}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Uncropped Farmlands: {uncroppedFarmlands}
                    </Typography>
                </div>
                <div style={{ marginTop: '16px' }}>
                    <Pie data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default CropCard;
