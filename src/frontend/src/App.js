import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './main/Login/login';
import Register from './main/Register/sign-up';
import Analytics from './main/Analytics/analytics';
import Overview from './main/Overview/overview';
import Alerts from './main/Alerts/alert';


function App() {
  return (
  <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
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
            <Overview />
          </Route>

        </Switch>
  </BrowserRouter>

  );
}

export default App;
