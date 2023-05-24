import { Autocomplete, Box, Breadcrumbs, Button, Card, FormControl, FormLabel, Grid, Input, Switch, Typography } from "@mui/joy";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import DatePicker from "../../../Components/Form/DatePicker";
import Editor from "../../../Components/Form/Editor";
import { AttachMoneyIcon, BookmarkIcon, HomeIcon, KeyboardArrowRightIcon } from "../../../Components/Icons";
import { AdminContext } from "../../../Layouts/Admin";
import { ICategory } from "../../../Models/Category";
import { IProduct } from "../../../Models/Product";
import { ICollection, IResource } from "../../../Models/Resource";
import * as CategoryService from '../../../Services/CategoryService';
import * as ProductService from '../../../Services/ProductService';
import utils from "../../../Utils";
import Dropzone from "../../../Components/Dropzone";
import InventoryIcon from "../../../Components/Icons/IventoryIcon";

const Create: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentUser, setCurrentUser] = useContext(AdminContext);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [publishedAt, setPublishedAt] = useState<string>(moment().toISOString());
  const [isPublished, setIsPublised] = useState<boolean>(true);
  const [status, setStatus] = useState('in_stock');
  const [quantity, setQuantity] = useState<any>(0);
  const [unit, setUnit] = useState<string>('');
  const [category, setCategory] = useState<any>(null);
  const [regularPrice, setRegularPrice] = useState<any>(0);
  const [salePrice, setSalePrice] = useState<any>(0);
  const [images, setImages] = useState<any>([]);

  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getCategoryList = () => {
    CategoryService.getList({ disablePagination: true })
      .then((response: ICollection<ICategory>) => {
        setCategories(response.data);
      })
  }

  const isValid = () => {
    let isValid = true
    let errors = {}

    if (!name) {
      errors = { ...errors, name: 'Please provide name!' }
      isValid = false
    }

    if (quantity < 0) {
      errors = { ...errors, quantity: 'Invalid quantity!' }
      isValid = false
    }

    if (regularPrice < 0) {
      errors = { ...errors, regularPrice: 'Invalid price!' }
      isValid = false
    }

    setErrors(errors);

    return isValid
  }


  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValid()) {
      setIsLoading(false);
      return
    }

    const formData = new FormData();

    if (images && images.length > 0) {
      formData.append("image", images[0], images[0].name);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("published_at", utils.dateFormat(publishedAt));
    formData.append("seller_id", currentUser?.id);
    formData.append("quantity", quantity);
    formData.append("status", status);
    formData.append("unit", unit);
    formData.append("category_id", category?.id);
    formData.append("regular_price", regularPrice);
    formData.append("sale_price", salePrice);

    ProductService.create(formData, { 'Content-Type': 'multipart/form-data' })
      .then((response: IResource<IProduct>) => {
        setToast({
          open: true,
          message: 'New product has been created successfully!',
          type: 'success',
        })
        const product = response.data;
        navigate(`/products/${product.id}`);
      })
      .catch(() => {
        setToast({
          open: true,
          message: 'Failed to create product, please check your input!',
          type: 'error',
        })
      })
      .finally(() => setIsLoading(false));
  }

  const onChangePublishedAt = (value: any) => {
    setPublishedAt(moment(value).toISOString());
  }

  useEffect(() => {
    if (moment().isSameOrAfter(moment(publishedAt))) {
      setIsPublised(true);
    } else {
      setIsPublised(false);
    }
  }, [publishedAt]);

  useEffect(() => {
    setStatus(quantity > 0 ? 'in_stock' : 'out_of_stock')
  }, [quantity])

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

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
      <Link to="/" className="text-muted">
        <HomeIcon />
      </Link>
      <Link to="/" className="text-muted text-decoration-none">
        Dashboard
      </Link>
      <Link to="/products" className="text-muted text-decoration-none">
        Products
      </Link>
      <Typography fontSize="inherit">
        Create
      </Typography>
    </Breadcrumbs>

    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      my: 1,
      gap: 1
    }}>
      <Typography level="h1" fontSize="xl4">
        Create New Product
      </Typography>

      <Button size="sm" color="primary"
        type="submit"
        loading={isLoading} loadingPosition="start"
        form='create-product-form'
        onSubmit={onSubmit}
        startDecorator={<BookmarkIcon />}
      >
        Save
      </Button>
    </Box>

    <form id='create-product-form' onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={8}>
          <Card>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid xs={12}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter your name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!!errors?.name}
                  />
                  {errors?.name && <Typography color="danger" fontSize="sm">{errors?.name}</Typography>}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Editor value={description}
                    onChange={(event, editor) => setDescription(editor.getData())} />
                </FormControl>
              </Grid>

              <Grid xs={12} md={6}>
                <FormControl>
                  <FormLabel>Regular Price</FormLabel>
                  <Input
                    startDecorator={<AttachMoneyIcon size="small" />}
                    type="number"
                    name="regular_price"
                    slotProps={{
                      input: {
                        ref: inputRef,
                        min: 0,
                      },
                    }}
                    value={regularPrice}
                    onChange={e => setRegularPrice(e.target.value)}
                    error={!!errors?.regularPrice}
                  />
                  {errors?.regularPrice && <Typography color="danger" fontSize="sm">{errors?.regularPrice}</Typography>}
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>

                <FormControl>
                  <FormLabel>Sale Price</FormLabel>
                  <Input
                    startDecorator={<AttachMoneyIcon size="small" />}
                    type="number"
                    name="sale_price"
                    slotProps={{
                      input: {
                        ref: inputRef,
                        min: 0,
                      },
                    }}
                    value={salePrice}
                    onChange={e => setSalePrice(e.target.value)}
                    error={!!errors?.salePrice}
                  />
                  {errors?.salePrice && <Typography color="danger" fontSize="sm">{errors?.salePrice}</Typography>}
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    startDecorator={<InventoryIcon size="small" />}
                    type="number"
                    name="quantity"
                    slotProps={{
                      input: {
                        ref: inputRef,
                        min: 0,
                      },
                    }}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    error={!!errors?.quantity}
                  />
                  {errors?.quantity && <Typography color="danger" fontSize="sm">{errors?.quantity}</Typography>}
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid >

        <Grid xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <Grid xs={12}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Publish At</FormLabel>
                <DatePicker value={publishedAt} onChange={onChangePublishedAt} />
              </FormControl>
              <FormControl
                orientation="horizontal"
                sx={{ width: 300, justifyContent: 'start', mb: 2 }}
              >
                <FormLabel>Published</FormLabel>
                <Switch
                  checked={isPublished}
                  onChange={(event) => setIsPublised(event.target.checked)}
                  sx={{ ml: 2 }}
                />
              </FormControl>
              <FormControl
                orientation="horizontal"
                sx={{ width: 300, justifyContent: 'start', mb: 2 }}
              >
                <FormLabel>In Stock</FormLabel>
                <Switch
                  checked={status === 'in_stock'}
                  onChange={(event) => setStatus(event.target.checked ? 'in_stock' : 'out_of_stock')}
                  sx={{ ml: 2 }}
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Unit</FormLabel>
                <Input placeholder="Unit (pieces, pounds, kilograms, etc.)"
                  type="text"
                  name="unit"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  error={!!errors?.unit}
                />
                {errors?.unit && <Typography color="danger" fontSize="sm">{errors?.unit}</Typography>}
              </FormControl>

              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Category</FormLabel>
                <Autocomplete
                  placeholder="Category"
                  options={categories}
                  value={category}
                  getOptionLabel={(category) => category.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, value) => setCategory(value)}
                />
              </FormControl>
            </Grid>
          </Card>

          <Card>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Dropzone files={images} setFiles={setImages} />
            </FormControl>
          </Card>
        </Grid>
      </Grid >
    </form>
  </>
}

export default Create;
