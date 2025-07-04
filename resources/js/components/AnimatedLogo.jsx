import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export const AnimatedLogo = () => {
    const [isLogoVisible, setIsLogoVisible] = useState(true);

    useEffect(() => {
        let timer;
        if (isLogoVisible) {
            timer = setTimeout(() => {
                setIsLogoVisible(false);
            }, 6000); // 6 seconds
        } else {
            timer = setTimeout(() => {
                setIsLogoVisible(true);
            }, 2500); // 2.5 seconds
        }
        return () => clearTimeout(timer);
    }, [isLogoVisible]); // Re-run the effect whenever the visibility state changes

    // Common styles for both the logo and the name to ensure they overlap perfectly
    const sharedStyles = {
        position: 'absolute',
        top: -8,
        left: 0,
        transition: 'opacity 1.0s ease-in-out', // Smooth fade transition
    };

    return (
        // A container with a fixed size and relative positioning
        <Box
            sx={{
                position: 'relative',
                width: '120px', // Fixed width to prevent layout shift
                height: '32px', // Fixed height
                cursor: 'pointer',
            }}
        >
            {/* The Company Logo Image */}
            <img
                src="/storage/images/logo.jpg" // Path from the public folder
                alt="Izam Logo"
                style={{
                    ...sharedStyles,
                    opacity: isLogoVisible ? 1 : 0, // Fade in when visible
                    width: '100%',
                }}
            />
            <img
                src="/storage/images/logo-6.jpg" // Path from the public folder
                alt="Marwan Logo"
                style={{
                    ...sharedStyles,
                    opacity: isLogoVisible ? 0 : 1, // Fade in when visible
                    width: '100%',
                }}
            />
        </Box>
    );
};
