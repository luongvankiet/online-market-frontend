import { useContext, useEffect, useMemo, useState } from 'react';
import moment from "moment";
import { Box, Breadcrumbs, Card, Chip, CircularProgress, IconButton, Stack, Typography } from "@mui/joy"
import DataTable from "react-data-table-component";
import * as OrderService from '../../../Services/OrderService';
import { AdminContext } from '../../../Layouts/Admin';
import { BorderColorRoundedIcon, DeleteRoundedIcon, HomeIcon, KeyboardArrowRightIcon } from '../../../Components/Icons';
import { Link, useNavigate } from "react-router-dom";
import utils from '../../../Utils';

const List = () => {
  const [orders, setOrders] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState<any>(0);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [currentUser] = useContext(AdminContext);

  const getOrderList = () => {
    OrderService.getList({ perPage: rowsPerPage, page: currentPage, search: searchTerm, sellerId: currentUser?.id })
      .then((response) => {
        setOrders(response.data);
        setTotalRows(response.meta.total);
      })
  }

  const columns = useMemo(() => [
    {
      name: 'Order Code',
      selector: (order: any) => order.order_code,
      sortable: true,
    },
    {
      name: 'Ship To',
      selector: (order: any) => '--',
      cell: (order: any) => <Stack sx={{my: 1}}>
        <Typography level='body3' sx={{fontWeight: 'bold'}}>{order.shipping_address?.name}</Typography>
        <Typography level='body3'>{order.shipping_address?.phone}</Typography>
        <Typography level='body3'>{order.shipping_address?.email}</Typography>
      </Stack>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (order: any) => order.status || '--',
      cell: (order: any) => <Chip variant='soft' color={order.status_color} size="sm">{order.status_name}</Chip>,
      sortable: true,
    },
    {
      name: 'Sale Amount',
      selector: (order: any) => order.total_price ? utils.string.numberFormat(order.total_price) : 0,
      sortable: true,
    },
    {
      name: 'Last Created At',
      selector: (order: any) => order.updated_at,
      cell: (order: any) => order.updated_at ? moment(order.updated_at).format('YYYY-MM-DD hh:mm:ss A').toLocaleString() : '--',
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row: any) => (<>
        <IconButton
          variant="plain"
          size="sm"
          color="neutral"
        // onClick={() => navigate(`/products/${product.id}`)}
        >
          <BorderColorRoundedIcon />
        </IconButton>

        <IconButton
          variant="plain"
          color="danger"
          size="sm"
        // onClick={() => {
        //   setOpenConfirmDeleteOneModal(true);
        //   setSelectedProduct(product);
        // }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </>)
    }
  ], []);

  useEffect(() => {
    getOrderList()
  }, [currentPage, rowsPerPage, currentUser]);

  useEffect(() => {
    setCurrentPage(1);
    getOrderList();
  }, [searchTerm])

  return <>
    <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<KeyboardArrowRightIcon />}
      sx={{
        '--Breadcrumbs-gap': '1rem',
        '--Icon-fontSize': '16px',
        fontWeight: 'lg',
        color: 'neutral.400',
        px: 0,
      }}
    >
      <Link className="text-muted text-decoration-none" to="/">
        <HomeIcon />
      </Link>
      <Link className="text-muted text-decoration-none" to="/">
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
        data={orders}
        selectableRows
        pagination
        // onSelectedRowsChange={({ selectedRows }) => setSelectedCategories(selectedRows)}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
        // progressPending={isLoading}
        paginationTotalRows={totalRows}
        paginationServer
        paginationDefaultPage={currentPage}
        progressComponent={<CircularProgress color="neutral" sx={{ margin: '1rem 0' }} />}
      // clearSelectedRows={toggleClearRows}
      />
    </Card>
  </>
}
export default List
