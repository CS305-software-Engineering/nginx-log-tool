import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LineChart from '../Components/Charts/Line';
import NavBar from '../NavBar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


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
  console.log(user)
 
  return (
    <div>
    <NavBar />
 
    <Container>
      <h1 className='title' style={{textAlign:"center"}}>Overview Page</h1>

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
    </div>
  );
}

export default Overview;
