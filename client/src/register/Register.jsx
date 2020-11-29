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
            fullName: "",
            email: "",
            typeId: 0,
            regNumber: 0,
            program: "",
            password: "",
            rePassword: "",

            isInCorrectPassword: false,
            visible: false,

            isErrorMessageVisible: false,
            isDisableSave: false,

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
        fetch('http://localhost:5000/userProfile/:id/getUserTypes')
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
            if(valueObj.typeid === 4){
                this.toggleDialog("You can't create Admin users from here!!", 'Error');
                this.setState({
                    selectedType: ""
                })
            } else {
                this.setState({
                    selectedType: valueObj,
                    typeId: valueObj.typeid
                })
            }
        }
    };

    handleSubmit = event => {
        //Do not refresh the page
        event.preventDefault();

        if (this.isMount) {
            this.setState(
                () => {
                    var userProfile = {};

                    if (this.state.selectedType && this.state.selectedType.name === 'Student') {
                        userProfile = {
                            UserName: this.state.fullName.trim(),
                            Email: this.state.email.trim(),
                            Type: this.state.typeId,
                            RegNumber: this.state.regNumber,
                            Password: this.state.password,
                            StatusId: 1,
                        };
                    } else if (this.state.selectedType && (this.state.selectedType.name === 'Lecturer' || this.state.selectedType.name === 'Other')) {
                        userProfile = {
                            UserName: this.state.fullName.trim(),
                            Type: this.state.typeId,
                            Email: this.state.email.trim(),
                            Password: this.state.password,
                            StatusId: 1,
                        };
                    }

                    if (this.state.password !== this.state.rePassword) {
                        this.setState({
                            isInCorrectPassword: true,
                        });
                        this.toggleDialog('Password Does not match!!', 'Error');

                    } else {
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
                                        console.log("userdata ?? ",userdata)
                                        uId = userdata.id;
                                        console.log("uId : ", uId)
                                    });
                                    this.toggleDialog('The user profile has been successfully created', 'Success');
                                })

                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }
                })
        }
    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
        if (title === 'Success') {
            this.onClickCancel();
        }
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

    validateProperty = value => {
        if (value) {
            return 'd-none';
        } else {
            return 'inline-error';
        }
    };

    validation = () => {
        if (
            this.validateProperty(this.state.fullName)
                .toString()
                .includes('error')
        ) {
            return false;
        } else if (
            this.validateProperty(this.state.email)
                .toString()
                .includes('error')
        ) {
            return false;
        } else if (
            this.validateProperty(this.state.selectedType)
                .toString()
                .includes('error')
        ) {
            return false;
        } else if (
            (this.state.selectedType && this.state.selectedType.name === "Student") &&
            this.validateProperty(this.state.regNumber)
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
        } else if (
            this.validateProperty(this.state.rePassword)
                .toString()
                .includes('error')
        ) {
            return false;
        } else {
            return true;
        }
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
                    {this.state.isErrorMessageVisible === true ? (
                        <span className={this.validateProperty(this.state.fullName)}>
                    Please enter your name
                  </span>
                    ) : null}

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
                    {this.state.isErrorMessageVisible === true ? (
                        <span className={this.validateProperty(this.state.email)}>
                    Please enter the email address
                  </span>
                    ) : null}

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
                    {this.state.isErrorMessageVisible === true ? (
                        <span className={this.validateProperty(this.state.selectedType)}>
                    Please select your user type
                  </span>
                    ) : null}

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
                            {this.state.isErrorMessageVisible === true ? (
                                <span className={this.validateProperty(this.state.regNumber)}>
                    Please enter your register number
                  </span>
                            ) : null}
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
                    {this.state.isErrorMessageVisible === true ? (
                        <span className={this.validateProperty(this.state.password)}>
                    Please enter the password
                  </span>
                    ) : null}

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
                    {this.state.isErrorMessageVisible === true ? (
                        <span className={this.validateProperty(this.state.rePassword)}>
                    Please re-enter the password
                  </span>
                    ) : null}

                    <br/>
                    <div>
                        <MuiThemeProvider>
                            <React.Fragment>
                                <RaisedButton
                                    className="mt-3 mr-3"
                                    disabled={this.state.isDisableSave}
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
                            </React.Fragment>
                        </MuiThemeProvider>

                        <div className={"mt-3 mb-3"}>
                            <a href={"http://localhost:3000/login"}> Login to existing Account </a>
                        </div>

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
