import React, { useEffect, useState } from 'react';
import './ProductList.css'; 
import { Product } from '../../../utils/interface/types';
import { fetchProducts } from '../../../API/fetchProducts';
import { useCart } from '../../../contexts/CartContext/ useCart';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dispatch, state } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const isInCart = (product: Product) => {
    return state.items.hasOwnProperty(product.id);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {loading ? (
        <Typography variant="h4" align="center" sx={{ padding: '50px 0' }}>
          Loading...
        </Typography>
      ) : (
        products.map(product => (
          <Card sx={{ display: 'flex', marginBottom: '10px' }} key={product.id}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={product.image}
              alt={product.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  {product.description}
                </Typography>
                {isInCart(product) ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: product })}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ProductList;