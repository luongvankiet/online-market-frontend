import { Link as RouterLink } from "react-router-dom";
import { useMemo } from "react";
import { Breadcrumbs, Button, Typography, Link, Grid, Box, Card, IconButton, Chip } from "@mui/joy";


import BorderColor from '@mui/icons-material/BorderColor';
import Delete from '@mui/icons-material/Delete';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Home from '@mui/icons-material/Home';
import DataTable from "react-data-table-component";
import moment from "moment";

const List: React.FunctionComponent = () => {
  const products = [
    {
      "name": "Orange",
      "category": "Fruit",
      "status": "In Stock",
      "quantity": 100,
      "unit": 'kg',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Apple",
      "category": "Fruit",
      "status": "In Stock",
      "quantity": 50,
      "unit": 'kg',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Bananas",
      "category": "Fruit",
      "status": "Out of Stock",
      "quantity": 0,
      "unit": 'kg',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Beef Scotch Fillet",
      "category": "Meat",
      "status": "Out of Stock",
      "quantity": 0,
      "unit": 'kg',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Pork mince",
      "category": "Meat",
      "status": "In Stock",
      "quantity": 10,
      "unit": 'kg',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
  ];

  const columns = useMemo(() => [
    {
      name: 'Name',
      selector: (row: any) => row.name || '--',
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row: any) => row.quantity,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: (row: any) => row.unit || '--',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status || '--',
      cell: (row: any) => <Chip variant="soft" color={row.status === 'In Stock' ? 'primary' : 'danger'}>{row.status}</Chip>,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: any) => row.category || '--',
      sortable: true,
    },
    {
      name: 'Last Modified At',
      selector: (row: any) => row.updatedAt,
      cell: (row: any) => row.updatedAt ? moment(row.updatedAt).format('YYYY-MM-DD hh:mm:ss A').toLocaleString() : '--',
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row: any) => (<>
        <IconButton variant="plain" size="sm"
          color="neutral">
          <BorderColor />
        </IconButton>

        <IconButton variant="plain" color="danger">
          <Delete />
        </IconButton>

        {/* <Link className="btn btn-icon btn-sm btn-flat-primary my-1" to={`/users/${row._id}`}>
          <i className="feather icon-edit"></i>
        </Link>

        <Button className="btn btn-icon btn-sm btn-flat-danger my-1" onClick={() => onSelectDelete(row)}>
          <i className="feather icon-trash"></i>
        </Button> */}
      </>)
    }
  ], []);
  return <>
    <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<KeyboardArrowRight />}
      sx={{
        '--Breadcrumbs-gap': '1rem',
        '--Icon-fontSize': '16px',
        fontWeight: 'lg',
        color: 'neutral.400',
        px: 0,
      }}
    >
      <Link
        underline="none"
        color="neutral"
        fontSize="inherit"
        href="#some-link"
        aria-label="Home"
      >
        <Home />
      </Link>
      <Link
        underline="hover"
        color="neutral"
        fontSize="inherit"
        href="#some-link"
      >
        Dashboard
      </Link>
      <Typography fontSize="inherit" variant="soft">
        Products
      </Typography>
    </Breadcrumbs>

    <Grid ></Grid>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        my: 1,
        gap: 1,
      }}
    >
      <Typography level="h1" fontSize="xl4">
        Products
      </Typography>
    </Box >

    <Card>
      <DataTable
        columns={columns}
        data={products}
        selectableRows
        pagination />
    </Card>
  </>
}

export default List
