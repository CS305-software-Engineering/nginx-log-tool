import React from 'react';
import {Grid , Paper , CircularProgress} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import LineChart from '../Components/Charts/Line';


const useStyles = makeStyles((theme) => ({

    progress: {
       marginLeft:600,
       marginTop:300,
    }

}));

export default function TabComponent(props)
{
    const classes = useStyles();


  function getX(l) {

    var list_ = []
    for(var i =0 ;i< l.length ; i++)
    {

     var date = new Date(l[i]._id);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      list_.push(`${hours}:${minutes}`);
    }
    
    return list_;

  }

  function getY(l) {

    var list_ = []
    for(var i =0 ;i< l.length ; i++)
    {

      list_.push(l[i].value);
    }
  
    return list_;

  }

  return (
    <div>
    <Grid container spacing={1}>
      {
        Object.entries(props.timeseriesData).length > 0 ?
        Object.entries(props.timeseriesData).map(function([key , value]) {
          // console.log(key, value);
          if(props.metrictype.length>0 && props.metrictype.includes(key)){

          return (
            <Grid item lg={6} md={6} xs={12}>

              <Paper elevation={2}>
  
                <LineChart data={key} x={getX(value)} y={getY(value)} />
              </Paper>
            </Grid>
          );
         }})
         :
         <CircularProgress  className={ classes.progress}/>


      }
      </Grid>
      </div>
  );


}