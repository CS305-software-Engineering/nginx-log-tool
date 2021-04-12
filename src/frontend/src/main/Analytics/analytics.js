import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import NavBar from '../NavBar';
import {Divider , Button, Container ,Grid, Paper } from '@material-ui/core';

import LineChart from '../Components/Charts/Line';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 900,
  },

}));

export default function Analytics() {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
   
      <div className={classes.root}>
      <Grid container spacing={1}>
      
        <Grid item xs={3} spacing={1}>
          <div>
            <Button fullWidth color="secondary" variant = "outlined">
              Add New Instance
            </Button>
          </div>
     

        </Grid>
        <Grid item  spacing={1}>
          <Divider orientation="vertical" ></Divider>
        </Grid>

        <Grid item xs={8} spacing={1}>

            <Container>
            <Grid container spacing={1}  >
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                  <LineChart title ="No of Requests"/>
                </Paper>
              </Grid>
              <Grid item lg = {4} md={6} xs={12}>
                <Paper className={classes.paper}>
                  <LineChart title="HTTP 5xx errors"/>
                </Paper>
              </Grid>
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                <LineChart title="HTTP 4xx errors"/>

                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                <LineChart title="CPU usage"/>

                </Paper>
              </Grid>
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                <LineChart title="Traffic"/>

                </Paper>
              </Grid>
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                <LineChart title="Request time"/>

                </Paper>
              </Grid>
            </Grid>
            </Container>
        </Grid>
      
      </Grid>
    </div>
    </div>
  );
}
