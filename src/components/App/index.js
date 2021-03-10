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


// ============== Css import ================
import '../../App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ Landing }/>
        <Route path="/welcome" component={ Welcome }/>
        <Route path="/login" component={ Login }/>
        <Route path="/signup" component={ Signup }/>
        <Route component={ ErrorPage }/>
        </Switch>
      <Footer />
    </Router>
  );
};

export default App;
