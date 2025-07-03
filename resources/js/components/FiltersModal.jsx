import { Close } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Modal, Slide, Slider, Typography } from '@mui/material';
import { useState } from 'react';

const modalStyle = {
    position: 'absolute',
    top: 0,
    left: 0, // <-- Change this from 'right' to 'left'

    // right: 0,
    height: '100%',
    width: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
};

const categories = ['T-shirts', 'Polo', 'Jeans', 'Shirts'];

export default function FiltersModal({ open, onClose, currentFilters, onApplyFilters }) {
    const [priceRange, setPriceRange] = useState([currentFilters.min_price || 0, currentFilters.max_price || 300]);
    const [selectedCategories, setSelectedCategories] = useState(currentFilters.category ? currentFilters.category.split(',') : []);

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories((prev) => (checked ? [...prev, name] : prev.filter((c) => c !== name)));
    };

    const handleApply = () => {
        onApplyFilters({
            min_price: priceRange[0],
            max_price: priceRange[1],
            category: selectedCategories.join(','),
        });
        onClose();
    };

    const handleClear = () => {
        setPriceRange([0, 300]);
        setSelectedCategories([]);
        onApplyFilters({ min_price: 0, max_price: 300, category: '' });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            {/* Add Slide component for animation */}
            <Slide direction="right" in={open}>
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Filters
                        </Typography>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Typography fontWeight="500">Price</Typography>
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={500}
                        sx={{ my: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>${priceRange[0]}</Typography>
                        <Typography>${priceRange[1]}</Typography>
                    </Box>
                    <Typography fontWeight="500" sx={{ mt: 3, mb: 1 }}>
                        Category
                    </Typography>
                    <FormGroup>
                        {categories.map((cat) => (
                            <FormControlLabel
                                key={cat}
                                control={<Checkbox checked={selectedCategories.includes(cat)} onChange={handleCategoryChange} name={cat} />}
                                label={cat}
                            />
                        ))}
                    </FormGroup>
                    <Box sx={{ mt: 'auto' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleApply}
                            sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
                        >
                            Apply Filter
                        </Button>
                        <Button fullWidth onClick={handleClear} sx={{ mt: 1, color: 'text.secondary' }}>
                            Clear all filters
                        </Button>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}
