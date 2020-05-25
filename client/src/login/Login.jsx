import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import Redirect from "react-router-dom/Redirect";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            dbPassword: "",
            status: 0,
            credential: [],

            visible: false,
            redirectToHome: false,

            // other
            showPassword: false,
        }
    }

    handleOnChange = (event) => {
        const field = event.target.name;

        if (field === "Email") {
            this.setState({
                email: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "Password") {
            this.setState({
                password: event.target.value,
                isFormDirty: true,
            });
        }
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

    onClickCancel = event => {
        this.setState({
            email: "",
            password: "",
        })
    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };

    handleSubmit = event => {
        //Do not refresh the page
        event.preventDefault();
        this.setState(
            () => {
                var Email = this.state.email;
                fetch('http://localhost:5000/login/' + Email)
                    .then(res => res.json()
                        .then(res => {
                            var credential = [];
                            res.forEach(function (credentials) {
                                credential = {
                                    Password: credentials.password,
                                    Status: credentials.status,
                                };
                            });

                            this.setState({
                                dbPassword: credential.Password,
                                status: credential.Status
                            });

                            if (this.state.dbPassword === this.state.password && this.state.status === 2) {
                                this.setState({
                                    redirectToHome: true
                                });
                            }
                            if (this.state.dbPassword !== this.state.password) {
                                const message = 'The Password/email address you have entered is incorrect';
                                const title = 'Error';
                                this.toggleDialog(message, title);
                            }
                        })
                    )
            })
    };

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to="/"/>;
        }
        return (
            <div>
                <MuiThemeProvider>
                    <React.Fragment>
                        <div className="main-card login-size">
                            <AppBar title="Login"/>

                            <br/>

                            <label htmlFor="" className="mandatory">Email : </label>
                            <Input className="mt-3"
                                   placeholder="Enter your Email"
                                   name="Email"
                                   onChange={this.handleOnChange}
                                   required={true}
                                   style={{width: '50%'}}
                                   margin="normal"
                                   value={this.state.email}
                            />

                            <br/>
                            <br/>

                            <label htmlFor="" className="mandatory">Password : </label>
                            <Input
                                placeholder="Enter Password"
                                id="standard-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                name="Password"
                                onChange={this.handleOnChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            <br/>
                            <br/>

                            <RaisedButton
                                className="mt-3 mr-3"
                                primary={true}
                                color="primary"
                                variant="contained"
                                onClick={this.handleSubmit}
                            >SUBMIT</RaisedButton>

                            <RaisedButton
                                className="mt-3"
                                color="primary"
                                variant="contained"
                                onClick={this.onClickCancel}
                            >CLEAR</RaisedButton>

                        </div>
                    </React.Fragment>
                </MuiThemeProvider>

                <div>
                    {(this.state.visible === true) && (
                        <Dialog
                            title={this.state.dialogTitle}
                            onClose={this.toggleDialog}
                            width="300px">
                            <p style={{margin: "25px", textAlign: "center"}}>
                                {this.state.dialogMessage}
                            </p>
                            <DialogActionsBar>
                                <button
                                    className="k-button modal-primary"
                                    onClick={
                                        this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status"
                                            ? this.toggleDialog
                                            : ""
                                    }>
                                    OK
                                </button>
                            </DialogActionsBar>
                        </Dialog>
                    )}
                </div>
            </div>
        );
    }
}

export default Login;
