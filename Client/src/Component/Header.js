import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Header() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    const userName = localStorage.getItem('EMAIL');
    if (token && userName) {
      setAuth(true);
      setUser(userName);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <Box sx={{ flexGrow:  1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lottery
          </Typography>
          {auth && (
            <div>
              <Link to="/AnnounceWinner" className='hover:bg-blue-300 p-1 rounded-xl' style={{ textDecoration: 'none', color: 'inherit' }}>
              Announce Winner
              </Link>
              {/* <Link to="/history" className='hover:bg-blue-300 p-1 rounded-xl' style={{ textDecoration: 'none', color: 'inherit', marginLeft: '20px' }}>
               Lottery History
              </Link> */}
              <Link to="/ChooseWinner" className='hover:bg-blue-300 p-1 rounded-xl' style={{ textDecoration: 'none', color: 'inherit', marginLeft: '20px', marginRight: '20px' }}>
               Choose Winner
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  border: '2px solid #fff',
                  padding: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#2598F5',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                  },
                }}
              >
                {user && user.charAt(0).toUpperCase()}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  localStorage.clear()
                  navigate('/signin')
                }}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
