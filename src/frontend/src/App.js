import logo from './logo.svg';
import './App.css';
import LogIn from './main/Login/login';
import SignUp from './main/Register/sign-up';
import Dashboard from './main/Dashboard/home';
function App() {
  return (
    <div className="App">
      {/* <LogIn />
      <SignUp /> */}
      <Dashboard />
    </div>
  );
}

export default App;
