import { Menu as MenuIcon, Search, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, CircularProgress, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { AnimatedLogo } from './AnimatedLogo';

export const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Get state and functions from the context hooks
    const { isAuthenticated, logout, authLoading } = useAuth();
    const { cartItems } = useCart();

    // Calculate the total number of items for the badge
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Reusable Login/Logout button logic
    const AuthButton = () => {
        if (isAuthenticated) {
            return (
                <Button
                    onClick={logout}
                    variant="contained"
                    disabled={authLoading}
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: '4px',
                        '&:hover': { backgroundColor: '#333' },
                    }}
                >
                    {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
                </Button>
            );
        }
        return (
            <Button
                onClick={() => navigate('/login')}
                variant="contained"
                sx={{ backgroundColor: '#000', color: '#fff', textTransform: 'none', borderRadius: '4px', '&:hover': { backgroundColor: '#333' } }}
            >
                Login
            </Button>
        );
    };

    const DesktopHeader = () => (
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 10 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {/* <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    izam
                </Typography> */}
                <AnimatedLogo />
                <Button onClick={() => navigate('/')} color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
                    Products
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: '4px',
                        '&:hover': { backgroundColor: '#333' },
                    }}
                >
                    Sell Your Product
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} to="/cart" color="inherit">
                    <Badge badgeContent={totalItemsInCart} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <AuthButton />
            </Box>
        </Toolbar>
    );

    const MobileHeader = () => (
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
            <IconButton color="inherit" edge="start">
                <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
                izam
            </Typography> */}

            <Box sx={{ flexGrow: 1, ml: 2 }}>
                <AnimatedLogo />
            </Box>

            <Box>
                <IconButton color="inherit">
                    <Search />
                </IconButton>
                <IconButton component={Link} to="/cart" color="inherit">
                    <Badge badgeContent={totalItemsInCart} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </Box>
        </Toolbar>
    );

    return (
        <AppBar position="sticky" top={0} sx={{ backgroundColor: '#fff', color: '#000', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', zIndex: 1100 }}>
            {isMobile ? <MobileHeader /> : <DesktopHeader />}
        </AppBar>
    );
};
