import { Box, Breadcrumbs, Button, Card, CircularProgress, IconButton, Menu, Typography } from "@mui/joy";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmModal, Dropdown } from "../../../Components";
import { AddIcon, BorderColorRoundedIcon, DeleteRoundedIcon, HomeIcon, KeyboardArrowRightIcon } from "../../../Components/Icons";
import { ICategory } from "../../../Models/Category";
import { ICollection } from "../../../Models/Resource";
import * as CategoryService from '../../../Services/CategoryService';
import utils from "../../../Utils";
import { AppContext } from "../../../App";
import { AdminContext } from "../../../Layouts/Admin";

const List: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmDeleteManyModal, setOpenConfirmDeleteManyModal] = useState(false);
  const [openConfirmDeleteOneModal, setOpenConfirmDeleteOneModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentUser] = useContext(AdminContext);
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();

  const getCategoryList = () => {
    setIsLoading(true);
    CategoryService.getList({ limit: rowsPerPage, page: currentPage, sellerId: currentUser?.id })
      .then((response: ICollection<ICategory>) => {
        setCategories(response.data);
      })
      .finally(() => setIsLoading(false));
  }

  const onConfirmDeleteOne = () => {
    if (!selectedCategory) {
      setToast({ open: true, message: 'Please select at lease one category to delete!', type: 'error' })
      return;
    }

    CategoryService.deleteOne(selectedCategory.id)
      .then(() => {
        setOpenConfirmDeleteOneModal(false);
        setToast({ open: true, message: 'Category has been deleted successfully!', type: 'success' });
        getCategoryList();
      })
      .catch(() => {
        setOpenConfirmDeleteOneModal(false);
        setToast({ open: true, message: 'Failed to delete category!', type: 'error' });
      })
  }

  const onConfirmDeleteMany = () => {
    if (!selectedCategories || selectedCategories.length < 1) {
      setToast({ open: true, message: 'Please select at lease one category to delete!', type: 'error' })
      return;
    }

    const ids = selectedCategories.map(category => category.id)

    CategoryService.deleteMany(ids)
      .then(() => {
        setOpenConfirmDeleteManyModal(false);
        setToast({ open: true, message: 'Categories have been deleted successfully!', type: 'success' });
        getCategoryList();
        setSelectedCategories([]);
        setToggleClearRows(!toggleClearRows);
      })
      .catch(() => {
        setOpenConfirmDeleteManyModal(false);
        setToast({ open: true, message: 'Failed to delete categories!', type: 'error' });
      })
  }

  const columns = useMemo(() => [
    {
      name: 'Name',
      selector: (row: ICategory) => row.name || '--',
      sortable: true,
    },
    {
      name: 'Product Count',
      selector: (row: any) => row.products_count || 0,
      sortable: true,
      center: true,
    },
    {
      name: 'Published',
      cell: (row: ICategory) => {
        return <>
          {!row.published_at
            ? 'Unpublished'
            : (moment(row.published_at).isSameOrBefore(moment())
              ? 'Published'
              : utils.dateFormat(row.published_at))}
        </>
      },
      sortable: true,
    },
    {
      name: 'Last Modified At',
      cell: (row: ICategory) => row.updated_at ? moment(row.updated_at).format('YYYY-MM-DD hh:mm:ss A').toLocaleString() : '--',
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row: any) => (<>
        <IconButton variant="plain" size="sm"
          color="neutral" onClick={() => navigate(`/categories/${row.id}`)}>
          <BorderColorRoundedIcon />
        </IconButton>

        <IconButton variant="plain"
          color="danger"
          size="sm"
          onClick={() => {
            setOpenConfirmDeleteOneModal(true);
            setSelectedCategory(row);
          }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </>)
    }
  ], []);

  useEffect(() => {
    getCategoryList()
  }, [currentPage, rowsPerPage]);

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
        Categories
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
        Categories
      </Typography>
      <Button startDecorator={<AddIcon />}
        size="sm"
        onClick={() => navigate('/categories/create')}
      >Create</Button>
    </Box >

    <Card>
      {selectedCategories?.length > 0 && <Box sx={{ width: 300 }}>
        <Dropdown title={`${selectedCategories.length} selected`} items={[
          { text: 'Delete selected items', onClick: () => setOpenConfirmDeleteManyModal(true) }
        ]} />
      </Box>}

      <DataTable
        columns={columns}
        data={categories}
        selectableRows
        pagination
        onSelectedRowsChange={({ selectedRows }) => setSelectedCategories(selectedRows)}
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
