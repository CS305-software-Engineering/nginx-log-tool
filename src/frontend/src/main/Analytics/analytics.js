import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import axiosInstance from '../../axios';
import { useEffect } from 'react';
import NavBar from '../NavBar';
import { Divider, Button, Container, Grid, Paper, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
import { addInstance, resetTimeSeries, saveAgent, saveGraphInit, saveNginxMetrics, saveOsMetrics, saveTimeSeriesData, saveTimeStamp , updateTimeSeriesData } from '../../service/actions/user.actions';

import AddInstanceDialog from './createInstanceDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent';
import {ngmetrics,httpStatus,httpProtocols,httpMethods,httpConnections,workers,CPUInfo,AgentInfo,VirtualMemory ,SwapMemory } from '../../service/constants';

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

  progress: {
     marginLeft:600,
     marginTop:300,
  }
    ,

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
  const currTime = useSelector(state => state.timestamp);
  const currAgent = useSelector(state => state.myagent);
  // const [currAgent,setCurrentAgent] = useState(null);
  const [graphData, setGraphData] = React.useState([]);
  const nginx = useSelector(state=>state.nginxMetric);
  const os = useSelector(state=>state.osMetric);

  const [value , setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 console.log(os);
 console.log(nginx);

  const graphInit = useSelector(state=> state.graphInit);
  // const [currTime,setCurrTime]=React.useState(Date.now());

  function handleGran(a , b){
    setGran(a);
    MINUTE_MS = b;
    // setGraphInit(false);
    dispatch(saveGraphInit(false));
    // setCurrTime(Date.now());
    dispatch(saveTimeStamp(Date.now()))
    check = false;
    dispatch(resetTimeSeries());

  }

 function handleAgentClicked(agentId){

    dispatch(saveAgent(agentId));
    dispatch(saveGraphInit(false));
    dispatch(resetTimeSeries());
  }

  function handleVisualise(currAgent) {
    
    if(currAgent != null){

    console.log(currAgent)
    const times = graphInit==false?3600000:MINUTE_MS;
  
    const x = []
    for (var i=0; i < ngmetrics.length; i++) {
      x.push(
        {
          "from": currTime - times,
          "to": currTime,
          "metric": ngmetrics[i],
          "granularity": granularity,
          "agentId": currAgent,
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
        // setGraphInit(true);
        dispatch(saveGraphInit(true));

        check = true;

        // setCurrTime(currTime + MINUTE_MS);
        dispatch(saveTimeStamp(currTime + MINUTE_MS));
    console.log('graph is set',graphInit);

      }

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

  function fetchMetrics() {
    if(currAgent != null){
      // alert(currAgent);
    axiosInstance.get(`metrics/${currAgent}?static=0&dyn=1`).then(function(response){
      console.log("kijkphfgiahira",response.data)
      dispatch(saveOsMetrics(response.data.metrics.os));
      dispatch(saveNginxMetrics(response.data.metrics.nginx));

    }).catch(function(error){
      console.log(error)
    });
  }
}

  useEffect(() => {
    getInstanceObjects();
    // fetchMetrics()
  }, [])

  useEffect(() => {
    if(currAgent != null){
    handleVisualise(currAgent);
    }
  }, [granularity])

  
  useEffect(() => {
    if(currAgent != null){
    handleVisualise(currAgent);
    // fetchMetrics()

    }
  }, [currAgent])

  

  useEffect(() => {

    if(currAgent != null){
    const interval = setInterval(() => {
      
      handleVisualise(currAgent);
    }, 60000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  
   }
  
  }, [currTime])


  // console.log("timeseries data", timeseriesData);


  return (
    <div>
      <NavBar />

      <div className={classes.root}>
        <Grid container >

          <Grid item xs={2} >
            <Grid>
              <Grid item>
                <AddInstanceDialog/>
                <IconButton onClick={getInstanceObjects}>
                  <SyncIcon />
                </IconButton>
              </Grid>


            </Grid>


            <List >

              {instanceArray.instanceData != undefined ? instanceArray.instanceData.map((value) => {
                return (
                  <div>
                  <Button style={{backgroundColor: value.agentId == currAgent? '#ABEBC6' : '#D7BDE2' }} button id={value.agentId} onClick={() => handleAgentClicked(value.agentId)} >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${value.description.host}-${value.description.uid}`}
                    />

                  </Button>
                  <Divider />
                  </div>
                );
              })
                : <p>No agents present</p>}
            </List>
          </Grid>
          <Grid item  >
            <Divider orientation="vertical" ></Divider>
          </Grid>

          <Grid item xs={8} >

            <Container >
              <br></br>
              <AppBar style={{ backgroundColor: "whitesmoke", color: "black" }} position="static">
                <Tabs variant="scrollable"  value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Http Methods" {...a11yProps(0)} /> 
                  <Tab label="Http Status" {...a11yProps(1)} />
                  <Tab label="Http Protocols" {...a11yProps(2)} />
                  <Tab label= "Http Connections" {...a11yProps(3)} />
                  <Tab label="Workers" {...a11yProps(4)} />
                  <Tab label="CPU Info"  {...a11yProps(5)} />
                  <Tab label="Agent Info"  {...a11yProps(6)} />
                  <Tab label="Virtual Memory" {...a11yProps(7)} />
                  <Tab label="Swap Memory" {...a11yProps(8)} />

                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <h1 className='title' style={{ textAlign: "center" }}>HttpMethods Metrics</h1>

                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>

                  <TabComponent metrictype={httpMethods} timeseriesData ={timeseriesData}/>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <h1 className='title' style={{ textAlign: "center" }}>HTTP status Metrics </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={httpStatus} timeseriesData ={timeseriesData}/>

               
              </TabPanel>

              <TabPanel value={value} index={2}>
                <h1 className='title' style={{ textAlign: "center" }}>HttpProtocols Metrics </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={httpProtocols} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={3}>
                <h1 className='title' style={{ textAlign: "center" }}>HttpConnections Metrics </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={httpConnections} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={4}>
                <h1 className='title' style={{ textAlign: "center" }}>Workers </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={workers} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={5}>
                <h1 className='title' style={{ textAlign: "center" }}> CPU Info </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={CPUInfo} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={6}>
                <h1 className='title' style={{ textAlign: "center" }}>Agent Info </h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={AgentInfo} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={7}>
                <h1 className='title' style={{ textAlign: "center" }}>Virtual Memory Info</h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={VirtualMemory} timeseriesData ={timeseriesData}/>

               
              </TabPanel>
              <TabPanel value={value} index={8}>
                <h1 className='title' style={{ textAlign: "center" }}>Swap Memory</h1>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick = {() =>handleGran("1m" , 60000)}>1m</Button>
                        <Button  onClick = {() =>handleGran("5m" , 300000)}>5m</Button>
                        <Button  onClick = {() =>handleGran("30m" ,1800000)}> 30m</Button>
                        <Button onClick = {() =>handleGran("1h" , 86400000)}>1h</Button>
                        <Button onClick = {() =>handleGran("4h" , 345600000)}>4h</Button>
                  </ButtonGroup>
                  <TabComponent metrictype={SwapMemory} timeseriesData ={timeseriesData}/>

               
              </TabPanel>

            </Container>
                  
          </Grid>
        <Grid>
        <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="text"
        >
       {/* <Typography font={20}>Select the category you want to see</Typography> */}
        <Button onClick={()=>{setValue(0)}}>httpConnections</Button>
        <Button onClick={()=>{setValue(1)}}>httpStatus</Button>
        <Button onClick={()=>{setValue(2)}}>httpProtocols</Button>
        <Button onClick={()=>{setValue(3)}}>httpMethods</Button>
        <Button onClick={()=>{setValue(4)}}>Workers</Button>
        <Button onClick={()=>{setValue(5)}}>CPUInfo</Button>
        <Button onClick={()=>{setValue(6)}}>AgentInfo</Button>
        <Button onClick={()=>{setValue(7)}}>Virtual Memory</Button>
        <Button onClick={()=>{setValue(8)}}>SwapMemory</Button>
      </ButtonGroup>
        </Grid>

        </Grid>
      </div>
    </div>
  );
}
