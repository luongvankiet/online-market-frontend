import { Box, Button, Modal, ModalDialog, Typography } from "@mui/joy";

interface ConfirmModalProps {
  id?: string;
  open: boolean;
  setOpen(isOpen: boolean): void;
  onSubmit?(): void;
  title?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = (props) => {
  const { open, setOpen, onSubmit, text } = props;
  return <>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <Typography id="nested-modal-title" component="h2">
          Are you absolutely sure?
        </Typography>
        <Typography id="nested-modal-description" textColor="text.tertiary">
          {text || 'This action cannot be undone. Your data could be deleted permanently from our servers.'}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row-reverse' },
          }}
        >
          <Button variant="solid" color="neutral" onClick={onSubmit}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  </>
}

export default ConfirmModal
