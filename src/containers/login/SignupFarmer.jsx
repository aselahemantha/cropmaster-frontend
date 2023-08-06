import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    Snackbar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignupFarmer = () => {
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [experince, setExperince] = useState('');
    const [mobile, setMobile] = useState('');

    const navigate = useNavigate();
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        if (!nic || !name || !password || !age) {
            setErrorMessage('All required fields must be filled.');
            setErrorSnackbarOpen(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/farmer/addNew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nic: nic,
                    password: password,
                    name: name,
                    age: parseInt(age),
                    experince: experince,
                    mobile: mobile,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, navigate to corresponding page
                navigate(`/`);
            } else {
                // Handle signup error and show snackbar with error message
                setErrorMessage(data.error);
                setErrorSnackbarOpen(true);
            }
            navigate(`/`);
        } catch (error) {
            console.error('Error during signup:', error);
            // Handle error (e.g., network issue)
        }
    };

    const handleSnackbarClose = () => {
        setErrorSnackbarOpen(false);
        setErrorMessage('');
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                label="NIC *"
                fullWidth
                margin="normal"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
            />
            <TextField
                label="Name *"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Mobile"
                fullWidth
                margin="normal"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
                label="Password *"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Age *"
                type="age"
                fullWidth
                margin="normal"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <TextField
                label="Experience"
                type="experience"
                fullWidth
                margin="normal"
                value={experince}
                onChange={(e) => setExperince(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSignUp}>
                Sign Up
            </Button>
            <Typography variant="body2" align="center" mt={2}>
                Already have an account? <Link to="/">Log in</Link>
            </Typography>
            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignupFarmer;
