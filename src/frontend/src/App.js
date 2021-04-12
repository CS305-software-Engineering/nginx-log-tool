import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import Login from './main/Login/login';
import Register from './main/Register/sign-up';
import Analytics from './main/Analytics/analytics';
import Overview from './main/Overview/overview';
import Alerts from './main/Alerts/alert';
import { useHistory } from "react-router-dom";


import {useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authCheck } from './service/actions/user.actions';



function App() {

  const dispatch = useDispatch();
  
  useEffect( () => {
    dispatch(authCheck());
  }, [])
 

  const user = useSelector(state => state.userData)
  console.log(user)
  return (
  <BrowserRouter>
        <Switch>
        
          <Route path="/register">
            <Register />
          </Route>
 
          <Route path="/analytics">
            <Analytics />
          </Route>
          
          <Route path="/alerts">
          <Alerts />
          </Route>
          <Route path="/">

            {
              !user.isAuthenticated ?   
                <Login />
              :
              <Overview />
              // <Template />

            }

          </Route>


        </Switch>
  </BrowserRouter>

  );
}

export default App;
