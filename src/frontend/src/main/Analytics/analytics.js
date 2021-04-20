import React from 'react';
import PropTypes from 'prop-types';
import {fade,  makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import axiosInstance from '../../axios';
import {useEffect} from 'react';
import NavBar from '../NavBar';
import {Divider , Button, Container ,Grid, Paper, IconButton } from '@material-ui/core';

import LineChart from '../Components/Charts/Line';
import SyncIcon from '@material-ui/icons/Sync';

import {useDispatch ,useSelector} from 'react-redux';

import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { addInstance ,saveTimeSeriesData } from '../../service/actions/user.actions';

import AddInstanceDialog from './createInstanceDialog';

// sample agent id 5505d27ea1c7f1509736b60f3d081923b12eedfc

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 900,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));





export default function Analytics() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const instanceArray = useSelector(state => state.instanceData)
  const timeseriesData = useSelector(state => state.timeseriesData)



function handleVisualise(agentId){

//  console.log(agentId)


  const data = {
    "metrics": [
        {
            "from": 1618071100000,
            "to": 1618071300000,
            "metric": "cpuCount",
            "granularity": "1m",
            "agentId": agentId
        },
         {
            "from": 1618071100000,
            "to": 1618071300000,
            "metric": "currentConnections",
            "granularity": "1m",
            "agentId": agentId
        }
    ]
};

    axiosInstance.post(`timeseries/seq` , data )
    .then(function (response) {
      // console.log(response.data);
      dispatch( saveTimeSeriesData(  response) );
    })
    .catch(function (error) {
      console.log(error);
    });


}


function getInstanceObjects(){


  axiosInstance.get(`system/objects`)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    dispatch(addInstance(response));
  })
  .catch(function (error) {
    console.log(error);
  });

  // setInterval(100000);
}

  useEffect( () => {
    getInstanceObjects();
  }, [])


  const MINUTE_MS = 60000;

useEffect(() => {

  const interval = setInterval(() => {
    console.log('Logs every minute');
  }, MINUTE_MS );

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])
    
  // useEffect( () => {

  //   axiosInstance.post(`timeseries/seq` , data )
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));

      


  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  // }, [])
 
// console.log(instanceArray.instanceData);
console.log(timeseriesData)

function getX(l){

  var list_ = []
  l.map((value) => {

    list_.push(value._id);
  }
  );
 return list_;

}

function getY(l){

  var list_ = []
  l.map((value) => {

    list_.push(value.value);
  }
  );
  return list_;

}

  return (
    <div>
      <NavBar />
   
      <div className={classes.root}>
      <Grid container >
      
        <Grid item xs={3} >
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
     
            <Grid>
              <Grid item>
              <AddInstanceDialog  />
               <IconButton onClick = {getInstanceObjects}>
                <SyncIcon />

                </IconButton>
              </Grid>
             

            </Grid>

   
            <List >
              
              { instanceArray.instanceData != undefined ? instanceArray.instanceData.map((value) => {
                return (
                <ListItem button id={value.agentId} onClick={() => handleVisualise(value.agentId)} >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${value.description.host} ${value.description.uid} `}
                  />
                  <ListItemSecondaryAction>
               
                    {/* <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton> */}
                  </ListItemSecondaryAction>
                </ListItem>
      );
    })
  : null}
            </List>
     

        </Grid>
        <Grid item  >
          <Divider orientation="vertical" ></Divider>
        </Grid>

        <Grid item xs={8} >

            <Container >
            <Grid container spacing = {1}>




              { timeseriesData.data != undefined ? timeseriesData.data.result.map((value) => {
                return (
              <Grid item lg = {6} md={6}  xs={12}>

                <Paper elevation={2}>
                  <LineChart  data = {value} x = {getX(value.timeseries)} y = {getY(value.timeseries)}/>
                 </Paper>
              </Grid> 
              );
            })
          : "Click on Any Instance to Visualise"}
              {/* <Grid item lg = {4} md={6} xs={12}>
                <Paper className={classes.paper}>
                  <LineChart title="HTTP 5xx errors"/>
                </Paper>
              </Grid>
              <Grid item lg = {4} md={6}  xs={12}>
                <Paper className={classes.paper}>
                <LineChart title="HTTP 4xx errors"/>

                </Paper>
              </Grid>
       
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
                
              </Grid> */}
            </Grid>
            </Container>
        </Grid>
      
      </Grid>
    </div>
    </div>
  );
}
