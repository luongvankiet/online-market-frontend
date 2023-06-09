import { Box, Breadcrumbs, Button, Card, FormControl, FormLabel, Grid, Input, Switch, Typography } from "@mui/joy";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import DatePicker from "../../../Components/Form/DatePicker";
import Editor from "../../../Components/Form/Editor";
import { BookmarkIcon, HomeIcon, KeyboardArrowRightIcon } from "../../../Components/Icons";
import { AdminContext } from "../../../Layouts/Admin";
import { ICategory } from "../../../Models/Category";
import * as CategoryService from '../../../Services/CategoryService';
import utils from "../../../Utils";
import { IResource } from "../../../Models/Resource";

const Create: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useContext(AdminContext);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string>(moment().toISOString());
  const [isPublished, setIsPublised] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>();
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();

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

    CategoryService.create(body)
      .then((response: IResource<ICategory>) => {
        setToast({
          open: true,
          message: 'New category has been created successfully!',
          type: 'success',
        })

        const category = response.data;
        navigate(`/categories/${category.id}`);
      })
      .catch(() => {
        setToast({
          open: true,
          message: 'Failed to create category, please check your input!',
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
        Create New Category
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

export default Create
