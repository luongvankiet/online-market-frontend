import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Auths/Login";
import * as Categories from "./Pages/Admin/Categories";
import * as Products from "./Pages/Admin/Products";
import * as Orders from "./Pages/Admin/Orders";
import { BarChartIcon, FormatAlignLeftIcon } from "./Components/Icons";
import InventoryIcon from "./Components/Icons/IventoryIcon";
import ShoppingCartIcon from "./Components/Icons/ShoppingCardIcon";

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
    icon: <BarChartIcon />,
    element: <Dashboard />
  },
  {
    name: 'Categories',
    action: '/categories',
    icon: <FormatAlignLeftIcon />,
    element: <Categories.List />
  },
  {
    name: 'Create Category',
    action: '/categories/create',
    element: <Categories.Create />,
    isRoute: true,
  },
  {
    name: 'Edit Category',
    action: '/categories/:id',
    element: <Categories.Edit />,
    isRoute: true,
  },
  {
    name: 'Products',
    action: '/products',
    icon: <InventoryIcon />,
    element: <Products.List />
  },
  {
    name: 'Create Products',
    action: '/products/create',
    element: <Products.Create />,
    isRoute: true,
  },
  {
    name: 'Edit Products',
    action: '/products/:id',
    element: <Products.Edit />,
    isRoute: true,
  },
  {
    name: 'Orders',
    action: '/orders',
    icon: <ShoppingCartIcon />,
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
    login: 'http://170.64.156.57:8001/api/login/seller',
    // login: '/api/auth/login',
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
  },
  products: {
    index: '/api/products',
    detail: '/api/products/{{id}}',
    deleteMany: '/api/products/delete-many',
  },
  orders: {
    index: '/api/orders',
    detail: '/api/orders/{{id}}',
    deleteMany: '/api/orders/delete-many',
  }
}
