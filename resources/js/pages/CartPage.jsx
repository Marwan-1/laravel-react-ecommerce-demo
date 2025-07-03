import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

// Components
import { CartItemCard } from '../components/CartItemCard';
import { Header } from '../components/Header';
import { OrderSummary } from '../components/OrderSummary';
import { toast } from 'react-toastify';

// Material UI
import { Box, Breadcrumbs, Button, CircularProgress, Container, Link as MuiLink, Paper, Typography } from '@mui/material';

// The new sticky footer for mobile checkout
const MobileCheckoutFooter = ({ onPlaceOrder, isLoading }) => (
    <Paper
        elevation={3}
        sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            display: { xs: 'block', md: 'none' }, // Only show on mobile
        }}
    >
        <Button
            onClick={onPlaceOrder}
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
                backgroundColor: '#000',
                color: '#fff',
                py: 1.5,
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#333' },
            }}
        >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Place the order'}
        </Button>
    </Paper>
);

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0 || isPlacingOrder) return;
        setIsPlacingOrder(true); // Start loading
        const orderData = { products: cartItems.map((item) => ({ product_id: item.id, quantity: item.quantity })) };
        try {
            const response = await api.post('/orders', orderData);
            toast.success('Order placed successfully! 🎉', {
                position: "top-right",
                autoClose: 5000,
              });
            clearCart();
            navigate(`/orders/${response.data.id}`);
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || 'Failed to place order.'}`);
        } finally {
            setIsPlacingOrder(false); // Stop loading
        }
    };

    return (
        <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', pb: { xs: 12, md: 0 } /* Add padding to bottom for mobile footer */ }}>
            <Header />
            <Container maxWidth="xl" sx={{ my: 4, px: { xs: 2, md: 10 } }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <MuiLink underline="hover" color="inherit" href="/">
                        Home
                    </MuiLink>
                    <Typography color="text.primary">Cart</Typography>
                </Breadcrumbs>

                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, my: { xs: 2, md: 4 } }}>
                    Your Cart
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Left Column: Cart Items List */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <CartItemCard key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                            ))
                        ) : (
                            <Typography>
                                Your cart is empty. <Button onClick={() => navigate('/')}>Continue Shopping</Button>
                            </Typography>
                        )}

                        {/* Mobile Order Summary - This appears below the items on mobile */}
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
                            <OrderSummary
                                variant="mobile" // Use the mobile variant
                                cartItems={cartItems}
                                total={cartTotal}
                            />
                        </Box>
                    </Box>

                    {/* Right Column: Desktop Order Summary */}
                    <Box sx={{ width: '450px', display: { xs: 'none', md: 'block' } }}>
                        <OrderSummary
                            variant="desktop" // Use the desktop variant
                            cartItems={cartItems}
                            total={cartTotal}
                            onCheckout={handlePlaceOrder}
                            onUpdateQuantity={updateQuantity}
                            isLoading={isPlacingOrder}
                            onRemove={removeFromCart}
                            title={`Order Summary`}
                        />
                    </Box>
                </Box>
            </Container>

            {/* Display the sticky footer only on mobile */}
            <MobileCheckoutFooter onPlaceOrder={handlePlaceOrder} isLoading={isPlacingOrder} />
        
           

        </Box>
    );
}
