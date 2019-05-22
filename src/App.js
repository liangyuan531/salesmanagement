import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Navigator from './components/Navigator'
import Home from './components/Home'
import Records from './components/Records'
import Report from './components/Report'
import Error404 from './components/Error'

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Navigator />
        <Route exact path="/" component={Home}/>
        <Route path="/record" component={Records}/>
        <Route path="/report" component={Report}/>
        <Route component={Error404}/>
      </Switch>
    </div>
  );
}

export default App;
