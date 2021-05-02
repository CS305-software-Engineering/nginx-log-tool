import NavBar from '../NavBar';
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useEffect , useState } from 'react';

import SetAlertForm from './setAlertForm';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios';

import AlertCard from './AlertCard';
import { addInstance } from '../../service/actions/user.actions';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));





export default function Alerts() {



  const classes = useStyles();
  const instanceArray = useSelector(state => state.instanceData)

  const [alerts , setAlerts] = useState([]);
  const dispatch = useDispatch();

  function getInstanceObjects() {

    axiosInstance.get(`system/objects`)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        dispatch(addInstance(response));

      })
      .catch(function (error) {
        console.log(error);
      });

      axiosInstance.get(`alerts/all`)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setAlerts(response.data.alerts);
      })
      .catch(function (error) {
        console.log(error);
      });
   

    // setInterval(100000);
  }

  useEffect(() => {
    getInstanceObjects();
  }, [])


  console.log("This is alerts ",alerts);
  return (
    <div >
         <NavBar></NavBar>
        <br></br>
    <Container className={classes.root}>
      {instanceArray.instanceData != undefined ?
      <SetAlertForm _id="" f={0} metric="" contact="" operator="" period="" th="" agentId = { instanceArray.instanceData[0].agentId}/>
      :null}
      
      
      {alerts != undefined ? alerts.map((value) => {
                return (
                  <AlertCard  value = {value} />
                );
              })
                : 
               null 
                }

      
      
    </Container>
    </div>
  );
}
