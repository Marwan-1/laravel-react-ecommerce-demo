import { Add, Close, Remove } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Modal, Slide, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ProductDetailModal({ product, open, onClose, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (open) {
            setQuantity(1);
        }
    }, [open]);

    if (!product) return null;

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        onClose();
    };

    // Main style for the modal panel itself
    const modalStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100vh', // Use viewport height to prevent overflow
        width: { xs: '100%', sm: 384 }, // Responsive width
        bgcolor: '#FFFFFF',
        boxShadow: '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Slide direction="left" in={open}>
                <Box sx={modalStyle}>
                    {/* FIXED HEADER */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: '16px',
                            flexShrink: 0, // Prevents this from shrinking
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, fontSize: '20px' }}>
                            Product Details
                        </Typography>
                        <IconButton onClick={onClose}>
                            <Close sx={{ color: '#6B7280' }} />
                        </IconButton>
                    </Box>

                    {/* SCROLLABLE CONTENT AREA */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {/* Image */}
                        <Box sx={{ width: '100%', height: '320px' }}>
                            <img
                                src={`${import.meta.env.VITE_APP_URL}${product.image_url}`}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>

                        {/* All Product Info is inside the scrollable area */}
                        <Box sx={{ p: '24px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '16px' }}>
                                <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>{product.name}</Typography>
                                <Chip label={product.category} size="small" sx={{ backgroundColor: '#F3F4F6', borderRadius: '9999px' }} />
                            </Box>

                            <Typography sx={{ fontWeight: 700, fontSize: '24px', mb: '16px' }}>${parseFloat(product.price).toFixed(2)}</Typography>

                            <Box sx={{ py: '17px', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
                                <Typography fontWeight="500" sx={{ fontSize: '16px', mb: 1 }}>
                                    Product Details
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography fontSize="14px" color="#4B5563">
                                        Category:
                                    </Typography>
                                    <Typography fontSize="14px" color="#4B5563" fontWeight="500">
                                        {product.category}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                    <Typography fontSize="14px" color="#4B5563">
                                        Stock:
                                    </Typography>
                                    <Typography fontSize="14px" color="#4B5563" fontWeight="500">
                                        {product.stock} items
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '16px' }}>
                                <Typography fontWeight="500" sx={{ fontSize: '16px' }}>
                                    Quantity
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: '8px', p: '1px' }}>
                                    <IconButton
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        sx={{ bgcolor: '#F3F4F6', borderRadius: '4px' }}
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Typography sx={{ px: 2, textAlign: 'center' }}>{quantity}</Typography>
                                    <IconButton
                                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                        sx={{ bgcolor: '#F3F4F6', borderRadius: '4px' }}
                                    >
                                        <Add />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* FIXED FOOTER */}
                    <Box sx={{ p: '24px', mt: 'auto', flexShrink: 0, boxShadow: '0px -4px 6px -4px rgba(0, 0, 0, 0.1)' }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleAddToCart}
                            sx={{
                                backgroundColor: '#000',
                                color: '#FFFFFF',
                                py: 1.5,
                                borderRadius: '4px',
                                textTransform: 'none',
                                fontSize: '16px',
                                '&:hover': { backgroundColor: '#333' },
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}
