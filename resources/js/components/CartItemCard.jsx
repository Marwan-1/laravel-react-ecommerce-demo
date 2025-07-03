import { Add, Delete, Remove } from '@mui/icons-material';
import { Box, Chip, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';

const QuantityControl = ({ quantity, onUpdate, stock }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            bgcolor: '#F9FAFB',
        }}
    >
        <IconButton
            size="small"
            onClick={() => onUpdate(Math.max(0, quantity - 1))}
            sx={{
                bgcolor: '#F3F4F6',
                borderRadius: '4px',
                width: { xs: 30, md: 36 },
                height: { xs: 30, md: 36 },
                '&:hover': { bgcolor: '#E5E7EB' },
            }}
        >
            <Remove fontSize="small" />
        </IconButton>
        <Typography
            sx={{
                px: { xs: 1.5, md: 2 },
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 500,
                minWidth: { xs: 20, md: 24 },
                textAlign: 'center',
            }}
        >
            {quantity}
        </Typography>
        <IconButton
            size="small"
            onClick={() => onUpdate(Math.min(stock, quantity + 1))}
            disabled={quantity >= stock}
            sx={{
                bgcolor: '#F3F4F6',
                borderRadius: '4px',
                width: { xs: 30, md: 36 },
                height: { xs: 30, md: 36 },
                '&:hover': { bgcolor: '#E5E7EB' },
            }}
        >
            <Add fontSize="small" />
        </IconButton>
    </Box>
);

export const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                display: 'flex',
                p: { xs: 1.5, md: 2 },
                border: '1px solid #F3F4F6',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                backgroundColor: '#fff',
                gap: { xs: 1.5, md: 3 },
                '&:hover': {
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {/* Product Image */}
            <Box
                sx={{
                    width: { xs: 100, md: 192 },
                    height: { xs: 120, md: 217 },
                    flexShrink: 0,
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={`${import.meta.env.VITE_APP_URL}${item.image_url}`}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            {/* Content Area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minWidth: 0,
                }}
            >
                {/* Top Row - Product Info and Delete Button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="h6"
                            fontWeight="500"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Chip
                            label={item.category}
                            size="small"
                            sx={{
                                bgcolor: '#F3F4F6',
                                color: '#000000',
                                fontSize: '12px',
                            }}
                        />
                    </Box>

                    {/* Delete Button - Desktop Only */}
                    {!isMobile && (
                        <IconButton
                            onClick={() => onRemove(item.id)}
                            sx={{
                                color: '#EF4444',
                                bgcolor: '#FEF2F2',
                                border: '1px solid #FECACA',
                                borderRadius: '8px',
                                width: 40,
                                height: 40,
                                ml: 2,
                                '&:hover': {
                                    bgcolor: '#FEE2E2',
                                    borderColor: '#FCA5A5',
                                },
                            }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    )}
                </Box>

                {/* Bottom Row - Price/Stock and Quantity */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mt: { xs: 1, md: 1 },
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            ${parseInt(item.price * item.quantity)}
                        </Typography>
                        <Typography color="text.secondary" fontSize="0.875rem">
                            Stock: {item.stock}
                        </Typography>
                    </Box>

                    <QuantityControl quantity={item.quantity} stock={item.stock} onUpdate={(newQty) => onUpdateQuantity(item.id, newQty)} />
                </Box>
            </Box>
        </Box>
    );
};
