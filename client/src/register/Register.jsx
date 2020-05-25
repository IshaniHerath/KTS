import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {ComboBox} from "@progress/kendo-react-dropdowns";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import Redirect from "react-router-dom/Redirect";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            email: "",
            typeId: 0,
            regNumber: 0,
            password: "",
            rePassword: "",

            isInCorrectPassword: false,
            visible: false,

            showPassword: false,
            showRePassword: false,
            //drop down
            AllTypes: [],

            redirectToLogin: false,
            //drop down selected data
            selectedType: null,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.isMount = true;
        this.populateUserType();
    }

    populateUserType() {
        fetch('http://localhost:5000/userProfile/getUserTypes')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    AllTypes: data
                });
            });
    }

    handleOnChange = event => {
        const field = event.target.name;

        if (field === "FirstName") {
            this.setState({
                fullName: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "regNumber") {
            this.setState({
                regNumber: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "Password") {
            this.setState({
                password: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "RePassword") {
            this.setState({
                rePassword: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "Email") {
            this.setState({
                email: event.target.value,
                isFormDirty: true,
            });
        }
    };

    handleOnChangeCombo = event => {
        const valueObj = event.value;
        const field = event.target.name;

        if (field === 'selectedType' && valueObj) {
            this.setState({
                selectedType: valueObj,
                typeId: valueObj.typeid
            })
        }
    };

    handleSubmit = event => {
        //Do not refresh the page
        event.preventDefault();

        if (this.isMount) {
            this.setState(
                () => {
                    var userProfile = {};

                    if (this.state.password !== this.state.rePassword) {
                        this.state.password = null;
                    }

                    if (this.state.selectedType.name === 'Student') {
                        userProfile = {
                            UserName: this.state.fullName,
                            Email: this.state.email,
                            Type: this.state.typeId,
                            RegNumber: this.state.regNumber,
                            Password: this.state.password,
                            StatusId: 1,
                        };
                    } else if (this.state.selectedType.name === 'Lecturer' || this.state.selectedType.name === 'Other') {
                        userProfile = {
                            UserName: this.state.userName,
                            Type: this.state.typeId,
                            Email: this.state.email,
                            StatusId: 1,
                        };
                    }

                    console.log("userProfile : ", userProfile);

                    let uId = 0;
                    fetch('http://localhost:5000/register/', {
                        method: 'POST',
                        body: JSON.stringify(userProfile),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(function (userdata) {
                                uId = userdata.id;
                                console.log("uId : ", uId)
                            });
                            const message = 'The user profile has been successfully created';
                            const title = 'Success';
                            this.toggleDialog(message, title);
                        })

                        .catch(error => {
                            this.setState({
                                isInCorrectPassword: true,
                            });
                            const message = "Password Doesn't match!!";
                            const title = 'Error';
                            this.toggleDialog(message, title);
                        });
                })
        }
    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
        this.onClickCancel();
    };

    onClickCancel = event => {
        this.setState({
            fullName: "",
            email: "",
            regNumber: 0,
            selectedType: "",
            password: "",
            rePassword: "",
        })
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleClickShowRePassword = () => {
        this.setState({
            showRePassword: !this.state.showRePassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    redirectToLogin = () => {
        this.setState({
            redirectToLogin: true
        });
    };

    render() {

        if (this.state.redirectToLogin === true) {
            return <Redirect to="/login"/>;
        }

        return (
            <div>
                <div className="main-card login-size">
                    <MuiThemeProvider>
                        <React.Fragment>
                            <AppBar title="Enter User Details"/>
                        </React.Fragment>
                    </MuiThemeProvider>

                    <br/>

                    <label htmlFor="" className="mandatory">Name : </label>
                    <Input
                        placeholder="Full Name"
                        value={this.state.fullName}
                        name="FirstName"
                        onChange={this.handleOnChange}
                        required={true}
                        style={{width: '50%'}}
                        margin="normal"
                    />

                    <br/>

                    <label htmlFor="" className="mandatory">Email:</label>
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

                    <label htmlFor="" className="mandatory">Type :</label>
                    <ComboBox
                        textField="name"
                        dataItemKey="typeid"
                        data={this.state.AllTypes}
                        value={this.state.selectedType}
                        onChange={this.handleOnChangeCombo}
                        name="selectedType"
                        placeholder="Please Select"
                        filterable={true}
                        //       popupSettings={this.popupSet}
                        required={true}
                    />

                    <br/>

                    {(this.state.selectedType && this.state.selectedType.name === "Student") && (
                        <div>
                            <label htmlFor="" className="mandatory">Register No : </label>
                            < Input className="mt-3"
                                    placeholder="Enter your Register Number"
                                    name="regNumber"
                                    onChange={this.handleOnChange}
                                    required={true}
                                    style={{width: '50%'}}
                                    margin="normal"
                                    value={this.state.regNumber}
                            />
                        </div>
                    )}

                    < label htmlFor="" className="mandatory">Password : </label>
                    <Input className="mt-3"
                           value={this.state.password}
                           placeholder="Enter Password"
                           name="Password"
                           onChange={this.handleOnChange}
                           required={true}
                           style={{width: '50%'}}
                           margin="normal"
                           id="standard-adornment-password"
                           type={this.state.showPassword ? 'text' : 'password'}
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

                    <label htmlFor="" className="mandatory">Re-Enter Password : </label>
                    <Input className="mt-3"
                           value={this.state.rePassword}
                           name="RePassword"
                           onChange={this.handleOnChange}
                           required={true}
                           placeholder="Re-Enter Password"
                           margin="normal"
                           style={{width: '50%'}}
                           id="standard-adornment-password"
                           type={this.state.showRePassword ? 'text' : 'password'}
                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={this.handleClickShowRePassword}
                                       onMouseDown={this.handleMouseDownPassword}
                                   >
                                       {this.state.showRePassword ? <Visibility/> : <VisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    <br/>
                    <div>
                        <MuiThemeProvider>
                            <React.Fragment>
                                <RaisedButton
                                    className="mt-3 mr-3"
                                    primary={true}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleSubmit}
                                >Submit</RaisedButton>

                                <RaisedButton
                                    className="mt-3"
                                    color="primary"
                                    variant="contained"
                                    onClick={this.continue}
                                >Cancel</RaisedButton>
                            </React.Fragment>
                        </MuiThemeProvider>
                    </div>
                </div>

                <div>
                    {(this.state.visible === true || this.state.isInCorrectPassword === true) && (
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
                                        // this.toggleDialog
                                        this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status"
                                            ? this.toggleDialog
                                            : this.redirectToLogin
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

export default Register;
