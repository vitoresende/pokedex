import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Pokedex from "./componentes/Pokedex";
import Pokemon from "./componentes/Pokemon.js";
import "./index.css";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename={window.location.pathname || ""}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Pokedex} />
        <Route path="/pokemon(/:id)" component={Pokemon} />
      </Route>
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);
