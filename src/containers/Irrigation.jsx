import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const AddIrrigationMethod = () => {
  const [irrigationData, setIrrigationData] = useState({
    delivery: '',
    source: '',
    method: '',
    maintainerNIC: '',
  });

  const [farmers, setFarmers] = useState([]);

  const [farmlands, setFarmlands] = useState([]);
  const [irrigationMethods, setIrrigationMethods] = useState([]);
  const [selectedFarmland, setSelectedFarmland] = useState('');
  const [selectedIrrigation, setSelectedIrrigation] = useState('');

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch('http://localhost:8080/farmer/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch farmer data');
        }
        const data = await response.json();
        setFarmers(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFarmers();
  }, []);

  useEffect(() => {
    const fetchFarmlands = async () => {
      try {
        const response = await fetch('http://localhost:8080/farmland/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch farmland data');
        }
        const data = await response.json();
        setFarmlands(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFarmlands();
  }, []);

  useEffect(() => {
    const fetchIrrigations = async () => {
      try {
        const response = await fetch('http://localhost:8080/irrigation/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch farmer data');
        }
        const data = await response.json();
        setIrrigationMethods(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIrrigations();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIrrigationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddIrrigationMethod = async () => {
    try {
      const response = await fetch('http://localhost:8080/irrigation/addNew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(irrigationData),
      });

      if (!response.ok) {
        throw new Error('Failed to add irrigation method');
      }

      // Clear the form or show a success message
      console.log('Irrigation method added successfully');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignIrrigation = async () => {
    try {
      const response = await fetch(
          `http://localhost:8080/farmland/updateIrrigation/${selectedFarmland}/${selectedIrrigation}`,
          {
            method: 'POST',
          }
      );

      if (!response.ok) {
        throw new Error('Failed to assign irrigation to farmland');
      }

      // Show success message or update state
      console.log('Irrigation assigned to farmland successfully');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Container>
        <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Irrigation Method
          </Typography>
          <TextField
              label="Delivery"
              fullWidth
              name="delivery"
              value={irrigationData.delivery}
              onChange={handleInputChange}
          />
          <TextField
              label="Source"
              fullWidth
              name="source"
              value={irrigationData.source}
              onChange={handleInputChange}
          />
          <TextField
              label="Method"
              fullWidth
              name="method"
              value={irrigationData.method}
              onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel>Maintainer NIC</InputLabel>
            <Select
                value={irrigationData.maintainerNIC}
                name="maintainerNIC"
                onChange={handleInputChange}
            >
              {farmers.map((farmer) => (
                  <MenuItem key={farmer.nic} value={farmer.nic}>
                    {farmer.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddIrrigationMethod} fullWidth>
            Add Irrigation Method
          </Button>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Assign Irrigation Method
          </Typography>
          {/* Other input fields and dropdowns (similar to previous code) */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Farmland</InputLabel>
            <Select
                value={selectedFarmland}
                onChange={(e) => setSelectedFarmland(e.target.value)}
            >
              {farmlands.map((farmland) => (
                  <MenuItem key={farmland.farmlandID} value={farmland.farmlandID}>
                    {farmland.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Irrigation Method</InputLabel>
            <Select
                value={selectedIrrigation}
                onChange={(e) => setSelectedIrrigation(e.target.value)}
            >
              {irrigationMethods.map((method) => (
                  <MenuItem key={method.systemID} value={method.systemID}>
                    {method.delivery}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
              variant="contained"
              onClick={handleAssignIrrigation}
              fullWidth
              sx={{ mt: 3 }}
          >
            Assign Irrigation to Farmland
          </Button>
        </Paper>

      </Container>
  );
};

export default AddIrrigationMethod;
