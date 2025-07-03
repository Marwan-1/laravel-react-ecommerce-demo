import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';


// Context
import { useCart } from '../context/CartContext';

// Components
import FiltersModal from '../components/FiltersModal';
import { Header } from '../components/Header';
import { OrderSummary } from '../components/OrderSummary';
import { ProductCard } from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

// Material UI
import {
    Alert,
    Badge,
    Box,
    Breadcrumbs,
    CircularProgress,
    Container,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Modal,
    Link as MuiLink,
    Pagination,
    TextField,
    Typography,
} from '@mui/material';
// Import the correct icons: Tune for desktop, FilterList for mobile
import { FilterList, Search, ShoppingCart, Tune } from '@mui/icons-material';

// Define a constant for the header height + margin to ensure consistency
const STICKY_TOP_OFFSET = '88px'; // 64px for Header + 24px margin

export default function ProductsPage() {
    // --- STATE AND HANDLERS ---
    const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ name: '', category: '', min_price: 0, max_price: 500 });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isCartModalOpen, setCartModalOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const fetchProducts = useCallback(async (currentPage, currentFilters) => {
        setLoading(true);
        try {
            const params = { page: currentPage, ...currentFilters };
            if (!params.name) delete params.name;
            if (!params.category) delete params.category;
            const response = await api.get('/products', { params });
            setProducts(response.data.data);
            setPagination(response.data);
        } catch (err) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const debouncedFetch = debounce(() => fetchProducts(page, filters), 300);
        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [page, filters, fetchProducts]);

    const handleSearchChange = (e) => {
        setPage(1);
        setFilters((prev) => ({ ...prev, name: e.target.value }));
    };
    const handleApplyFilters = (newFilters) => {
        setPage(1);
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };
    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setDetailModalOpen(true);
    };
    const handlePlaceOrder = async () => {
        if (cartItems.length === 0 || isPlacingOrder) return;
        setIsPlacingOrder(true);
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
            setIsPlacingOrder(false);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="xl" sx={{ my: 4, px: { xs: 2, md: 5 } }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, display: { xs: 'none', md: 'block' } }}>
                    <MuiLink underline="hover" color="inherit" href="/">
                        Home
                    </MuiLink>
                    <Typography color="text.primary">Casual</Typography>
                </Breadcrumbs>

                {/* ---  MAIN LAYOUT --- */}
                <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
                    {/* 1. DESKTOP FLOATING FILTER BUTTON - Hidden on Mobile */}
                    <Box sx={{ width: '70px', display: { xs: 'none', md: 'block' } }}>
                        {/* Make this container sticky and apply the offset */}
                        <Box sx={{ position: 'sticky', top: STICKY_TOP_OFFSET }}>
                            <IconButton
                                onClick={() => setFilterModalOpen(true)}
                                sx={{
                                    border: '1px solid #E8E8E8',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    width: '70px',
                                    height: '70px',
                                }}
                            >
                                <Tune />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* 2. MAIN CONTENT (Products Grid) */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="Search by product name"
                                value={filters.name}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#fff', '.MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                            {/* MOBILE FILTER BUTTON - Hidden on Desktop */}
                            <IconButton
                                onClick={() => setFilterModalOpen(true)}
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    p: 1.5,
                                    backgroundColor: '#F0F0F0',
                                    borderRadius: '50%',
                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                }}
                            >
                                <FilterList />
                            </IconButton>
                        </Box>

                        <Typography variant="h5" fontWeight="bold">
                            Casual
                        </Typography>
                        <Typography color="text.secondary" sx={{ my: 1 }}>
                            Showing {pagination.from}-{pagination.to} of {pagination.total} Products
                        </Typography>

                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Alert severity="error">{error}</Alert>
                        ) : (
                            <>
                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 1 }}>
                                    {products.map((product) => (
                                        <Grid item key={product.id} xs={6} md={4}>
                                            <ProductCard product={product} onCardClick={handleCardClick} onAddToCart={addToCart} />
                                        </Grid>
                                    ))}
                                </Grid>
                                {pagination.last_page > 1 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Pagination
                                            count={pagination.last_page}
                                            page={page}
                                            onChange={(e, value) => setPage(value)}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>

                    {/* 3. ORDER SUMMARY - Hidden on Mobile */}
                    <Box sx={{ width: '350px', display: { xs: 'none', md: 'block' } }}>
                        <OrderSummary
                            cartItems={cartItems}
                            total={cartTotal}
                            onCheckout={handlePlaceOrder}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                            isLoading={isPlacingOrder}
                        />
                    </Box>
                </Box>
            </Container>

            {/* --- MODALS & FLOATING ACTION BUTTON --- */}
            {cartItems.length > 0 && (
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={() => navigate('/cart')} // <-- Change this from opening a modal
                    sx={{ position: 'fixed', bottom: 16, right: 16, display: { xs: 'flex', md: 'none' } }}
                >
                    <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
                        <ShoppingCart sx={{ mr: 1 }} />
                    </Badge>
                    View Cart
                </Fab>
            )}
            <ProductDetailModal
                product={selectedProduct}
                open={isDetailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                onAddToCart={addToCart}
            />
            <FiltersModal
                open={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                currentFilters={filters}
                onApplyFilters={handleApplyFilters}
            />
            <Modal open={isCartModalOpen} onClose={() => setCartModalOpen(false)} sx={{ display: { md: 'none' } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        bgcolor: 'background.paper',
                        p: 2,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }}
                >
                    <OrderSummary
                        cartItems={cartItems}
                        total={cartTotal}
                        onCheckout={handlePlaceOrder}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                </Box>
            </Modal>
        </Box>
    );
}
