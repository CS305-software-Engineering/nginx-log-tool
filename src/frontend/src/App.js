import logo from './logo.svg';
import LogIn from './main/Login/login';
import SignUp from './main/Register/sign-up';
import Dashboard from './main/Dashboard/home';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (

  <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>

  );
}

export default App;
