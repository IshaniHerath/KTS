import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Layout from './component/Layout';
import MyDirection from './component/Direction';
import Login from './login/Login';
import Register from './register/Register';
import Admin from './admin/Admin';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            status: 2,
            type: 3
        }
    }

    callbackFunction = (childData) => {
        console.log("childData >>>>>>>> :", childData);
        this.setState({
            id: childData
        })
    };

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact={true}
                            path={"/"}
                            render={
                                (props) => <MyDirection {...props}
                                                        parentCallback={this.callbackFunction}
                                                        id={this.state.id}
                                />
                            }
                        />

                        <Route
                            exact={true}
                            path={"/" + (this.state.id)}
                            render={
                                (props) => <Layout {...props}
                                                   id={this.state.id}
                                                   status={this.state.status}
                                                   type={this.state.type}
                                />
                            }
                        />
                        <Route
                            exact={true}
                            path="/login"
                            render={
                                (props) => <Login {...props}
                                                  parentCallback={this.callbackFunction}
                                                  id={this.state.id}
                                />
                            }
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
                                    id={this.state.id}
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
