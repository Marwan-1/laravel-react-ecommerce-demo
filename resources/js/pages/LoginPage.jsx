import { AutoFixHigh, Close } from '@mui/icons-material';
import { Alert, AppBar, Box, Button, CircularProgress, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';

// Header component to match the Figma design
const HeaderLogin = () => (
    <>
        {/* Top black banner */}
        <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none', py: 0.5 }}>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Sign up and get 20% off to your first order.{' '}
                <Typography component="span" variant="body2" sx={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
                    Sign Up Now
                </Typography>
            </Typography>
        </AppBar>
        {/* Main navigation header */}

        <Header />
    </>
);

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showAutoFill, setShowAutoFill] = useState(true);
    const [showDemoTooltip, setShowDemoTooltip] = useState(true);
    // Get the login function AND the new loading state from the context
    const { login, authLoading } = useAuth();

    const demoEmail = 'marwan@test.com';
    const demoPassword = '123456';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    const handleAutoFill = () => {
        setEmail(demoEmail);
        setPassword(demoPassword);
        setShowAutoFill(false); // Hide auto-fill button after use
    };

    const handleCloseDemoTooltip = () => {
        setShowDemoTooltip(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <HeaderLogin />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box sx={{ maxWidth: '448px', width: '100%' }}>
                    {/* Auto Fill Button */}
                    {showAutoFill && (
                        <Button
                            variant="outlined"
                            startIcon={<AutoFixHigh />}
                            onClick={handleAutoFill}
                            sx={{
                                mb: 2,
                                width: '100%',
                                textTransform: 'none',
                                borderColor: '#6366F1',
                                color: '#6366F1',
                                '&:hover': {
                                    borderColor: '#4F46E5',
                                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                                },
                            }}
                        >
                            Auto Fill Demo Credentials
                        </Button>
                    )}

                    {/* Demo Credentials Tooltip */}
                    {showDemoTooltip && (
                        <Box
                            sx={{
                                position: 'relative',
                                mb: 3,
                                p: 2,
                                bgcolor: '#E0E7FF',
                                borderRadius: '8px',
                                border: '1px solid #C7D2FE',
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4338CA', mb: 1 }}>
                                Demo Credentials:
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6B7280' }}>
                                Email:{' '}
                                <Typography component="span" sx={{ fontStyle: 'italic', color: '#9CA3AF' }}>
                                    {demoEmail}
                                </Typography>
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6B7280' }}>
                                Password:{' '}
                                <Typography component="span" sx={{ fontStyle: 'italic', color: '#9CA3AF' }}>
                                    {demoPassword}
                                </Typography>
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={handleCloseDemoTooltip}
                                sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    color: '#6B7280',
                                    '&:hover': {
                                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                                    },
                                }}
                                aria-label="Close demo credentials"
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#111827' }}>
                                Welcome back
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4B5563', mt: 1 }}>
                                Please enter your details to sign in
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={demoEmail}
                                required
                                sx={{
                                    mb: 3,
                                    '& .MuiInputBase-input::placeholder': {
                                        fontStyle: 'italic',
                                        color: '#9CA3AF',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 50,
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#000000',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#000000',
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={demoPassword}
                                required
                                sx={{
                                    mb: 4,
                                    '& .MuiInputBase-input::placeholder': {
                                        fontStyle: 'italic',
                                        color: '#9CA3AF',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 50,
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#000000',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#000000',
                                        },
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={authLoading}
                                sx={{
                                    height: 48,
                                    backgroundColor: '#000000',
                                    color: '#FFFFFF',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#333333',
                                    },
                                }}
                            >
                                {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
