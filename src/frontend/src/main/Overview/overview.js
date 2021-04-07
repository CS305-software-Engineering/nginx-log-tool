import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LineChart from '../Components/Charts/Line';
import MultiLine from '../Components/Charts/MultiAxisLine';

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


  return (
    <Container>
      <h1 className='title'>Overview Page</h1>

      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <MultiLine />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LineChart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </Container>

  );
}

export default Overview;
