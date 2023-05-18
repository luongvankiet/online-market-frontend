import { Breadcrumbs, Typography, Link, Grid, Box, Card, IconButton, Button } from "@mui/joy";

import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Home from '@mui/icons-material/Home';
import DataTable from "react-data-table-component";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { ICategory } from "../../../Models/Category";
import * as CategoryService from '../../../Services/CategoryService';
import { ICollection } from "../../../Models/Resource";
import utils from "../../../Utils";

const List: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getCategoryList = () => {
    CategoryService.getList({ limit: rowsPerPage, page: currentPage })
      .then((response: ICollection<ICategory>) => {
        setCategories(response.data);
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
      selector: (row: any) => row.product_count || 0,
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
          color="neutral">
          <BorderColorRoundedIcon fontSize="small" />
        </IconButton>

        <IconButton variant="plain" color="danger" size="sm">
          <DeleteRoundedIcon fontSize="small" />
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
      <Button component="a" href="/categories/create" size="sm">Create</Button>
    </Box >

    <Card>
      <DataTable
        columns={columns}
        data={categories}
        selectableRows
        pagination
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
      />
    </Card>
  </>
}

export default List
