import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,

            //drop down selected data
            selectedType: null,

        }
    }

    render() {
        return (

            <MuiThemeProvider>
                <React.Fragment>
                    <div className = "main-card login-size">
                        <AppBar title="Enter User Details" />

                        <br/>

                        <label htmlFor="" className="mandatory">Type :</label>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={"age"}
                            // onChange={handleChange}
                            style={{width: '50%'}}
                        >
                            <MenuItem value=""> <em>Please Select</em> </MenuItem>
                            <MenuItem value={10}> Student</MenuItem>
                            <MenuItem value={20}> Lecturer</MenuItem>
                            <MenuItem value={30}> Other</MenuItem>
                        </Select>
                        <br/>

                        <label htmlFor="" className="mandatory">Name : </label>
                        <TextField className= "mt-3"
                           placeholder="Enter your Name"
                           label="userName"
                           style={{width: '50%'}}
                            // onChange={handleChange('firstName')}
                            // defaultValue={values.firstName}
                           margin="normal"
                        />
                        <br/>

                        <label htmlFor="" className="mandatory">Email:</label>
                        <TextField className= "mt-3"
                                   placeholder="Enter your Email"
                                   label="email"
                                   style={{width: '50%'}}
                            // onChange={handleChange('firstName')}
                            // defaultValue={values.firstName}
                                   margin="normal"
                        />
                        <br/>

                        <label htmlFor="" className="mandatory">Register No : </label>
                        <TextField className= "mt-3"
                            placeholder="Enter your Register Number"
                            label="regNum"
                            style={{width: '50%'}}
                            // onChange={handleChange('firstName')}
                            // defaultValue={values.firstName}
                            margin="normal"
                        />
                        <br />

                        <label htmlFor="" className="mandatory">Password : </label>
                        <TextField
                            className= "mt-3"
                            placeholder="Enter Password"
                            label="password"
                            // onChange={handleChange('email')}
                            // defaultValue={values.email}
                            margin="normal"
                            style={{width: '50%'}}
                        />
                        <br />

                        <label htmlFor="" className="mandatory">Re-Enter Password : </label>
                        <TextField
                            className= "mt-3"
                            placeholder="Re-Enter Password"
                            label="password"
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
export default Register;
