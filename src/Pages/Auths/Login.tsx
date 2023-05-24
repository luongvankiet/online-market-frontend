import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Typography } from "@mui/joy"
import { GoogleIcon } from "../../Components/Icons"
import { useContext, useState } from "react";
import utils from "../../Utils";
import * as AuthService from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import moment from "moment";

const Login: React.FunctionComponent = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();

  const isValid = () => {
    let isValid = true
    let errors = {}

    if (!username) {
      errors = { ...errors, username: 'Please provide username!' }
      isValid = false
    }

    if (!password) {
      errors = { ...errors, password: 'Please provide a password!' }
      isValid = false
    }

    setErrors(errors);

    return isValid
  }


  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true)

    if (!isValid()) {
      setIsLoading(false)
      return
    }

    const credentials = {
      username: username,
      password: password,
      remember_me: rememberMe,
    }

    AuthService.login(credentials)
      .then((response: any) => {
        if (response.status === 'Error') {
          setToast({ open: true, message: response.message, type: 'error' })
          return;
        }

        let user: any = response.data;
        user = { ...user, expired_at: moment().add(2, 'hours').toISOString() }
        localStorage.setItem('user', JSON.stringify(user));

        setToast({ open: true, message: 'Login successfully!', type: 'success' })
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch(() => {
        setToast({ open: true, message: 'Login failed, please try again!', type: 'error' })
      })
      .finally(() => setIsLoading(false))
  }

  return <>
    <div>
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        Welcome back
      </Typography>
      <Typography level="body2" sx={{ my: 1, mb: 3 }}>
        Let&apos;s get started! Please enter your details.
      </Typography>
    </div>
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Enter your username"
          type="text"
          name="username"
          error={!!errors?.username}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors?.username && <Typography color="danger" fontSize="sm">{errors.username}</Typography>}

      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input placeholder="•••••••"
          type="password"
          name="password"
          error={!!errors?.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors?.password && <Typography color="danger" fontSize="sm">{errors.password}</Typography>}
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Checkbox size="sm" label="Remember for 30 days" name="persistent"
          checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
          Forgot password
        </Link>
      </Box>
      <Button type="submit" fullWidth
        loading={isLoading}
        loadingPosition="start">
        Sign in
      </Button>
    </form>
    <Button
      className="py-3"
      variant="outlined"
      color="neutral"
      fullWidth
      startDecorator={<GoogleIcon />}
      sx={{ my: 3 }}
    >
      Sign in with Google
    </Button>
  </>
}

export default Login
