import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';



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

  const data = useSelector(state => state.notificationData)


  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("THis is Notifications" , data);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <IconButton   onClick={handleClick} aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={6} color="secondary">
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
      <Alert severity="error" onClose={() => {}}>This is a error alert — check it out!</Alert>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert severity="warning" onClose={() => {}}>This is a WARNING alert — check it out!</Alert>
      <Alert severity="warning" onClose={() => {}}>This is a WARNING alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            VIEW
          </Button>
        }
      >
        This is a success alert — check it out!
      </Alert>
      <Alert variant = "outlined" severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      <Alert variant = "outlined" severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
      </Alert>
      <Alert variant = "outlined" severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert>
      <Alert variant = "outlined" severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
      </Menu>
    </div>
  );
}
