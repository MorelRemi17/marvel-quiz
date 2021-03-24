// ============== React import ==============
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// ============== Components import ==========
import Header from '../Header';
import Footer from '../Footer';
import Landing from '../Landing';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import { IconContext } from "react-icons";


// ============== Css import ================
import '../../App.css';

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Header />
      <Switch>
        <Route exact path="/" component={ Landing }/>
        <Route path="/welcome" component={ Welcome }/>
        <Route path="/login" component={ Login }/>
        <Route path="/signup" component={ Signup }/>
        <Route path="/forgetpassword" component={ ForgetPassword }/>
        <Route component={ ErrorPage }/>
        </Switch>
      <Footer />
      </IconContext.Provider>
    </Router>
  );
};

export default App;



// pseudo : jm email : jm@jm.com mdp : jm123456
// OnjLmk45D
