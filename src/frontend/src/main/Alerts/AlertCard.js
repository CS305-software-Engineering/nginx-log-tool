import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SetAlertForm from './setAlertForm';
import { Button, CardActions } from '@material-ui/core';
import axiosInstance from '../../axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
},
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function AlertCard(props) {
  const classes = useStyles();
  const theme = useTheme();



  function handleDelete() {
    axiosInstance.delete(`alerts/remove/${props.value._id}`).then(function(response){
        console.log(response.data)
        alert(response.data.message);
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.value.metric_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
              Operator: {props.value.operator} , Threshold : {props.value.threshold} , Period: {props.value.period} , Email Id : {props.value.contact} ,AgentId {props.value.agentId}
          </Typography>

        </CardContent>
        <CardActions>
            <SetAlertForm _id={props.value._id} f= {1} metric={props.value.metric_name} contact={props.value.contact} operator={props.value.operator} period={props.value.period} th={props.value.threshold} agentId = {props.value.agentId}/>

            <Button onClick= {handleDelete} variant="outlined"  style={{color:"red"}}>Delete</Button>
            
        </CardActions>
       
      </div>

    </Card>
  );
}