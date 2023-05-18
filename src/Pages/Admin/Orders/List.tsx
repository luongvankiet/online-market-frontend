import { useMemo } from 'react';
import { Box, Breadcrumbs, Card, Chip, IconButton, Link, Typography } from "@mui/joy"
import DataTable from "react-data-table-component";

import moment from "moment";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Home from '@mui/icons-material/Home';
import BorderColor from '@mui/icons-material/BorderColor';
import Delete from '@mui/icons-material/Delete';

const Dashboard = () => {

  const products = [
    {
      "name": "Elvis Presley",
      "shipTo": 'Tupelo, MS',
      "status": "Completed",
      "productsCount": 6,
      "totalPrice": '$412',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Paul McCartney",
      "shipTo": 'London, UK',
      "status": "Processing",
      "productsCount": 10,
      "totalPrice": '$2141',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Paul McCartney",
      "shipTo": 'London, UK',
      "status": "Processing",
      "productsCount": 10,
      "totalPrice": '$841',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Bruce Springsteen",
      "shipTo": 'London, UK',
      "status": "Cancelled",
      "productsCount": 2,
      "totalPrice": '$100.81',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
    {
      "name": "Michael Jackson",
      "shipTo": 'Long Branch, NJ',
      "status": "Cancelled",
      "productsCount": 32,
      "totalPrice": '$1100.81',
      "updatedAt": "2023-04-15T06:16:23.916Z",
    },
  ];

  const getStatus = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Chip variant="soft" color="success">{status}</Chip>
      case 'Delivering':
        return <Chip variant="soft" color="warning">{status}</Chip>
      case 'Shipped':
        return <Chip variant="soft" color="success">{status}</Chip>
      case 'Processing':
        return <Chip variant="soft" color="primary">{status}</Chip>
      case 'Cancelled':
      case 'Unpaid':
        return <Chip variant="soft" color="danger">{status}</Chip>
      default:
        return <Chip variant="soft" color="primary">{status}</Chip>
    }
  }

  const columns = useMemo(() => [
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Ship To',
      selector: (row: any) => row.shipTo || '--',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status || '--',
      cell: (row: any) => getStatus(row.status),
      sortable: true,
    },
    {
      name: 'Products',
      selector: (row: any) => row.productsCount,
      sortable: true,
    },
    {
      name: 'Sale Amount',
      selector: (row: any) => row.totalPrice || '--',
      sortable: true,
    },
    {
      name: 'Last Created At',
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
        Orders
      </Typography>
    </Breadcrumbs>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        my: 1,
        gap: 1,
      }}
    >
      <Typography level="h1" fontSize="xl4">
        Orders
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
export default Dashboard
