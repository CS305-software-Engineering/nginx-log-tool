import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axiosInstance from '../../axios';
import { TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [agentDetail , setAgentDetail] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
    axiosInstance.get('user/me')
    .then(function (response) {
      console.log(response.data);
      setAgentDetail(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });


  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <br></br>
      <Button variant="outlined" color="secondary" style={{width:"100%"}} onClick={handleClickOpen}>  
        Register New Agent  
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Welcome to Agent Installation Process</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                <p>Please install the our Collector Agent on a new host system to start monitoring.</p>
              
                <p>Setup a new agent using this API key</p>
                <br></br>
                <TextField
                variant = "outlined"
                fullWidth
                disabled
                value = {agentDetail.api_key}
                >
                  
                </TextField> 
              
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
