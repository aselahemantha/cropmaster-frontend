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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const navigate = useNavigate();
    const [userType, setUserType] = useState('farmer');
    const [nicValue, setNicValue] = useState('');
    const [password, setPassword] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setNic } = useNic(); // Get the setNic function from context

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
            <Box mt={4}>
                <TextField
                    label="NIC"
                    fullWidth
                    margin="normal"
                    value={nicValue}
                    onChange={(e) => setNicValue(e.target.value)}
                />
                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <Button variant="contained" color="primary" size="large" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Box>
            </Box>
            <Link to={"/signupfarmer"}>
                <Typography variant="h6" align="center" color="text.primary">
                    Sign Up as Farmer
                </Typography>
            </Link>

            <Link to={"/signupowner"}>
                <Typography variant="h6" align="center" color="text.primary">
                    Sign Up as Owner
                </Typography>
            </Link>

            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Home;
