import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authScreen from './login';
import homeScreen from './home';
import reserveScreen from './reserve';

const AppRouter = () => (
  <Router>
    <div>
      	<Route path="/" exact component={authScreen} />
      	<Route path="/home" component={homeScreen} />
      	<Route path="/reserve" component={reserveScreen} />
    </div>
  </Router>
);

export default AppRouter;
