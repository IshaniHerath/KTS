import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Layout from './component/Layout';
import Login from './login/Login';
import Register from './register/Register';
import Admin from './admin/Admin';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state ={
            id: 89,
            status: 3
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact={true}
                            path={"/" + (this.state.id)}
                            render={
                                (props) => <Layout {...props}
                                                   id={this.state.id}
                                                   status={this.state.status}
                                />
                            }

                            // component={props => (
                            //     <Layout
                            //         {...props}
                            //         timestamp={new Date().toString()}
                            //         onHeaderTitleChange={this.handleHeaderTitleChange}
                            //         id = {this.state.id}
                            //     />
                            // )}
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
                                />
                            )}
                        />
                        <Route
                            exact={true}
                            path="/admin"
                            component={props => (
                                <Admin
                                    {...props}
                                    timestamp={new Date().toString()}
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
