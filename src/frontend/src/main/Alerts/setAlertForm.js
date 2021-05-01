import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton , MenuItem} from '@material-ui/core';


import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function SetAlertForm() {
  const [open, setOpen] = React.useState(false);
  const [checkedstate ,setState] = React.useState(false);
  const [metric , setMetric] = React.useState("");
  const [threshold , setThresh] = React.useState(0);

  const [comp , setComp] = React.useState("");
  const [email , setEmail] = useState("");
  const [time , setTime] = useState('');


  const ngmetrics = [
    "getMethods",
    "headMethods",
    "postMethods",
    "putMethods",
    "deleteMethods",
    "optionsMethods",
    "httpStatus1xx",
    "httpStatus2xx",
    "httpStatus3xx",
    "httpStatus4xx",
    "httpStatus5xx",
    "httpStatus403",
    "httpStatus404",
    "httpStatus500,",
    "httpStatus502",
    "httpStatus503",
    "httpStatus504",
    "httpStatusDiscarded",
    "protocolHttp_v1_0",
    "protocolHttp_v0_9",
    "protocolHttp_v1_1",
    "protocolHttp_v2",
    "connectionAccepted",
    "connectionsDropped",
    "activeConnections",
    "currentConnections",
    "idleConnections",
    "requestCount",
    "currentRequest",
    "readingRequests",
    "writingRequests"
];



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange =() =>{
    setState(!checkedstate);
  };


  const handleMetricChange=(e) =>{
    setMetric( e.target.value ) ;
  }
  const thresholdHandler=(e) =>{
      setThresh(e.target.value)
  }  
  const handleCompChange=(e) =>{
      setComp(e.target.value);
  }  
  const emailHandler=(e) =>{
      setEmail(e.target.value);
  }  
  const timeHandler=(e) =>{
    setTime(e.target.value);
}  

  const handleAddAlert = () => {


  };

  return (
    <div>
        
      <Button onClick={handleClickOpen} aria-label="display more actions" edge="end" variant="outlined" color="primary">
        ADD ALERT
     </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Set Alert Parameters</DialogTitle>
        <DialogContent >
          
          <TextField
                    id="metric"
                    select
                    label="Please select Metric"
                    fullWidth
                    variant="outlined"

                    onChange={handleMetricChange}
                    value={metric}
                    style = {{marginTop:10}}
                  >
                  {ngmetrics==undefined?<em>none</em>:
                    ngmetrics.map((value) => (
                      <MenuItem value={value} >
                      <em>{value}</em>
                      </MenuItem>
                    ))
                  }
         </TextField>

                  
        
        <TextField
                    id="set"
                    select
                    label="Greater/Less/Equal"
                    fullWidth
                    variant="outlined"
                    style = {{marginTop:10}}

                    onChange={handleCompChange}
                    value={comp}
                  >
                
                      <MenuItem value="greater" > Greater Than </MenuItem>
                      <MenuItem value="less" > Less Than </MenuItem>
                      <MenuItem value="equal" > Equal To </MenuItem>

                 
                  
         </TextField>
         <TextField
            autoFocus
            margin="dense"
            id= "threshold"
            label="Threshold"
            type="text"
            fullWidth
            variant="outlined"
            value = {threshold}
            onChange={thresholdHandler}
            style = {{marginTop:10}}

          />

         <TextField
                    id="set"
                    select
                    label="Set Time"
                    fullWidth
                    variant="outlined"

                    onChange={timeHandler}
                    value={time}
                    style = {{marginTop:10}}

                  >
                
                      <MenuItem value="5m" > 5m </MenuItem>
                      <MenuItem value="30m" > 30m </MenuItem>
                      <MenuItem value="1h" > 1h</MenuItem>

                      <MenuItem value="4h" > 4h</MenuItem>

                  
         </TextField>
                
        <TextField
            autoFocus
            margin="dense"
            id= "email"
            label="Email for sending alerts"
            type="text"
            fullWidth
            variant="outlined"
            value = {email}
            onChange={emailHandler}
            style = {{marginTop:10}}

          />



        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAlert} color="primary">
            Set Alert
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}