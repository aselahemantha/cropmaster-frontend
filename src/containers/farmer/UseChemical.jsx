import React, {useEffect, useState} from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Box from "@mui/material/Box";
import {useNic} from "../../components/NicContext.jsx";

const AddChemical = () => {
  const [chemicalData, setChemicalData] = useState({
    name: '',
    handling: '',
    usageInfo: '',
    safety: '',
    manufacturer: '',
    envir_impact: '',
  });

  const [selectedChemical, setSelectedChemical] = useState('');
  const [selectedFarmland, setSelectedFarmland] = useState('');

  const [farmlandData, setFarmlandData] = useState([]);
  const [chemData, setChemData] = useState([]);
  const { nic } = useNic(); // Get the nic value from context


  useEffect(() => {
    const fetchFarmLandData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/farmland/getAll/${nic}`);
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
  }, [nic]);

  useEffect(() => {
    const fetchChemicalData = async () => {
      try {
        const response = await fetch('http://localhost:8080/chemical/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch farmer data');
        }
        const data = await response.json();
        setChemData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChemicalData();
  }, []);

  const handleChange = (field, value) => {
    setChemicalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddChemical = async () => {
    try {
      const response = await fetch('http://localhost:8080/chemical/addNew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chemicalData),
      });

      if (!response.ok) {
        throw new Error('Failed to add chemical');
      }

      // Clear the form or show a success message
      console.log('Chemical added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChemicalUsageSubmit = () => {
    // Prepare the data object to send in the POST request
    const data = {
      farmlandID: selectedFarmland,
      chemicalID: selectedChemical,
      nic: nic,
    };

    // Make the POST request using fetch
    fetch('http://localhost:8080/chemicalusage/addNew', {
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
        <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Chemical
          </Typography>
          <TextField
              label="Name"
              fullWidth
              value={chemicalData.name}
              onChange={(e) => handleChange('name', e.target.value)}
          />
          <TextField
              label="Handling"
              fullWidth
              value={chemicalData.handling}
              onChange={(e) => handleChange('handling', e.target.value)}
          />
          <TextField
              label="Usage"
              fullWidth
              value={chemicalData.usage}
              onChange={(e) => handleChange('usage', e.target.value)}
          />
          <TextField
              label="Safety Precautions"
              fullWidth
              value={chemicalData.safety}
              onChange={(e) => handleChange('safety', e.target.value)}
          />
          <TextField
              label="Manufacture Details"
              fullWidth
              value={chemicalData.manufacturer}
              onChange={(e) => handleChange('manufacture', e.target.value)}
          />
          <TextField
              label="Environmental Impact"
              fullWidth
              value={chemicalData.envir_impact}
              onChange={(e) => handleChange('environmentalImpact', e.target.value)}
          />
          <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button variant="contained" onClick={handleAddChemical}>
              Add Chemical
            </Button>
          </Grid>
        </Paper>


        <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
          <Box display="flex" justifyContent="center" alignItems="center" height={50}>
            <h1>Add a Disease</h1>
          </Box>

           Select for Farmers
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
            <InputLabel>Chemical</InputLabel>
            <Select
                value={selectedChemical}
                onChange={(e) => setSelectedChemical(e.target.value)}
                label="Chemical"
            >
              {chemData.map((chem) => (
                  <MenuItem key={chem.chemicalID} value={chem.chemicalID}>
                    {chem.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Box display="flex" justifyContent="left" alignItems="center" height={50} margin="auto">
            <Button variant="contained" color="primary" onClick={handleChemicalUsageSubmit}  >
              SUBMIT
            </Button>
          </Box>
        </Paper>

      </Container>
  );
};

export default AddChemical;
