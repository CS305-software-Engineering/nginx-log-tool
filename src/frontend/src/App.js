import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import Login from './main/Login/login';
import Register from './main/Register/sign-up';
import Analytics from './main/Analytics/analytics';
// import Overview from './main/Overview/overview';
import Alerts from './main/Alerts/alert';
import { useHistory } from "react-router-dom";


import {useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authCheck, saveTimeStamp } from './service/actions/user.actions';



function App() {
  const user = useSelector(state => state.userData)

  const dispatch = useDispatch();
  
  useEffect( () => {
    dispatch(authCheck());
    dispatch(saveTimeStamp(Math.floor(Date.now())));
  }, [])
 

  console.log(user)
  return (
  <BrowserRouter>
        <Switch>
        
          <Route path="/register">
            <Register />
          </Route>
 
          <Route path="/analytics">
          {
              !user.isAuthenticated ?   
                <Login />
              :
              <Analytics />
            }
          
          </Route>
          
          <Route path="/alerts">
          {
              !user.isAuthenticated ?   
                <Login />
              :
              <Alerts />
            }

          </Route>
          <Route path="/">

            {
              !user.isAuthenticated ?   
                <Login />
              :
              <Analytics />

            }

          </Route>


        </Switch>
  </BrowserRouter>

  );
}

export default App;
