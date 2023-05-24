import { List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader, Sheet } from "@mui/joy";
import React from "react";
import utils from "../../Utils";
import { views } from "../../paths";
import { useNavigate } from "react-router-dom";

const Menu: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return <>
    <Sheet sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <List size={'md'}
        sx={{ '--ListItem-radius': '8px' }}
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

export default Menu;
