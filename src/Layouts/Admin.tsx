import React, { useState, useEffect } from 'react';
import { Box, Button, CssVarsProvider, IconButton, Menu, MenuItem, Typography } from "@mui/joy";
import { Link, Outlet } from "react-router-dom";
import { Drawer, Header, Menu as MenuLayout, SideNav } from '../Components/Layout';
import MenuIcon from '@mui/icons-material/Menu';

import { IUser } from "../Models/User";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import * as AuthService from '../Services/AuthService';
import { IResource } from "../Models/Resource";
import Toast from '../Components/Toast';


const Admin: React.FunctionComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toast, setToast] = useState<any>({ open: false, message: '', type: 'success' });

  const [currentUser, setCurrentUser] = useState<IUser>();
  const navigate = useNavigate();

  const getAuthenticatedUser = () => {
    let user = localStorage.getItem('user');

    if (user) {
      let currentUser = JSON.parse(user);
      if (moment().isAfter(moment(currentUser.expired_at))) {
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }

      setCurrentUser(currentUser);
    } else {
      AuthService.getAuthenticatedUser()
        .then((response: IResource<IUser>) => {
          let user: any = response.data
          user = { ...user, expired_at: moment().add(2, 'hours') }
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(response.data);
        })
        .catch(() => {
          setToast({ open: true, message: 'You don`t have permission to access this page. Please login and comback!', type: 'error' })
          navigate('/auth/login');
        })
    }
  }

  const onLogout = (event: any) => {
    event.preventDefault();
    AuthService.logout().then(response => {
      navigate('/auth/login');
    });
  }

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

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

      {/* <Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Header>
          <IconButton
            variant="outlined"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography level="h4">
              Online Market
            </Typography>
          </Link>

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
                Olivia Ryhe
              </Typography>
              <Typography level="body2">olivia@email.com</Typography>
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
          </Menu>
        </Header>
        <SideNav>
          <MenuLayout />
        </SideNav>

        <Box
          component="main"
          className="MainContent"
          sx={{
            p: 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100dvh',
            gap: 1,
          }}
        >
          <Outlet />
        </Box>
      </Root>
      <Header>
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography level="h4">
            Online Market
          </Typography>
        </Link>

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
              Olivia Ryhe
            </Typography>
            <Typography level="body2">olivia@email.com</Typography>
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
        </Menu>
      </Header>
      <SideNav>
        <MenuLayout />
      </SideNav> */}

      <Header>
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography level="h4">
            Online Market
          </Typography>
        </Link>

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
              {currentUser?.name}
            </Typography>
            <Typography level="body2">{currentUser?.email}</Typography>
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
        <SideNav  currentUser={currentUser}/>
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
          <Outlet></Outlet>
        </Box>
      </Box>
    </CssVarsProvider>

    <Toast type={toast.type} message={toast.message} open={toast.open} onClose={(() => setToast({ open: false }))} />
  </>
}

export default Admin
