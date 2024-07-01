import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" component={Link} to="/">Products</Button>
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/cart">Go to Cart</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
