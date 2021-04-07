
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Analytics from './Analytics/analytics';
import NavBar from './NavBar';
import Overview from './Overview/overview';



function MainPage() {
  return (
      <div>
    <NavBar ></NavBar>
    <BrowserRouter>
        <Switch>
          <Route path="/overview">
            <Overview />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/alerts">
          {/* <Alerts /> */}
          This is alert
          </Route>
        </Switch>
  </BrowserRouter>

      </div>
  );
}

export default MainPage;
