import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"
import React from "react"

interface ToastPros {
  open?: boolean;
  onClose?: (e: any) => void;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const Toast: React.FunctionComponent<ToastPros> = (props) => {
  return <>
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={props.onClose}
    >
      <Alert severity={props.type} onClose={props.onClose} sx={{ width: '100%' }}>{props.message}</Alert>
    </Snackbar>
  </>
}

export default Toast
