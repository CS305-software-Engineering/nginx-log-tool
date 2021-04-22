import React, { useState } from 'react';
import {fade,  makeStyles } from '@material-ui/core/styles';
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
import { addInstance ,saveTimeSeriesData, saveTimeStamp } from '../../service/actions/user.actions';

import AddInstanceDialog from './createInstanceDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currAgent , setCurrentAgent] = useState(null); 
  const instanceArray = useSelector(state => state.instanceData)
  const timeseriesData = useSelector(state => state.timeseriesData)
  const timestamp = useSelector(state => state.timestamp);
  console.log("tHIS IS AGENT DETAILS" , instanceArray);
  console.log("timestamp" , timestamp);
  const [value, setValue] = React.useState(0);

  const [graphData,setGraphData] = React.useState([]); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

function handleVisualise(agentId){

//  console.log(agentId)
//  setCurrentAgent(agentId);
  const times  = 3600000;
  const min = 1000*60; 
  const currenttime = Math.floor(Date.now());
  console.log("ljhldsjahfhadh",currenttime);
  const data = {
    "metrics": [
        {
            "from": currenttime - times,
            "to": currenttime,
            "metric": "httpStatus2xx",
            "granularity": "1m",
            "agentId": agentId
        },
        {
          "from": currenttime - times,
          "to": currenttime,
          "metric": "httpStatus4xx",
          "granularity": "1m",
          "agentId": agentId
      },
      {
        "from": currenttime - times,
        "to": currenttime,
        "metric": "httpStatus5xx",
        "granularity": "1m",
        "agentId": agentId
      },
      {
        "from": currenttime - times,
        "to": currenttime,
        "metric": "getMethods",
        "granularity": "1m",
        "agentId": agentId
      },
 
      {
        "from": currenttime - times,
        "to": currenttime,
        "metric": "protocolHttp_v0_9",
        "granularity": "1m",
        "agentId": agentId
      },
      {
        "from": currenttime - times,
        "to": currenttime,
        "metric": "protocolHttp_v1_1",
        "granularity": "1m",
        "agentId": agentId
      },
    ]
};

    axiosInstance.post(`timeseries/seq` , data )
    .then(function (response) {
      // console.log(response.data);
      dispatch( saveTimeSeriesData(  response) );
      setGraphData( response.data);
      
    })
    .catch(function (error) {
      console.log(error);
    });


}

function xAxisChanger(data, newData)
{
    data.shift();
    data.push(newData);
    return data;
}    


function getInstanceObjects(){


  axiosInstance.get(`system/objects`)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
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


  const MINUTE_MS = 5000;

useEffect(() => {


  const interval = setInterval(() => {
    handleVisualise("5505d27ea1c7f1509736b60f3d081923b12eedfc");
    // const agentId = "5505d27ea1c7f1509736b60f3d081923b12eedfc";
    // console.log('Logs every minute');
    // const starttime = timestamp.timestamp;
    // console.log("starttime" , starttime);
    // const times = 60000;
    // const data = {
    //   "metrics": [
    //       {
    //           "from": starttime ,
    //           "to": starttime+ times,
    //           "metric": "httpStatus2xx",
    //           "granularity": "1m",
    //           "agentId": agentId
    //       },
    //       {
    //         "from": starttime ,
    //         "to": starttime + times,
    //         "metric": "httpStatus4xx",
    //         "granularity": "1m",
    //         "agentId": agentId
    //     },
    //     {
    //       "from": starttime,
    //       "to": starttime+ times,
    //       "metric": "httpStatus5xx",
    //       "granularity": "1m",
    //       "agentId": agentId
    //   },
    //   ]
  // };
  
      // axiosInstance.post(`timeseries/seq` , data )
      // .then(function (response) {
      //   // console.log(response.data);
      //   dispatch( saveTimeSeriesData(  response) );
      //   dispatch(saveTimeStamp(times))

      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  
    


  }, MINUTE_MS );

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])
    
 
console.log("timeseries data",timeseriesData)

function getX(l){

  var list_ = []
  l.map((value) => {
    var date = new Date(value._id);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    list_.push(`${hours}:${minutes}`);
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

        <Grid item xs={9} >

            <Container >
              <br></br>
            <AppBar style={{backgroundColor:"whitesmoke" , color:"black" }} position="static">
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab  label="Static/System Metrics" {...a11yProps(0)} />
                    <Tab  label="Dynamic/Nginx Metrics" {...a11yProps(1)} />

                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                <h1 className='title' style={{textAlign:"center"}}>System Metrics</h1>

                </TabPanel>
                <TabPanel value={value} index={1}>
                <h1 className='title' style={{textAlign:"center"}}>NGINX Metrics</h1>

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
                    :  <Grid item lg = {12} md={12}  xs={12}>
                    Click on any Instance to visualise!!!
                    </Grid> }

                    </Grid>
                </TabPanel>
          
            </Container>


        </Grid>
      
      </Grid>
    </div>
    </div>
  );
}
