import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

export type Props = {
  state: {
    open: boolean
    vertical: 'top' | 'bottom'
    horizontal: 'center' | 'right' | 'left'
    severity: 'error' | 'warning' | 'info' | 'success'
  }
  message: string
  handleClose: () => void
}

export default function PositionedSnackbar(props: Props) {
  const {
    handleClose,

    state: { horizontal, vertical, open, severity },
    message,
  } = props

  setTimeout(() => {
    handleClose()
  }, 3000)

  return (
    <div>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
