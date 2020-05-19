import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",

            // other
            showPassword: false,
        }
    }

    handleChange = (prop) => (event) => {
        this.setState({
            // ...values,
            [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState({
            // ...values,
            // password:
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        return (

            <MuiThemeProvider>
                <React.Fragment>
                    <div className = "main-card login-size">
                        <AppBar title="Login" />

                        <label htmlFor="" className="mandatory">User Name : </label>
                        <TextField className= "mt-3"
                            placeholder="Enter Email"
                            label="userName"
                            style={{width: '50%'}}
                            onChange={this.handleChange('userName')}
                            defaultValue={this.state.email}
                            margin="normal"
                        />
                        <br/>

                        <label htmlFor="" className="mandatory">Password : </label>
                        <Input
                            placeholder="Enter Password"
                            id="standard-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
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
