import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux'
import { hideSnackbar } from '../../redux/slices/snackbarSlice';

export default function SimpleSnackbar() {

  const snackBarState = useSelector((state) => state.messageAlert)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(hideSnackbar())
  }

  return (
    <div>
      <Snackbar
        open={snackBarState.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={snackBarState?.severity}>
         {snackBarState?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
