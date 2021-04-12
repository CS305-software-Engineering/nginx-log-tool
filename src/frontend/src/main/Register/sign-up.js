import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import {  Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [email , setEmail] = useState("");
  const [password , setPassword]= useState("");
  const [c_password , setCPassword]  = useState("");
  const [showPassword, setShow] = useState(false);
  const [showPassword1, setShow1] = useState(false);

  const handleCPassword = (event) =>{
    setCPassword(event.target.value);
  }
  const handleMail=(event)  =>{
    setEmail(event.target.value);
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handleClickShowPassword =() =>{
    setShow(!showPassword);
  }

  const handleClickShowPassword1 =() =>{
    setShow1(!showPassword1);
  }
  const handleMouseDownPassword =(event) =>{
    event.preventDefault();

  }
  
  function handleRegister(){
    if(password == c_password){
    const data = {
      'email':email,
      'password':password
    };
    console.log(data)
    
    // axios.post('http://nginx-log-tool-api.herokuapp.com/auth/signup', {data})
    axios.post(`https://nginx-log-tool.herokuapp.com/wapi/auth/signup`, data, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      alert(res.data.message)

    })
    .catch( error => {
      console.log(error)
      console.log(error.message)
      alert(error.message)

    }
  );
  }
  else{
    alert("Passwords do not match")
  }
  
  }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}> */}
              {/* <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}> */}
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
              onChange = {handleMail}
                variant="outlined"
                required
                fullWidth
                id="email"
                type= "email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                 style = {{float:"left"}}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange = {handlePassword}
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

               
                
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange = {handleCPassword}
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Confirm Password"
                type={showPassword1 ? 'text' : 'password'}
                id="password-confirm"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                          style = {{float:"right"}}
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
           
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}