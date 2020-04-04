import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {

    render() {
        return (

            <MuiThemeProvider>
                <React.Fragment>
                    <div className = "main-card login-size">
                        <AppBar title="Login" />

                        <TextField className= "mt-3"
                            placeholder="Enter User Name/Email"
                            label="userName"
                            style={{width: '50%'}}
                            // onChange={handleChange('firstName')}
                            // defaultValue={values.firstName}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            className= "mt-3"
                            placeholder="Enter Passward"
                            label="passward"
                            // onChange={handleChange('email')}
                            // defaultValue={values.email}
                            margin="normal"
                            style={{width: '50%'}}
                        />
                        <br />
                        <RaisedButton
                            className= "mt-3 mr-3"
                            primary = {true}
                            color="primary"
                            variant="contained"
                            onClick={this.continue}
                        >Submit</RaisedButton>

                        <RaisedButton
                            className= "mt-3"
                            color="primary"
                            variant="contained"
                            onClick={this.continue}
                        >Cancel</RaisedButton>

                    </div>
                </React.Fragment>
            </MuiThemeProvider>

        );
    }

}
export default Login;
