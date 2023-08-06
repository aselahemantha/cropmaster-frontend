import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import backgroundImage from '../assets/background/background.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {useNic} from "../components/NicContext.jsx";
import { borderRadius } from '@mui/system';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        transform: 'scale(1)', // Initial scale
        '&:hover': {
            transform: 'scale(1.1)', // Enlarge the size on hover
        },



    };

    const navigate = useNavigate();
    const [userType, setUserType] = useState('farmer');
    const [nicValue, setNicValue] = useState('');
    const [password, setPassword] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setNic } = useNic(); // Get the setNic function from context
    const boxStyle = {
        backgroundColor: 'rgba(1, 32, 93, 0.3)',
        padding :'40px',
        borderRadius:'10px',
        color :'rgba(0, 0, 0,1)',
        transition: 'transform 0.3s ease',
        transform: 'scale(1)', // Initial scale
        '&:hover': {
            transform: 'scale(1.1)', // Enlarge the size on hover
        },


    };
    const textFieldStyle = {
        color: 'white',
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch(`http://localhost:8080/${userType}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nic: nicValue,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setNic(nicValue);
                // Login successful, navigate to corresponding page
                if (userType === 'farmer') {
                    navigate(`/farmerhome`);
                } else if (userType === 'owner') {
                    navigate(`/ownerhome`);
                }
            } else {
                // Handle login error and show snackbar with error message
                setErrorMessage(data.error);
                setErrorSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error (e.g., network issue)
        }
    };

    const handleSnackbarClose = () => {
        setErrorSnackbarOpen(false);
        setErrorMessage('');
    };

    return (
        <Container style={containerStyle}>
            <Typography variant="h2" align="center" color="text.primary">
                Welcome to Your Farm App
            </Typography>
            <Box mt={4} style={boxStyle}>
                <TextField
                    label="NIC"
                    fullWidth
                    margin="normal"
                    value={nicValue}
                    onChange={(e) => setNicValue(e.target.value)}
                    style={textFieldStyle}
                />
                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={textFieldStyle}
                />
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="userType"
                        name="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <FormControlLabel value="farmer" control={<Radio />} label="I'm a Farmer" />
                        <FormControlLabel value="owner" control={<Radio />} label="I'm an Owner" />
                    </RadioGroup>
                </FormControl>
                <Box mt={2}>
                    <Button variant="contained" color="primary" size="large" onClick={handleSignIn} style={{backgroundColor: 'rgba(1, 32, 93, 0.6)'}}>
                        Sign In
                    </Button>
                </Box>
            </Box>
            <Box mt={2}>
                <Button variant="text" color="primary" onClick={() => navigate("/signupfarmer")} style={{
                    borderRadius: '5px',
                    padding: '8px 16px',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(1, 32, 93, 0.6)'
                }}>
                    Sign Up as Farmer
                </Button>
            </Box>

            <Box mt={2}>
                <Button variant="text" color="primary" onClick={() => navigate("/signupowner")} style={{

                    borderRadius: '5px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(1, 32, 93, 0.6)', // Replace with your custom color
                    color: '#FFFFFF',

                }}>
                    Sign Up as Owner
                </Button>
            </Box>

            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Home;