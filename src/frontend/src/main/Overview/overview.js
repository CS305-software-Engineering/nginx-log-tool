import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LineChart from '../Components/Charts/Line';
import NavBar from '../NavBar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DynamicColumnChart from '../views/dynamic charts/Dynamic Column Chart';
import DynamicLineChart from '../views/dynamic charts/Dynamic Line Chart';
import DynamicMultiSeriesChart from '../views/dynamic charts/Dynamic Multi Series Chart';

import StepLineChart from '../views/line charts/Step Line Chart';
import LineChartCanvas from '../views/line charts/Line Chart';
import FunnelChartWithCustomization from '../views/pie & funnel charts/Funnel Chart with Custom Neck';
import DoughnutChart from '../views/pie & funnel charts/Doughnut Chart';
import { useEffect } from 'react';
import axiosInstance from '../../axios';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Overview() {

  const classes = useStyles();
  const user = useSelector(state => state.userData)
  
  // useEffect( () => {

  //   axiosInstance.get(`system/objects`)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  // }, [])
 
 
  return (
    <div>
    <NavBar />
 
    <Container>
      <h1 className='title' style={{textAlign:"center"}}>Overview Page</h1>

      <Grid container spacing={1}  >
        <Grid item lg = {4} md={6}  xs={12}>
          <Paper className={classes.paper}>
            {/* <LineChart title ="No of Requests"/> */}
            <LineChartCanvas />
          </Paper>
        </Grid>
        <Grid item lg = {4} md={6} xs={12}>
          <Paper className={classes.paper}>
            {/* <LineChart title="HTTP 5xx errors"/> */}
            <StepLineChart />
            
          </Paper>
        </Grid>
        <Grid item lg = {4} md={6}  xs={12}>
          <Paper className={classes.paper}>
          {/* <LineChart title="HTTP 4xx errors"/> */}
         <DynamicLineChart />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg = {4} md={6}  xs={12}>
          <Paper className={classes.paper}>
          {/* <LineChart title="CPU usage"/> */}
          <DynamicColumnChart />


          </Paper>
        </Grid>
        <Grid item lg = {4} md={6}  xs={12}>
          <Paper className={classes.paper}>
          {/* <LineChart title="Traffic"/> */}
          <DynamicMultiSeriesChart />

          </Paper>
        </Grid>
        <Grid item lg = {4} md={6}  xs={12}>
          <Paper className={classes.paper}>
          {/* <LineChart title="Request time"/> */}
          <DoughnutChart />
          </Paper>
        </Grid>
      </Grid>
    
      </Container>
    </div>
  );
}

export default Overview;
