import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Link} from 'react-router-dom';
import axiosInstance from '../../axios';

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [password , setPassword] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassword =(e) =>{
    setPassword(e.target.value)
  }

  const handleUpdate =() =>{
    handleClose();

      const data={
        'password':password
      }
    axiosInstance.post(`user/updateme` , data )
    .then(res => {
        alert("Password Changed Update");
      })
      .catch( error => {
        console.log(error)
        console.log(error.message)
        alert(error.message)
  
      }
    );
    
  }

  return (
    <div>
      <Button  onClick={handleClickOpen} color="inherit" >
        Update Password
      </Button>
      {/* <Link onClick={handleClickOpen} variant="body2">
                change password?
      </Link> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter New Password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="text"
            fullWidth
            value = {password}
            onChange = {handlePassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
