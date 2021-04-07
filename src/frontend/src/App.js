import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './main';
import Login from './main/Login/login';
import Register from './main/Register/sign-up';

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
          <Route path="/">
          <MainPage />
          </Route>
        </Switch>
  </BrowserRouter>

  );
}

export default App;
