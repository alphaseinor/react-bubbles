import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles.scss";

import Login from "./components/Login";

import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'



function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/something/' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
