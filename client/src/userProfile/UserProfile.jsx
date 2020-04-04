import React, { Component, Fragment, useEffect, useState } from 'react';
import {MaskedTextBox} from '@progress/kendo-inputs-react-wrapper';
import { ComboBox, DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
// import {BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import {Button} from "./components/Button";
import { Button } from '@progress/kendo-react-buttons';
import avatar from './img_avatar.jpg'; // with import

import {saveUser} from'./UserService';
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// const ListTodo = () => {
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
//
//     const [allowances, setAllowances] = useState([]);
//     useEffect(() => {
//         console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
//         fetch("http://localhost:5000/userProfile/")
//             .then(data => {
//                 console.log(data.json);
//                 return data.json();
//             })
//             .then(data => {
//                 setAllowances(data);
//             })
//             .catch(err => {
//                 console.log("err : ", err);
//             });
//     },[]);

// };

//true
// // Add this in node_modules/react-dom/index.js
// window.React1 = require('react');
//
// // Add this in your component file
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,

            //drop down selected data
            selectedType: null,

            //drop down data
            types: ['Student', 'Lecturer', 'Other'],

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.isMount = true;
        // this.setHeaderTitle();
    }

    handleOnChangeCombo = event => {
        const valueObj = event.target.value;
        const field = event.target.name;

        if (field === 'selectedType' && valueObj) {
            this.setState({
                selectedType: event.target.value,
                // isVisaCountryErrorMessageVisible: false
            });
        }
    };

    handleSubmit = event => {
        //Do not refresh the page
        event.preventDefault();

        if (this.isMount) {
                this.setState(
                    () => {
                        var userProfile = {};
                        console.log("1111111111111111111111");

                        const studentProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };

                        const lecturerProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };
                        const otherProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };

                        if(this.state.selectedType === 'Student'){
                            console.log("222222222222222222222222222");
                            userProfile = studentProfile;
                        } else if(this.state.selectedType === 'Lecturer'){
                            console.log("333333333333333333333333333333333333");
                            userProfile = lecturerProfile;
                        } else if(this.state.selectedType === 'Other'){
                            console.log("4444444444444444444");
                            userProfile = otherProfile;
                        }

                        console.log("userProfile >> ",userProfile);
                        saveUser(userProfile)
                            .then(res => {
                                console.log("GGGGGGGGGGGGGGGGGGGGGGGGG");
                                this.toggleDialog(`The user is successfully created`, 'Success');
                                this.setState({});
                            })
                    })
            }
    };


    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };

    onClickCancel = event => {
        this.setState({
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,
            selectedType: ""
        })
    };

    readURL = event => {
        var image = document.getElementById('imageUpload');
        image.src = URL.createObjectURL(event.target.files[0]);

        // if (input.files && input.files[0]) {
        //     var reader = new FileReader();
        //
        //     reader.onload = function (e) {
        //         // ('#imageUpload')
        //         //     .attr('src', e.target.result);
        //     };
        //
        //     reader.readAsDataURL(input.files[0]);
        // }
    }

    render(){
        return (
            <div className="container-fluid">

                        {/*mt = margin top mb = margin buttom*/}
                        <div className="main-heading mt-4 mb-4"> <b> USER DETAILS </b></div>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="row ml-5">
                                        <h6>Avatar Image</h6>
                                </div>
                                <div className="row ml-5 mt-2 mb-4">
                                    <div className="img-avatar">
                                            <img src={avatar} alt="Avatar" width="100" height="100" border-radius="50%"/>
                                    </div>
                                </div>
                                <div className="row ml-5">
                                     <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.readURL}/>
                                        <label htmlFor="imageUpload"></label>
                                 </div>
                            </div>

                            <div className="col-md-9">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <label htmlFor="" className="mandatory">
                                                    Name:
                                                </label>
                                            </div>

                                            <div className="col-md-7">
                                                <MaskedTextBox
                                                   placeholder="Full Name"
                                                   value={this.state.fullName}
                                                   name="FirstName"
                                                   required={true}
                                                /> <br/>
                                            </div>
                                         </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                               <label className="mandatory">Type:</label>
                                            </div>
                                            <div className="col-md-7">
                                                <ComboBox
                                                      data={this.state.types}
                                                      value={this.state.selectedType}
                                                      onChange={this.handleOnChangeCombo}
                                                      name="selectedType"
                                                      placeholder="Please Select"
                                                      filterable={true}
                                                // onFilterChange={this.filterChangeCombo}
                                                //       popupSettings={this.popupSet}
                                                      required={true}
                                                 />
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className="row">

                                    {(this.state.selectedType === "Student") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label htmlFor="" className="mandatory" >Reg Number: </label>
                                                </div>
                                                <div className="col-md-7">
                                                    <MaskedTextBox className="mandatory"
                                                                   placeholder="Register Number"
                                                                   value={this.state.regNumber}
                                                                   name="regNumber"
                                                                   required={true}
                                                        // type="Numeric"
                                                        // maxLength= '9'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(this.state.selectedType === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label htmlFor="" className="mandatory" >Department : </label>
                                                </div>

                                                <div className="col-md-7">
                                                    <ComboBox
                                                        data={this.state.types}
                                                        value={this.state.selectedType}
                                                        onChange={this.handleOnChangeCombo}
                                                        name="selectedType"
                                                        placeholder="Please Select"
                                                        filterable={true}
                                                        // onFilterChange={this.filterChangeCombo}
                                                        //       popupSettings={this.popupSet}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        // </div>
                                    )}

                                    {(this.state.selectedType === "Student") && (
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <label htmlFor="" className="mandatory">Program:</label>
                                            </div>
                                            <div className="col-md-7" id="statusToolTip">
                                                <MaskedTextBox className="mandatory"
                                                   placeholder="Program"
                                                   value={this.state.program}
                                                   name="Program"
                                                   required={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                    {(this.state.selectedType === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label htmlFor="" className="mandatory">Program:</label>
                                                </div>
                                                <div className="col-md-7" id="statusToolTip">
                                                    <MaskedTextBox className="mandatory"
                                                                   placeholder="Program"
                                                                   value={this.state.program}
                                                                   name="Program"
                                                                   required={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <label htmlFor="" className="mandatory">Email:</label>
                                            </div>
                                            <div className="col-md-7" id="statusToolTip">
                                                <MaskedTextBox className="mandatory"
                                                   placeholder="example@gmail.com"
                                                   value={this.state.email}
                                                   name="Email"
                                                   required={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                     {/*<div className="col-md-12 btn-align-right">*/}
                                         <MuiThemeProvider>
                                             <React.Fragment>
                                                 <RaisedButton
                                                     className={"rbtn-primary"}
                                                     primary = {true}
                                                     variant="contained"
                                                     onClick={this.handleSubmit}
                                                 >SAVE</RaisedButton>

                                                 <RaisedButton
                                                     className={"rbtn-primary"}
                                                     color="primary"
                                                     variant="contained"
                                                     onClick={this.onClickCancel}
                                                 >CANCEL</RaisedButton>
                                             </React.Fragment>
                                        </MuiThemeProvider>
                                    {/*</div>*/}
                                </div>

                            </div>

                            </div>

                        <div className="main-seperator" />

                        <div className="main-heading">My Courses </div>
                            <div className="row">
                                course list here
                                <Fragment>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Fragment>
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="row">*/}
                                {/*        <div className="col-md-5">*/}
                                {/*            course list here*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                        <div>
                            {this.state.visible === true && (

                                <Dialog
                                    title={this.state.dialogTitle}
                                    onClose={this.toggleDialog}
                                    width="300px">
                                    {console.log("OOOOOOOOOOOOOOOOOOOOOOOOO")}

                                    <p style={{ margin: "25px", textAlign: "center" }}>
                                        {this.state.dialogMessage}
                                    </p>
                                    <DialogActionsBar>
                                        <button
                                            className="k-button modal-primary"
                                            onClick={
                                                this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status"
                                                    ? this.toggleDialog
                                                    : this.redirectToUserSearch
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
export default UserProfile;
