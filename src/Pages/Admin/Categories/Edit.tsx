import { Box, Breadcrumbs, Button, Card, FormControl, FormLabel, Grid, Input, Switch, Typography } from "@mui/joy";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import DatePicker from "../../../Components/Form/DatePicker";
import Editor from "../../../Components/Form/Editor";
import { BookmarkIcon, HomeIcon, KeyboardArrowRightIcon } from "../../../Components/Icons";
import { AdminContext } from "../../../Layouts/Admin";
import { ICategory } from "../../../Models/Category";
import * as CategoryService from '../../../Services/CategoryService';
import utils from "../../../Utils";
import { IResource } from "../../../Models/Resource";

const Edit: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useContext(AdminContext);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [publishedAt, setPublishedAt] = useState<string | undefined>(moment().toISOString());
  const [isPublished, setIsPublised] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: any }>();
  const { setToast } = useContext(AppContext);

  const getCategoryById = () => {
    CategoryService.getById(id)
      .then((response: IResource<ICategory>) => {
        const category = response.data;
        setName(category.name);
        setDescription(category.description || '');
        setPublishedAt(category.published_at);
      })
  }

  const isValid = () => {
    let isValid = true
    let errors = {}

    if (!name) {
      errors = { ...errors, name: 'Please provide name!' }
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

    const body = {
      name: name,
      description: description,
      published_at: utils.dateFormat(publishedAt),
      seller_id: currentUser?.id,
    }

    CategoryService.update(id, body)
      .then((response: IResource<ICategory>) => {
        setToast({
          open: true,
          message: 'Category has been updated successfully!',
          type: 'success',
        })
        getCategoryById();
      })
      .catch(() => {
        setToast({
          open: true,
          message: 'Failed to update category, please check your input!',
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
    getCategoryById();
  }, [id]);

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
      <Link to="/categories" className="text-muted text-decoration-none">
        Categories
      </Link>
      <Typography fontSize="inherit">
        Edit
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
        Edit Category
      </Typography>

      <Button size="sm" color="primary"
        loading={isLoading} loadingPosition="start"
        onClick={onSubmit}
        startDecorator={<BookmarkIcon />}
      >
        Save
      </Button>
    </Box>

    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} md={8}>
        <Card>
          <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
            Basic Info
          </Typography>
          <Grid xs={12}>
            <FormControl sx={{ mb: 2 }}>
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
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Description</FormLabel>
              <Editor value={description}
                onChange={(event, editor) => setDescription(editor.getData())} />
            </FormControl>
          </Grid>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card>
          <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
            Settings
          </Typography>
          <Grid xs={8}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Publish At</FormLabel>
              <DatePicker value={publishedAt} onChange={onChangePublishedAt} />
            </FormControl>
            <FormControl
              orientation="horizontal"
              sx={{ width: 300, justifyContent: 'start' }}
            >
              <FormLabel>Published</FormLabel>
              <Switch
                checked={isPublished}
                onChange={(event) => setIsPublised(event.target.checked)}
                sx={{ ml: 2 }}
              />
            </FormControl>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  </>
}

export default Edit
