import { Box } from "@mui/joy"

interface HeaderProps {
  sx?: any;
  children?: any;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          px: 2,
          py: 1,
          gap: 2,
          bgcolor: 'background.surface',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gridColumn: '1 / -1',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 2,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {props.children}
    </Box>
  );
}

export default Header
