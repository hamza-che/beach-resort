import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// Pages
import Error from "./pages/Error";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
