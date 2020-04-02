import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Switch, Link, Route, Router} from 'react-router-dom'
// import { Switch, Route } from 'react-router';

// import UserProfile from './userProfile/UserProfile';
import Layout from './component/Layout';

//import Login from './Login';


//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (

            <div className="App">

            {/*<Router>*/}
                <Switch>

                <Route
                    exact={true}
                    path="/"
                    component={props => (
                        <Layout
                            {...props}
                            timestamp={new Date().toString()}
                            onHeaderTitleChange={this.handleHeaderTitleChange}
                        />
                    )}
                />
                    {/*<Route*/}
                    {/*    exact={true}*/}
                    {/*    path="/login"*/}
                    {/*    component={props => (*/}
                    {/*        <Login*/}
                    {/*            {...props}*/}
                    {/*            timestamp={new Date().toString()}*/}
                    {/*            onHeaderTitleChange={this.handleHeaderTitleChange}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                </Switch>
                {/*</Router>*/}
            </div>
    );
  }

}

export default App;
