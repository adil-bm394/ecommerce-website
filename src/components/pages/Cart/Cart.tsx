import React from 'react';
import './Cart.css'; 
import { useCart } from '../../../contexts/CartContext/ useCart';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <Box sx={{ padding: '20px' }}>
      {Object.values(state.items).map(item => (
        <Card sx={{ display: 'flex', marginBottom: '10px' }} key={item.id}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={item.image}
            alt={item.title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography component="div" variant="h5">
                {item.title}
              </Typography>
               <Typography variant="body2" color="text.secondary" component="div">
                  {item.description}
                </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                ${item.price}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
              >
                Remove
              </Button>
            </CardContent>
          </Box>
        </Card>
      ))}
      <Typography variant="h6">
        Total: ${state.total.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: 'CLEAR_CART' })}
      >
        Clear Cart
      </Button>
    </Box>
  );
};

export default Cart;