import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Auths/Login";
import * as Categories from "./Pages/Admin/Categories";
import * as Products from "./Pages/Admin/Products";
import * as Orders from "./Pages/Admin/Orders";
import Inventory from '@mui/icons-material/Inventory';
import BarChart from '@mui/icons-material/BarChart';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

interface ViewComponent {
  name: string;
  action?: string;
  layout?: any;
  element?: any;
  isRoute?: boolean;
  icon?: any;
  children?: ViewComponent[];
}

export const views: ViewComponent[] = [
  {
    name: 'Dashboard',
    action: '/',
    icon: <BarChart />,
    element: <Dashboard />
  },
  {
    name: 'Categories',
    action: '/categories',
    icon: <FormatAlignLeftIcon />,
    element: <Categories.List />
  },
  {
    name: 'Categories',
    action: '/categories/create',
    element: <Categories.Create />,
    isRoute: true,
  },
  {
    name: 'Products',
    action: '/products',
    icon: <Inventory />,
    element: <Products.List />
  },
  {
    name: 'Orders',
    action: '/orders',
    icon: <ShoppingCart />,
    element: <Orders.List />
  },
];

export const authViews: ViewComponent[] = [
  {
    name: 'Login',
    action: '/auth/login',
    element: <Login />,
  }
]

export const api = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    user: '/api/user',
  },
  users: {
    list: '/api/users',
    create: '/api/users',
    update: '/api/users/{{id}}',
    delete: '/api/users/{{id}}',
    deleteMany: '/api/users/delete-many',
  },
  categories: {
    index: '/api/categories',
    detail: '/api/categories/{{id}}',
    deleteMany: '/api/categories/delete-many',
  }
}
