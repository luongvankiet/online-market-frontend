import { Box, IconButton, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader, Sheet, Typography } from "@mui/joy"

import { views } from "../../paths";
import React from "react";
import utils from "../../Utils";
import { useNavigate } from "react-router-dom";

interface SideNavProps {
  currentUser?: any;
  children?: any;
}

const SideNav: React.FunctionComponent<SideNavProps> = (props) => {
  const navigate = useNavigate();

  return <>
    <Box
      className="SecondSidebar-overlay"
      sx={{
        position: 'fixed',
        zIndex: 9998,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.body',
        opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
        transition: 'opacity 0.4s',
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
          lg: 'translateX(-100%)',
        },
      }}
    />
    <Sheet
      className="SecondSidebar"
      sx={{
        position: {
          xs: 'fixed',
          lg: 'sticky',
        },
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.4s',
        zIndex: 2,
        height: '100dvh',
        top: 0,
        p: 2,
        py: 3,
        flexShrink: 0,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <List
        sx={{
          '--ListItem-radius': '8px',
          '--ListItem-minHeight': '32px',
          '--List-gap': '4px',
        }}
      >
        <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
          Dashboard
        </ListSubheader>

        {views.map((route: any) => {
          if (route.isRoute) {
            return <React.Fragment key={utils.newGuid()}></React.Fragment>;
          }

          return <ListItem key={utils.newGuid()}>
            <ListItemButton onClick={() => navigate(route.action)}>
              <ListItemDecorator>
                {route.icon}
              </ListItemDecorator>
              <ListItemContent>{route.name}</ListItemContent>
            </ListItemButton>
          </ListItem>
        })}
      </List>

    </Sheet>
  </>
}

export default SideNav
