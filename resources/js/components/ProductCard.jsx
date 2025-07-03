import { Add, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

const QuantityControl = ({ quantity, setQuantity, stock }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: '8px' }}>
        <IconButton
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                setQuantity((q) => Math.max(0, q - 1));
            }}
        >
            <Remove fontSize="small" />
        </IconButton>
        <Typography sx={{ px: 1 }}>{quantity}</Typography>
        <IconButton
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                setQuantity((q) => Math.min(stock, q + 1));
            }}
        >
            <Add fontSize="small" />
        </IconButton>
    </Box>
);

export const ProductCard = ({ product, onCardClick, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = (e) => {
        // Stop the click from propagating to the parent Box (which opens the modal)
        e.stopPropagation();
        if (quantity > 0) {
            onAddToCart(product, quantity);
            setQuantity(0); // Reset after adding
        }
    };

    return (
        <Box
            onClick={() => onCardClick(product)}
            sx={{
                border: '1px solid #F3F4F6',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                height: '100%',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' },
            }}
        >
            <Box
                sx={{
                    height: 256,
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <img
                    src={`${import.meta.env.VITE_APP_URL}${product.image_url}`} // <-- Use the image_url
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* This blue badge is from the figma design */}
                {quantity > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: '#2563EB',
                            color: 'white',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography fontSize="0.8rem" fontWeight="bold">
                            {quantity}
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight="500" component="h3" noWrap>
                    {product.name}
                </Typography>
                <Typography color="text.secondary" fontSize="0.875rem">
                    Stock: {product.stock}
                </Typography>
                <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                        ${parseFloat(product.price).toFixed(2)}
                    </Typography>
                    <QuantityControl quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                </Box>
                {/* Add to Cart button can be added here if needed, but the stepper is more direct */}
                <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
                    disabled={quantity === 0}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
};
