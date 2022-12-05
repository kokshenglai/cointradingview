import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function TopBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CurrencyBitcoinIcon className="cursor-pointer" onClick={() => handleClick()} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            className="cursor-pointer"
            onClick={() => handleClick()}
          >
            Coin Trading View
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}