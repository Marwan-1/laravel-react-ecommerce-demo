import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto', // Pushes footer to the bottom
                backgroundColor: '#000',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <Typography variant="body1" sx={{ mb: 1 }}>
                &copy; {new Date().getFullYear()} Copyright by Marwan
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: 11 }}>
                marwan.hassan.shaker@gmail.com
            </Typography>
            <Box>
                <IconButton component={Link} href="https://github.com/Marwan-1" target="_blank" sx={{ color: '#fff' }}>
                    <GitHub />
                </IconButton>
                <IconButton component={Link} href="https://linkedin.com/in/marwan-h-shaker" target="_blank" sx={{ color: '#fff' }}>
                    <LinkedIn />
                </IconButton>
                <IconButton component={Link} href="mailto:marwan.hassan.shaker@gmail.com" sx={{ color: '#fff' }}>
                    <Email />
                </IconButton>
            </Box>
        </Box>
    );
};
