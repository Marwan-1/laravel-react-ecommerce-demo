import { Add, Remove } from '@mui/icons-material';
import { Box, Button, CircularProgress, Divider, IconButton, Typography } from '@mui/material';

const QuantityControl = ({ quantity, onUpdate }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: '8px' }}>
        <IconButton size="small" onClick={() => onUpdate(quantity - 1)} sx={{ py: 0.5, px: 1 }}>
            <Remove fontSize="small" />
        </IconButton>
        <Typography sx={{ px: 1.5, py: 0.5 }}>{quantity}</Typography>
        <IconButton size="small" onClick={() => onUpdate(quantity + 1)} sx={{ py: 0.5, px: 1 }}>
            <Add fontSize="small" />
        </IconButton>
    </Box>
);

export const OrderSummary = ({ cartItems, total, onCheckout, onUpdateQuantity, title, variant = 'desktop', isLoading = false }) => {
    const isMobile = variant === 'mobile';
    const shipping = 15.0;
    const tax = total * 0.1;
    const grandTotal = total + shipping + tax;

    const containerSx = {
        p: 3,
        borderRadius: '8px',
        backgroundColor: isMobile ? '#F9FAFB' : '#fff',
        border: isMobile ? 'none' : '1px solid #E5E7EB',
        boxShadow: isMobile ? 'none' : '0px 1px 2px rgba(0, 0, 0, 0.05)',
        position: 'sticky', // Ensure it remains sticky
        top: '88px', // Correct offset from the top
    };

    return (
        <Box sx={containerSx}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                    {title || 'Order Summary'}
                </Typography>
                {!isMobile && (
                    <Typography variant="body1" color="primary.main">
                        {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Typography>
                )}
            </Box>

            {!isMobile && (
                <Box sx={{ my: 2, maxHeight: '35vh', overflowY: 'auto' }}>
                    {cartItems.map((item) => (
                        // --- UPDATED ITEM LAYOUT ---
                        // Replaced Grid with a more direct Flexbox layout for better alignment
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            {/* Left side: Image and Name */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {/* FIX 1: Replaced placeholder with the actual image */}
                                <Box sx={{ width: 64, height: 64, borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                    <img
                                        src={`${import.meta.env.VITE_APP_URL}${item.image_url}`}
                                        alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                                <Typography fontWeight="500">{item.name}</Typography>
                            </Box>

                            {/* Right side: Quantity Control - Pushed to the far right */}
                            <QuantityControl quantity={item.quantity} onUpdate={(newQty) => onUpdateQuantity(item.id, newQty)} />
                        </Box>
                    ))}
                </Box>
            )}

            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="500">${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography fontWeight="500">${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography fontWeight="500">${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                    Total
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                    ${grandTotal.toFixed(2)}
                </Typography>
            </Box>

            {!isMobile && (
                <Button
                    onClick={onCheckout}
                    disabled={cartItems.length === 0 || isLoading}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: '#000', color: '#fff', py: 1.5, borderRadius: '8px', '&:hover': { backgroundColor: '#333' } }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Proceed to Checkout'}
                </Button>
            )}
        </Box>
    );
};
