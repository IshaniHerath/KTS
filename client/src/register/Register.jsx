import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            // email: "",
            typeId: 0,
            // regNumber: "",
            // password: "",

            // showPassword: false,


            //drop down selected data
            selectedType: null,
        }
    }

    handleOnChange = event => {
        const field = event.target.name;

        if (field === "FirstName") {
            this.setState({
                fullName: event.target.value,
                isFormDirty: true,
            });
            console.log("this.state.fullName ", this.state.fullName);
        }
        if (field === "regNumber") {
            this.setState({
                regNumber: event.target.value,
                isFormDirty: true,
            });
        }
        console.log("this.state.regNumber ", this.state.regNumber);

        if (field === "Password") {
            this.setState({
                password: event.target.value,
                isFormDirty: true,
            });
        }
        console.log("this.state.password ", this.state.password);

        if (field === "RePassword") {
            this.setState({
                rePassword: event.target.value,
                isFormDirty: true,
            });

            if (this.state.password ===this.state.rePassword){
                this.setState({
                    isCorrectPassword: true,
                    isFormDirty: true,
                });
            }

            console.log("this.state.rePassword ", this.state.rePassword);
            console.log("this.state.isCorrectPassword ", this.state.isCorrectPassword);
        }


        if (field === "Email") {
            this.setState({
                email: event.target.value,
                isFormDirty: true,
            });
        }
        console.log("this.state.email ", this.state.email);
    };

    handleOnChangeCombo = event => {
        const valueObj = event.value;
        const field = event.target.name;

        if (field === 'selectedType' && valueObj) {
            this.setState({
                selectedType: valueObj
            })
        }
    };

    handleSubmit = event => {
            console.log("check check ");
            //Do not refresh the page
            event.preventDefault();

            if (this.isMount) {
                this.setState(
                    () => {
                        var userProfile = {};

                        if (this.state.selectedType === 'Student') {
                            userProfile = {
                                UserName: this.state.fullName,
                                Email: this.state.email,
                                Type: this.state.typeId,
                                RegNumber: this.state.regNumber,
                                Password: this.state.password,
                                Status: "pending",
                            };
                        } else if (this.state.selectedType === 'Lecturer') {
                            userProfile = {
                                UserName: this.state.userName,
                                ProgramId: this.state.selectedProgram.id,
                                DepartmentId: this.state.selectedDepartment.id,
                                Type: this.state.typeId,
                                Email: this.state.email,
                                Status: "pending",

                            };
                        } else if (this.state.selectedType === 'Other') {
                            userProfile = {
                                UserName: this.state.userName,
                                Type: this.state.typeId,
                                Email: this.state.email,
                                Status: "pending",

                            };
                        }

                        console.log("userProfile : " ,userProfile)

                        let uId = 0;
                        fetch('http://localhost:5000/Resister/', {
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
                                // this.setState({
                                // isLoaded: true,
                                // userId: uId,
                                // })
                            });

                    })
            }
    };

    handleClickShowPassword = () => {
        // console.log("showPassword 11 : ", this.state.showPassword);
        this.setState({
            // ...values,
            // password:
            showPassword: !this.state.showPassword

        });
        console.log("showPassword : ", this.state.showPassword);
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
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
                    <br/>

                    <label htmlFor="" className="mandatory">Type :</label>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        data={this.state.types}
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // value={"age"}
                        // onChange={handleChange}
                        style={{width: '50%'}}
                    >
                        <MenuItem value=""> <em>Please Select</em> </MenuItem>
                        <MenuItem value={1}> Student</MenuItem>
                        <MenuItem value={2}> Lecturer</MenuItem>
                        <MenuItem value={3}> Other</MenuItem>
                    </Select>
                    {/*</div>*/}
                    {console.log(" data =", this.state.types)}


                    {console.log(" value =", this.value)}
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

                    <label htmlFor="" className="mandatory">Register No : </label>
                    <Input className="mt-3"
                           placeholder="Enter your Register Number"
                           name="regNumber"
                           onChange={this.handleOnChange}
                           required={true}
                           style={{width: '50%'}}
                           margin="normal"
                           value={this.state.regNumber}
                    />

                    <br/>

                    <label htmlFor="" className="mandatory">Password : </label>
                    <Input className="mt-3"
                           value={this.state.password}
                           placeholder="Enter Password"
                           name="Password"
                           onChange={this.handleOnChange}
                           required={true}
                           style={{width: '50%'}}
                           margin="normal"
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
            </div>
        )
            ;
    }

}

export default Register;
