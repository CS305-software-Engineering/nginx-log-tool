import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';

import axiosInstance from '../../axios';
import { saveNotification } from '../../service/actions/user.actions';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
      spacing:1
    },
  },
}))(MenuItem);

export default function NotificationButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const data = useSelector(state => state.notificationData)


  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  // console.log("THis is Notifications" , data);
  const handleClose = () => {
    setAnchorEl(null);
  };

  function fetchNotifications(){
    axiosInstance.get('notify/all')
      .then(function (response) {
        dispatch(saveNotification(response.data.notifications));
      })
      .catch(function (error) {
        console.log(error);
      });
  }



 function handleDeleteNotification(id){
   axiosInstance.delete(`notify/remove/${id}`).
   then(function(response){
     console.log(response);
     alert(response.data.message);
   })
   .catch(function (error) {
    console.log(error);
  });

  fetchNotifications();

 }


  return (
    <div>
      
      <IconButton   onClick={handleClick} aria-label="" color="inherit">
        <Badge badgeContent={ data.length} color="secondary">
        <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       {data != undefined ? data.map((value) =>{
         return(
           <div>
        <Alert onClose={()=>handleDeleteNotification(value._id)}  severity="warning">
          <AlertTitle>{value.agent_id}</AlertTitle>
          {value.message}
        </Alert>
        <Divider/>
        </div>
         );
       }) : <Alert >No new Notifications</Alert>}
     
      </Menu>
    </div>
  );
}
