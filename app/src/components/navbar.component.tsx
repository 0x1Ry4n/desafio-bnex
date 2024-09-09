import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthService from '../services/auth.service';
import IUser from '../types/user.type';
import EventBus from '../common/EventBus';

import { AppBar, Box, Toolbar, Button, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type State = {
  currentUser: IUser | undefined;
};

function NavBar() {
  const [state, setState] = useState<State>({
    currentUser: undefined,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setState({
        currentUser: user,
      });
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    AuthService.logout();
    setState({
      currentUser: undefined,
    });
    navigate('/login');
  };

  const { currentUser } = state;

  const buttonStyle = {
    color: 'white',
    '&:hover': {
      backgroundColor: 'inherit',
      opacity: [0.9, 0.8, 0.7],
    },
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <>
      <AppBar
        position='static'
        sx={{
          backgroundColor: '#000000',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side (Logo or Home & Products links) */}
          <Box display="flex" alignItems="center">
            <Link to={'/home'} style={linkStyle}>
              <IconButton sx={buttonStyle} size="large">
                <HomeIcon />
              </IconButton>
            </Link>

            <Link to={'/products'} style={linkStyle}>
              <IconButton sx={buttonStyle} size="large">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
          </Box>

          {/* Right side (Profile/Login/Logout) */}
          <Box display="flex" alignItems="center">
            {currentUser ? (
              <>
                <Link to={'/profile'} style={linkStyle}>
                  <Button disableRipple sx={buttonStyle} startIcon={<AccountCircleIcon />}>
                    {currentUser.username}
                  </Button>
                </Link>

                <IconButton
                  sx={buttonStyle}
                  onClick={() => logOut()}
                  size="large"
                >
                  <ExitToAppIcon />
                  <Typography sx={{ ml: 1 }}>Logout</Typography>
                </IconButton>
              </>
            ) : (
              <>
                <Link to={'/login'} style={linkStyle}>
                  <Button
                    disableRipple
                    sx={buttonStyle}
                    startIcon={<LoginIcon />}
                  >
                    Login
                  </Button>
                </Link>

                <Link to={'/register'} style={linkStyle}>
                  <Button
                    disableRipple
                    sx={buttonStyle}
                    startIcon={<PersonAddIcon />}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
