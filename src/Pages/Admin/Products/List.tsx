import { Box, Breadcrumbs, Button, Card, Chip, CircularProgress, Grid, IconButton, Input, Stack, Typography } from "@mui/joy";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { AppContext } from "../../../App";
import { AdminContext } from "../../../Layouts/Admin";
import { IProduct } from "../../../Models/Product";
import * as ProductService from '../../../Services/ProductService';
import { Link, useNavigate } from "react-router-dom";
import { ICollection } from "../../../Models/Resource";
import { AddIcon, BorderColorRoundedIcon, DeleteRoundedIcon, HomeIcon, KeyboardArrowRightIcon, SearchIcon } from "../../../Components/Icons";
import { ConfirmModal, Dropdown } from "../../../Components";
import debounce from 'lodash.debounce';

const List: React.FunctionComponent = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmDeleteManyModal, setOpenConfirmDeleteManyModal] = useState(false);
  const [openConfirmDeleteOneModal, setOpenConfirmDeleteOneModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentUser] = useContext(AdminContext);
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();

  const getProductList = () => {
    setIsLoading(true);
    ProductService.getList({ limit: rowsPerPage, page: currentPage, sellerId: currentUser?.id, search: searchTerm })
      .then((response: ICollection<IProduct>) => {
        setProducts(response.data);
      })
      .finally(() => setIsLoading(false));
  }

  const columns = useMemo(() => [
    {
      name: 'Name',
      selector: (product: IProduct) => product.name || '--',
      cell: (product: IProduct) => <Stack direction="row" spacing={2}
        alignItems="center">
        <img src={product.image || `${process.env.REACT_APP_PUBLIC_URL}/assets/images/placeholders/placeholder-image.png`} width={30} height={30} alt="" />
        <Typography>{product.name}</Typography>
      </Stack>,
      width: '200px',
      sortable: true,
    },
    {
      name: 'Sku',
      selector: (product: IProduct) => product.product_sku || '--',
      sortable: true,
    },
    {
      name: 'Code',
      selector: (product: IProduct) => product.product_code || '--',
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (product: IProduct) => product.quantity || 0,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: (product: IProduct) => product.unit || '--',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (product: IProduct) => product.status || '--',
      cell: (product: IProduct) => <Chip size="sm" variant="soft" color={product.status_color || 'primary'}>{product.status_name}</Chip>,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (product: IProduct) => product.category?.name || '--',
      cell: (product: IProduct) => <Link className="text-decoration-none" to={`/categories/${product.category?.id}`}>{product.category?.name}</Link>,
      sortable: true,
    },
    {
      name: 'Last Modified At',
      selector: (product: IProduct) => product.updated_at || '--',
      cell: (product: IProduct) => product.updated_at ? moment(product.updated_at).format('YYYY-MM-DD hh:mm:ss A').toLocaleString() : '--',
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (product: IProduct) => (<>
        <IconButton
          variant="plain"
          size="sm"
          color="neutral"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <BorderColorRoundedIcon />
        </IconButton>

        <IconButton
          variant="plain"
          color="danger"
          size="sm"
          onClick={() => {
            setOpenConfirmDeleteOneModal(true);
            setSelectedProduct(product);
          }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </>)
    }
  ], []);

  useEffect(() => {
    getProductList()
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    getProductList();
  }, [searchTerm])


  const onConfirmDeleteOne = () => {
    if (!selectedProduct) {
      setToast({ open: true, message: 'Please select at lease one product to delete!', type: 'error' })
      return;
    }

    ProductService.deleteOne(selectedProduct.id)
      .then(() => {
        setOpenConfirmDeleteOneModal(false);
        setToast({ open: true, message: 'Product has been deleted successfully!', type: 'success' });
        getProductList();
      })
      .catch(() => {
        setOpenConfirmDeleteOneModal(false);
        setToast({ open: true, message: 'Failed to delete product!', type: 'error' });
      })
  }

  const onConfirmDeleteMany = () => {
    if (!selectedProducts || selectedProducts.length < 1) {
      setToast({ open: true, message: 'Please select at lease one product to delete!', type: 'error' })
      return;
    }

    const ids = selectedProducts.map(product => product.id)

    ProductService.deleteMany(ids)
      .then(() => {
        setOpenConfirmDeleteManyModal(false);
        setToast({ open: true, message: 'Products have been deleted successfully!', type: 'success' });
        getProductList();
        setSelectedProducts([]);
        setToggleClearRows(!toggleClearRows);
      })
      .catch(() => {
        setOpenConfirmDeleteManyModal(false);
        setToast({ open: true, message: 'Failed to delete products!', type: 'error' });
      })
  }

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
        Products
      </Typography>
    </Breadcrumbs>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        my: 1,
        gap: 1,
      }}
    >
      <Typography level="h1" fontSize="xl4">
        Products
      </Typography>
      <Button startDecorator={<AddIcon />}
        size="sm"
        onClick={() => navigate('/products/create')}
      >Create</Button>
    </Box >

    <Card>
      <Grid container spacing={2}>
        <Grid xs={3} sm={2} xl={1}>
          <Box sx={{ width: '100%' }}>
            <Dropdown
              title={selectedProducts.length > 0 ? `${selectedProducts.length} selected` : 'Actions'} fullWidth
              items={[
                { text: 'Delete selected items', onClick: () => setOpenConfirmDeleteManyModal(true) }
              ]}
            />
          </Box>
        </Grid>
        <Grid xs={9} sm={10} xl={11}>
          <Input startDecorator={<SearchIcon />}
            onChange={debounce((e: any) => setSearchTerm(e.target.value), 500)} />
        </Grid>
      </Grid>

      <DataTable
        columns={columns}
        data={products}
        selectableRows
        pagination
        onSelectedRowsChange={({ selectedRows }) => setSelectedProducts(selectedRows)}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
        progressPending={isLoading}
        progressComponent={<CircularProgress color="neutral" sx={{ margin: '1rem 0' }} />}
        clearSelectedRows={toggleClearRows}
      />
    </Card>

    <ConfirmModal
      open={openConfirmDeleteOneModal}
      setOpen={setOpenConfirmDeleteOneModal}
      onSubmit={onConfirmDeleteOne}
    />

    <ConfirmModal
      open={openConfirmDeleteManyModal}
      setOpen={setOpenConfirmDeleteManyModal}
      onSubmit={onConfirmDeleteMany}
    />
  </>
}

export default List
