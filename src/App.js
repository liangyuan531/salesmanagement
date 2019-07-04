import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigator from './components/Navigator'
import TopBar from './components/TopBar'
import Home from './components/Home'
import Records from './components/Records'
import Report from './components/Report'
import Error404 from './components/Error'
import AddRecord from './components/operation/AddRecord'
import UpdateRecord from './components/operation/UpdateRecord'
import UpdateRecordItems from './components/operation/UpdateRecordItems'
import UpdateRecordPostDetails from './components/operation/UpdateRecordPostDetails'


import store from './redux/store'
import { Provider } from 'react-redux'

import './App.css'
import './stylesheets/style.css'

function App() {
  return (
    // <div className="App">
      <Provider store={store}>
        <Router>
          <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
              <TopBar />
            </nav>
            <div className="container-fluid">
              <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                  <Navigator />
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/records" component={Records}/>
                    <Route path="/report" component={Report}/>
                    <Route path="/addRecord" component={AddRecord} />
                    <Route path="/updateRecord" component={UpdateRecord} />
                    <Route paht="/updateRecordItems" component={UpdateRecordItems}/>
                    <Route paht="/updateRecordPostDetails" component={UpdateRecordPostDetails}/>
                    <Route component={Error404}/>
                  </Switch>
                </main>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    // </div>
  );
}

export default App;
