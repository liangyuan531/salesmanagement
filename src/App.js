import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Navigator from './components/Navigator'
import TopBar from './components/TopBar'
import Home from './components/Home'
import Records from './components/Records'
import Report from './components/Report'
import Error404 from './components/Error'

import './App.css'
import './stylesheets/home.css'

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <TopBar />
          </nav>
          <div class="container-fluid">
            <div className="row">
              <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <Navigator />
              </nav>
              <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Route path="/" exact component={Home}/>
                <Route path="/records" component={Records}/>
                <Route path="/report" component={Report}/>
                <Route component={Error404}/>
              </main>
            </div>
          </div>
        </div>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
