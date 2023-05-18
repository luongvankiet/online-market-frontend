import { Card } from "@mui/joy";
import { Outlet } from "react-router-dom";
import Box from '@mui/joy/Box';

const Auth: React.FunctionComponent = () => {
  return <>
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        width: '100%',
        backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/assets/images/backgrounds/bg-pattern-inverse.png)`,
        backgroundPosition: 'cover'
      }}
    >
      <Box
        component="main"
        sx={{
          my: 'auto',
          py: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 400,
          maxWidth: '100%',
          mx: 'auto',
          borderRadius: 'sm',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }
        }}
      >
        <Card variant="outlined" sx={{ width: 320, p: 5 }}>
          <Outlet />
        </Card>
      </Box>
    </Box>
  </>
}

export default Auth
