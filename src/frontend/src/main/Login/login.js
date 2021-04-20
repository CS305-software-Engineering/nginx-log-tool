import React, { useDebugValue, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {  Link} from 'react-router-dom';

import {useDispatch , useSelector} from 'react-redux';
import { saveUser } from '../../service/actions/user.actions';

import ForgotPassword from './updatePassword';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Backdrop } from '@material-ui/core';
import axiosInstance from '../../axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const [email , setEmail]  = useState("");
  const [password , setPassword]  = useState("");
  const [showPassword , setShow] = useState(false);
  // const [open , setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.userData)

  const handleMail=(event)  =>{
    setEmail(event.target.value);
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handleClickShowPassword =() =>{
    setShow(!showPassword);
  }
  const handleMouseDownPassword =(event) =>{
    event.preventDefault();

  }

  const handleLogin =()=>{
    const data = {
      'email':email,
      'password':password
    };

    axiosInstance.post(`auth/signin`, data, {
      withCredentials: true,
    })
    .then(res => {
      // console.log(res)

      if (res.data.error)
      alert(res.data.message)
      else{
      dispatch(saveUser(res));
      // res.cookie('token', res.data.token, { httpOnly: true });
      // window.location.href = '/'
      }
    })
    .catch( error => {
      console.log(error)
      console.log(error.message)
      alert(error.message)

    }
  );

  }

  console.log("hello",user)
  
  

  return (
    
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {handleMail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                      style = {{float:"right"}}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
             {/* <ForgotPassword /> */}
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
        
}