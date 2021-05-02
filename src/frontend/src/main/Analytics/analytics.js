import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import axiosInstance from '../../axios';
import { useEffect } from 'react';
import NavBar from '../NavBar';
import { Divider, Button, Container, Grid, Paper, IconButton } from '@material-ui/core';

import LineChart from '../Components/Charts/Line';
import SyncIcon from '@material-ui/icons/Sync';

import { useDispatch, useSelector } from 'react-redux';

import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { addInstance, resetTimeSeries, saveAgent, saveTimeSeriesData, saveTimeStamp , updateTimeSeriesData } from '../../service/actions/user.actions';

import AddInstanceDialog from './createInstanceDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

// sample agent id 5505d27ea1c7f1509736b60f3d081923b12eedfc


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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
  var MINUTE_MS = 60000;
  var check = false;
  // const [MINUTE_MS ,setMinute] = useState(60000);
  const [granularity , setGran] = useState("1m");
  const classes = useStyles();
  const dispatch = useDispatch();
  const instanceArray = useSelector(state => state.instanceData)
  const timeseriesData = useSelector(state => state.timeseriesData)
  const timestamp = useSelector(state => state.timestamp);

  const currAgent = useSelector(state => state.myagent);


  // console.log("tHIS IS AGENT DETAILS", instanceArray);
  // console.log("timestamp", timestamp);
  const [value, setValue] = React.useState(0);
  const [graphInit, setGraphInit] = React.useState(false);
  const [graphData, setGraphData] = React.useState([]);
  const [currTime,setCurrTime]=React.useState(Date.now());
  const [startDate , setStartDate] = useState('');
  const [endDate , setEndDate] = useState('');

  var latestAgent="";


  const startDateHandler=(e) =>{
    setStartDate(e.target.value) ;
  }
  const endDateHandler=(e) =>{
    setEndDate(e.target.value) ;
  }



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleGran(a , b){
    setGran(a);
    MINUTE_MS = b;
    setGraphInit(false);
    setCurrTime(Date.now());
    check = false;
    dispatch(resetTimeSeries());
    // handleVisualise("5505d27ea1c7f1509736b60f3d081923b12eedfc")

  }

 function handleAgentClicked(agentId){

    dispatch(saveAgent(agentId));
  }

  function handleVisualise(agentId) {


     console.log(currAgent)
    const times = graphInit==false?3600000:MINUTE_MS;
    // const a = graphInit == false?10000:0;
    // console.log("ljhldsjahfhadh", currTime);
    const ngmetrics = [
      "getMethods",
      "headMethods",
      "postMethods",
      "putMethods",
      "deleteMethods",
      "optionsMethods",
      "httpStatus1xx",
      "httpStatus2xx",
      "httpStatus3xx",
      "httpStatus4xx",
      "httpStatus5xx",
      "httpStatus403",
      "httpStatus404",
      "httpStatus500,",
      "httpStatus502",
      "httpStatus503",
      "httpStatus504",
      "httpStatusDiscarded",
      "protocolHttp_v1_0",
      "protocolHttp_v0_9",
      "protocolHttp_v1_1",
      "protocolHttp_v2",
      "connectionAccepted",
      "connectionsDropped",
      "activeConnections",
      "currentConnections",
      "idleConnections",
      "requestCount",
      "currentRequest",
      "readingRequests",
      "writingRequests"
  ];
    // var data = {
    //   "metrics": []
    // };
    const x = []
    for (var i=0; i < ngmetrics.length; i++) {
      x.push(
        {
          "from": currTime - times,
          "to": currTime,
          "metric": ngmetrics[i],
          "granularity": granularity,
          "agentId": agentId,
          "aggr_fn": "sum"
        }
      );
    }
    // console.log('x value',x);
    const data  ={
      "metrics":x
    }
    console.log(data)
    axiosInstance.post(`timeseries/seq`, data)
        .then(function (response) {
          // console.log("ojhjodahvhfsabxxxxxxxxxx",response.data);
          // if(graphInit == true){
          //   dispatch(updateTimeSeriesData(response));

          // }else{
            dispatch(saveTimeSeriesData(response));
          // }
          setGraphData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        setGraphInit(true);
        check = true;

        setCurrTime(currTime + MINUTE_MS);
    console.log('graph is set',graphInit);
  }

  function xAxisChanger(data, newData) {
    data.shift();
    data.push(newData);
    return data;
  }


  function getInstanceObjects() {


    axiosInstance.get(`system/objects`)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        dispatch(addInstance(response));
        // setCurrentAgent(response.)

      })
      .catch(function (error) {
        console.log(error);
      });

    // setInterval(100000);
  }

  useEffect(() => {
    getInstanceObjects();
  }, [])

  // useEffect(() => {
    
  //   handleVisualise("5505d27ea1c7f1509736b60f3d081923b12eedfc");
  // }, [granularity])

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     handleVisualise("5505d27ea1c7f1509736b60f3d081923b12eedfc");
  //   }, 60000);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [currTime])


  // console.log("timeseries data", timeseriesData);

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
      <NavBar />

      <div className={classes.root}>
        <Grid container >

          <Grid item xs={2} >
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
                <AddInstanceDialog />
                <IconButton onClick={getInstanceObjects}>
                  <SyncIcon />

                </IconButton>
              </Grid>


            </Grid>


            <List >

              {instanceArray.instanceData != undefined ? instanceArray.instanceData.map((value) => {
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

          <Grid item xs={9} >

            <Container >
              <br></br>
              <AppBar style={{ backgroundColor: "whitesmoke", color: "black" }} position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Nginx Metrics" {...a11yProps(1)} />
                  <Tab label="System Metrics" {...a11yProps(0)} />

                </Tabs>
              </AppBar>
              <TabPanel value={value} index={1}>
                <h1 className='title' style={{ textAlign: "center" }}>System Metrics</h1>

              </TabPanel>
              <TabPanel value={value} index={0}>
                <h1 className='title' style={{ textAlign: "center" }}>NGINX Metrics</h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>

                  {/* <div>

                  <TextField
                    autoFocus
                    margin="dense"
                  
                    id="startDate"
                    label="Start Date"
                    type="date"
                    fullWidth
                    variant="outlined"      
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange ={startDateHandler}
                  />

            <TextField
                    autoFocus
                    margin="dense"
                  
                    id="endDate"
                    label="End Date"
                    type="date"
                    fullWidth
                    variant="outlined"      
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange ={endDateHandler}

                  />
                  </div> */}
                <Grid container spacing={1}>

            
 

                  {
                    
                    Object.entries(timeseriesData).map(function([key , value]) {
                      console.log(key, value);
                      return (
                        <Grid item lg={6} md={6} xs={12}>
  
                          <Paper elevation={2}>
              
                            <LineChart data={key} x={getX(value)} y={getY(value)} />
                          </Paper>
                        </Grid>
                      );
                     })
                  }

                  

                </Grid>
              </TabPanel>

            </Container>


          </Grid>

        </Grid>
      </div>
    </div>
  );
}
