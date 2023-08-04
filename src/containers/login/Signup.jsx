import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        // Handle form submission here (e.g., send data to backend)
        // After successful signup, you can navigate to another page
        // For example:
        // navigate('/login');
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                label="NIC"
                fullWidth
                margin="normal"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
            />
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Sign Up
            </Button>
            <Typography variant="body2" align="center" mt={2}>
                Already have an account? <Link to="/">Log in</Link>
            </Typography>
        </Container>
    );
};

export default Signup;
