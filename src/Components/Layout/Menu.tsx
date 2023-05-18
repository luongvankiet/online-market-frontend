import { Box, IconButton, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Sheet, Typography } from "@mui/joy";
import BarChart from '@mui/icons-material/BarChart';
import Inventory from '@mui/icons-material/Inventory';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const Menu: React.FunctionComponent = () => {
  return <>
    <Sheet sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <List size={'md'}
        sx={{ '--ListItem-radius': '8px' }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <BarChart />
            </ListItemDecorator>
            <ListItemContent>Overview</ListItemContent>
          </ListItemButton>
        </ListItem>

        <ListItem variant="soft">
          <ListItemButton
            href="/products"
            component="a">
            <ListItemDecorator>
              <Inventory />
            </ListItemDecorator>
            <ListItemContent>Products</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <ShoppingCart />
            </ListItemDecorator>
            <ListItemContent>Orders</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Box sx={{
        pl: 1, mt: 'auto', display: 'flex', alignItems: 'center',
        flexGrow: 0,
      }}>
        <div>
          <Typography fontWeight="lg" level="body2">
            Olivia Ryhe
          </Typography>
          <Typography level="body2">olivia@email.com</Typography>
        </div>
        <IconButton variant="plain" sx={{ ml: 'auto' }}>
          <i data-feather="log-out" />
        </IconButton>
      </Box> */}
    </Sheet>
  </>
}

export default Menu;
