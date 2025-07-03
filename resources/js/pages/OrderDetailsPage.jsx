import { Alert, Box, Button, CircularProgress, Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/orders/${id}`)
            .then((response) => setOrder(response.data))
            .catch(() => setError('Could not fetch order details.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!order) return <Typography>Order not found.</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Order Details
                </Typography>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Placed on: {new Date(order.created_at).toLocaleDateString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" gutterBottom>
                    Items
                </Typography>
                <List>
                    {order.products.map((product) => (
                        <ListItem key={product.id} secondaryAction={<Typography>${(product.pivot.quantity * product.price).toFixed(2)}</Typography>}>
                            <ListItemText primary={product.name} secondary={`Quantity: ${product.pivot.quantity}`} />
                        </ListItem>
                    ))}
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                        <ListItemText primary={<Typography variant="h6">Total Cost</Typography>} />
                        <Typography variant="h6">${parseFloat(order.total_cost).toFixed(2)}</Typography>
                    </ListItem>
                </List>
                <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
                    Back to Shop
                </Button>
            </Box>
        </Container>
    );
}
