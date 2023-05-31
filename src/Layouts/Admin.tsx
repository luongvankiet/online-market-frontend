import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, CssVarsProvider, IconButton, Menu, MenuItem, Typography } from "@mui/joy";
import { Link, Outlet } from "react-router-dom";
import { Drawer, Header, Menu as MenuLayout, SideNav } from '../Components/Layout';
import MenuIcon from '@mui/icons-material/Menu';

import { IUser } from "../Models/User";
import { useNavigate } from "react-router-dom"; 
import moment from "moment";
import * as AuthService from '../Services/AuthService';
import { AppContext } from '../App';

export const AdminContext = React.createContext<any>(null);

const Admin: React.FunctionComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [currentUser, setCurrentUser] = useState<IUser>();
  const [user, setUser] = useState<any>(localStorage.getItem('user'));
  const { setToast } = useContext(AppContext);

  const navigate = useNavigate();

  const onLogout = (event: any) => {
    event.preventDefault();
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user')
    }

    navigate('/auth/login');
  }

  useEffect(() => {
    if (!user) {
      setToast({
        open: true,
        message: 'You don\'t have permission to access this page, please login and try again!',
        type: 'error'
      })
      navigate('/auth/login');
      return;
    }

    const userData = JSON.parse(user);
    if (moment().isAfter(moment(userData.expired_at))) {
      localStorage.removeItem('user');
      navigate('/auth/login');
      return
    }

    setCurrentUser(userData);
  }, [user]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <CssVarsProvider>
      {drawerOpen && (
        <Drawer onClose={() => setDrawerOpen(false)}>
          <MenuLayout />
        </Drawer>
      )}

      <Header>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { lg: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography level="h4">
              Online Market
            </Typography>
          </Link>
        </Box>

        <Button
          id="project-menu"
          aria-controls={open ? 'project-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="plain"
          color="neutral"
          onClick={handleClick}
        >
          <div>
            <Typography level="body1">
              {currentUser?.username}
            </Typography>
          </div>
        </Button>
        <Menu
          id="project-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="project-menu"
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Header>
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <SideNav currentUser={currentUser} />
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
              sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 12,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
          })}
        >
          <AdminContext.Provider value={[currentUser, setCurrentUser]}>
            <Outlet></Outlet>
          </AdminContext.Provider>
        </Box>
      </Box>
    </CssVarsProvider>
  </>
}

export default Admin
