import React, { Component } from 'react';
import './App.css';
import {BrowserRouter , Switch, Link, Route, Router} from 'react-router-dom'
// import { Switch, Route } from 'react-router';

import Layout from './component/Layout';
import Course from './course/Course';
import Login from './login/Login';
import Register from './register/Register';

import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <BrowserRouter >
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
                    <Route
                        exact={true}
                        path="/login"
                        component={props => (
                            <Login
                                {...props}
                                timestamp={new Date().toString()}
                                onHeaderTitleChange={this.handleHeaderTitleChange}
                            />
                        )}
                    />
                    <Route
                        exact={true}
                        path="/login"
                        component={props => (
                            <Login
                                {...props}
                                timestamp={new Date().toString()}
                                onHeaderTitleChange={this.handleHeaderTitleChange}
                            />
                        )}
                    />
                    <Route
                        exact={true}
                        path="/register"
                        component={props => (
                            <Register
                                {...props}
                                timestamp={new Date().toString()}
                                onHeaderTitleChange={this.handleHeaderTitleChange}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
  }

}

export default App;
