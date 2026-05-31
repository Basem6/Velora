import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { CartContext } from '../Context/Productscontext';

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        padding: '0 3px',
        background:"#f0c38c",
        color:"black"

    },
}));

export default function CustomizedBadges({style, onClick}) {
    const { state } = useContext(CartContext);
    
    // Calculate total items in cart
    const cartItemsCount = state
        .filter(item => item.addtocard === true)
        .reduce((total, item) => total + item.countincart, 0);

    return (
        <IconButton aria-label="cart" sx={{color:style}} onClick={onClick} >
        <StyledBadge badgeContent={cartItemsCount} >
            <ShoppingCartIcon />
        </StyledBadge>
        </IconButton>
    );
}
