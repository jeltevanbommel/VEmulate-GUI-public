import Navbar from "components/Navbar";
import OverrideDashboard from "./OverrideDashboard";
import React from "react";
import ConfigBuilder from "layouts/ConfigBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/scenariogen" component={ConfigBuilder} />
          <Route path="/" component={OverrideDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
