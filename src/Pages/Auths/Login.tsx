import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Typography } from "@mui/joy"
import { GoogleIcon } from "../../Components/Icons"
import { useState } from "react";
import utils from "../../Utils";
import * as AuthService from '../../Services/AuthService';
import Toast from "../../Components/Toast";

const Login: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<any>({});

  const isValid = () => {
    let isValid = true
    let errors = {}

    if (!email) {
      errors = { ...errors, email: 'Please provide email address!' }
      isValid = false
    }

    if (email && !utils.string.isValidEmail(email)) {
      errors = { ...errors, email: 'Please provide a valid email address!' }
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
      // Notify('Login failed!', 'danger')
      return
    }

    const credentials = {
      email: email,
      password: password,
      remember_me: rememberMe,
    }

    AuthService.login(credentials)
      .then(response => {
        setToast({ open: true, message: 'Login successfully!', type: 'success' })
        setTimeout(() => {
          window.location.href = '/'
        }, 300);
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
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email"
          type="email"
          name="email"
          error={!!errors?.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors?.email && <Typography color="danger" fontSize="sm">{errors.email}</Typography>}

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

    <Toast open={toast?.open} onClose={() => setToast({ open: false })} type={toast?.type} message={toast?.message} />
  </>
}

export default Login
