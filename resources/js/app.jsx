import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
// Import useTheme to access the theme object from within a component
import { Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';

// Import Providers and Components
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Import Pages
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProductsPage from './pages/ProductsPage';

import { ToastContainer } from 'react-toastify'; // Add this import
import 'react-toastify/dist/ReactToastify.css'; // Add this import


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

const AppLayout = () => {
    const location = useLocation();

    // FIX: Use the useTheme() hook here to correctly access the theme
    const currentTheme = useTheme();
    const isMobile = useMediaQuery(currentTheme.breakpoints.down('md'));

    // This logic now correctly hides the footer on ALL mobile pages
    // and on the desktop cart page.
    const showFooter = location.pathname !== '/cart' && !isMobile;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders/:id" element={<OrderDetailsPage />} />
                    </Route>
                </Routes>
            </Box>
            {/* Conditionally render the footer */}
            {showFooter && <Footer />}
        </Box>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <CartProvider>
                        <AppLayout />
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </CartProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
