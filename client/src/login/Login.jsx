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
            id: 0,
            email: "",
            password: "",
            dbPassword: "",
            status: 0,
            type: 0,
            credential: [],

            isErrorMessageVisible: false,
            visible: false,
            redirectToHome: false,
            redirectToAdminPage: false,

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
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    onClickCancel = (event) => {
        this.setState({
            id: 0,
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

        // const {history} = this.props;

        this.setState(
            () => {
                if (!this.validation()) {
                    this.setState({
                        isErrorMessageVisible: true
                    });
                    this.setState({
                        visible: true
                    });
                    this.toggleDialog('Please fix the highlighted errors to continue', 'Error');
                } else {
                    this.setState({
                        isErrorMessageVisible: false
                    });

                    var Email = this.state.email;
                    fetch('http://localhost:5000/login/' + Email)
                        .then(res => res.json()
                            .then(res => {
                                var credential = [];
                                res.forEach(function (credentials) {
                                    credential = {
                                        Id: credentials.id,
                                        Password: credentials.password,
                                        Status: credentials.status,
                                        Type: credentials.type,
                                    };
                                });
                                this.setState({
                                    id: credential.Id,
                                    dbPassword: credential.Password,
                                    status: credential.Status,
                                    type: credential.Type
                                });

                                //send Data from child(login) to parent(app.jsx) through callback function
                                this.props.parentCallbackId(this.state.id);
                                this.props.parentCallbackType(this.state.type);
                                this.props.parentCallbackStatus(this.state.status);

                                //Password check
                                if (this.state.dbPassword === this.state.password) {

                                    //Status pending
                                    if (this.state.status === 1) {
                                        this.toggleDialog('Your user type request is Pending. Please try later', 'Error');
                                    }

                                    //Status Rejected
                                    if (this.state.status === 3) {
                                        this.toggleDialog('Your user type request is Rejected. Please register again with different user type', 'Error');
                                    }

                                    //Status Approved
                                    if (this.state.status === 2) {

                                        //Student, Lecturer, Other users
                                        if (this.state.type === 1 || this.state.type === 2 || this.state.type === 3) {
                                            this.setState({
                                                redirectToHome: true
                                            });
                                        }

                                        //admin user
                                        if (this.state.type === 4) {
                                            this.setState({
                                                redirectToAdminPage: true
                                            });
                                        }
                                    }

                                }
                                else if (this.state.dbPassword !== this.state.password) {
                                    this.toggleDialog('The Password/email address you have entered is incorrect', 'Error');
                                }
                            })
                        )
                }
            })
    };

    validateProperty = value => {
        if (value) {
            return 'd-none';
        } else {
            return 'inline-error';
        }
    };

    validation = () => {
        if (
            this.validateProperty(this.state.email)
                .toString()
                .includes('error')
        ) {
            return false;
        } else if (
            this.validateProperty(this.state.password)
                .toString()
                .includes('error')
        ) {
            return false;
        } else {
            return true;
        }
    };

    render() {
        if (this.state.id && this.state.redirectToHome === true) {
            return <Redirect to= {"/"
            + this.state.id
            }/>;
        }

        if (this.state.redirectToAdminPage === true) {
            return <Redirect to= '/admin'/>;
        }

        return (
            <div>
                <MuiThemeProvider>
                    <React.Fragment>
                        <div className="main-card login-size">
                            <AppBar title="Login"/>

                            <br/>

                            <label htmlFor="" className="mandatory">Email : </label>
                            <Input className="mt-3 ml-2"
                                   placeholder="Enter your Email"
                                   name="Email"
                                   onChange={this.handleOnChange}
                                   required={true}
                                   style={{width: '50%'}}
                                   margin="normal"
                                   value={this.state.email}
                            />
                            {this.state.isErrorMessageVisible === true ? (
                                <span className={this.validateProperty(this.state.email)}>
                    Please enter your name
                  </span>
                            ) : null}

                            <br/>
                            <br/>

                            <label htmlFor="" className="mandatory">Password : </label>
                            <Input
                                placeholder="Enter your Password"
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
                            {this.state.isErrorMessageVisible === true ? (
                                <span className={this.validateProperty(this.state.password)}>
                    Please enter the password
                  </span>
                            ) : null}

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

                            <div className={"mt-3 mb-3"}>
                                <a href={"http://localhost:3000/register"}> Create New Account </a>
                            </div>

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
