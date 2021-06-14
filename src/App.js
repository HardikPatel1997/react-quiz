import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/fonts/material-icon/css/material-design-iconic-font.min.css'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="main my-5 py-5">
          <Router>
              <Switch>
                 <Route exact path="/" component={Login}/>
                 <Route exact path="/" component={Login}/>
                 <Route path="/register" component={Register}/> 
                 <Route path="/home" component={Home}/>
              </Switch>
            </Router>
    </div>
  );
}

export default App;
