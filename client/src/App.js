import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
      <Link to="/bubblepage">Bubble Page</Link>

        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubblepage" component={BubblePage} />

      </div>
    </Router>
  );
}

export default App;
