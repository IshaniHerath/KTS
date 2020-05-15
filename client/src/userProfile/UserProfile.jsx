import React, {Component, Fragment, useEffect, useState} from 'react';
import {MaskedTextBox} from '@progress/kendo-inputs-react-wrapper';
import {ComboBox, DropDownList} from '@progress/kendo-react-dropdowns';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import {Button} from '@progress/kendo-react-buttons';
import avatar from './img_avatar.jpg'; // with import
import cover from './avatar_img/screen.jpg'; // with import

import {saveUser, getCourseList} from './UserService';
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Input from "@material-ui/core/Input";
import {Label} from '@progress/kendo-react-labels';
import Redirect from "react-router-dom/Redirect";
// import {Alert, AlertTitle} from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
// import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import TopBar from "../component/TopBar";
import UserImageSection from "../userProfile/UserImageSection";

const programAll = [];

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            department: "",
            email: "",
            typeId: 0,
            regNumber: 0,
            userId: {},

            //drop down selected data
            selectedType: null,
            selectedProgram: null,
            selectedDepartment: null,

            //drop down data
            types: ['Student', 'Lecturer', 'Other'],
            AllPrograms: [],
            items: [],
            AllDepartments: [],
            // isLoaded: false,

            // Other
            dialogMessage: '',
            dialogTitle: '',
            redirectToUserSearch: false,

            setOpen: true,
            open: true,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.isMount = true;
        this.populateCourses();
        this.populatePrograms();
        this.populateDepartments();
    }

    populatePrograms() {
        fetch('http://localhost:5000/courses/getPrograms')
            .then(res => res.json())
            .then(data => {
                console.log("data : ", data);
                this.programAll = data;

                // const tempProgram = [];
                // data.forEach(function (program) {
                //     tempProgram.push(program.name);
                //     // tempProgram.push(program);
                // });
                this.setState({
                    // programs: tempProgram
                    AllPrograms: data
                });
            });
        console.log("progams : ", this.state.AllPrograms)

    }

    populateDepartments() {
        fetch('http://localhost:5000/userProfile/getDepartments')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    AllDepartments: data
                });
            });
    }

    populateCourses() {
        // var postId = this.props.postid;

        fetch('http://localhost:5000/userProfile/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    // isLoaded: true,
                    items: json,
                });
            });

        // getCourseList().then(response => {
        //     // let profileDetails = response.data;
        //     console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUU")
        //     console.log("response.data : ", response.data)
        // });
    }

    handleOnChangeCombo = event => {
        const valueObj = event.value;
        const field = event.target.name;

        console.log("event target>>>>>>>>>> ", event.target)
        console.log("event >>>>>>>>>> ", event)
        console.log("event index >>>>>>>>>> ", event.target.index)

        if (field === 'selectedDepartment' && valueObj) {
            this.setState({
                selectedDepartment: valueObj
            })
        }

        if (field === 'selectedProgram' && valueObj) {
            this.setState({
                selectedProgram: valueObj
            })
        }

        if (field === 'selectedType' && valueObj) {
            this.setState({
                selectedType: valueObj,
                // isVisaCountryErrorMessageVisible: false
            });

            if (valueObj === "Student") {
                this.state.typeId = 1;
            }
            if (valueObj === "Lecturer") {
                this.state.typeId = 2;
            }
            if (valueObj === "Other") {
                this.state.typeId = 3;
            }
        }
    };

    handleOnChange = event => {
        const field = event.target.name;

        if (field === "FirstName") {
            if (this.isMount) {
                this.setState({
                    fullName: event.target.value,
                    isFormDirty: true,
                });
            }
        }
        if (field === "regNumber") {
            if (this.isMount) {
                this.setState({
                    regNumber: event.target.value,
                    isFormDirty: true,
                });
            }
        }
        if (field === "Program") {
            if (this.isMount) {
                this.setState({
                    program: event.target.value,
                    isFormDirty: true,
                });
            }
        }
        if (field === "Email") {
            if (this.isMount) {
                this.setState({
                    email: event.target.value,
                    isFormDirty: true,
                });
            }
        }
        // await this.validateProperty(event.target.value);
    };

    handleSubmit = event => {
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
                            regNumber: this.state.regNumber,
                            ProgramId: this.state.selectedProgram.id,
                        };
                        console.log("222222222222222222222222222");
                    } else if (this.state.selectedType === 'Lecturer') {
                        userProfile = {
                            UserName: this.state.fullName,
                            ProgramId: this.state.selectedProgram.id,
                            DepartmentId: this.state.selectedDepartment.id,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                        console.log("333333333333333333333333333333333333");
                    } else if (this.state.selectedType === 'Other') {
                        userProfile = {
                            UserName: this.state.fullName,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                        console.log("4444444444444444444");
                    }

                    console.log("userProfile >> ", userProfile);

                    let uId = 0;
                    fetch('http://localhost:5000/userProfile/', {
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
                    console.log("this.state.userId : >>>", this.state.userId)
                    console.log("this.state.userId : >>>", this.state.userId.id)

                    const message = 'The user profile has been successfully created';
                    const title = 'Success';
                    this.toggleDialog(message, title);

                    // this.onClickCancel();


                    // saveUser(userProfile)
                    //     .then(res => {
                    //         console.log("GGGGGGGGGGGGGGGGGGGGGGGGG");
                    //         this.toggleDialog(`The user is successfully created`, 'Success');
                    //         this.setState({});
                    //     })
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

    redirectToUserSearch = () => {
        this.setState({
            redirectToUserSearch: true
        });
    }

    onClickCancel = event => {
        this.setState({
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,
            selectedType: ""
        })
    };

    // readURL = event => {
    //     var image = document.getElementById('imageUpload');
    //     image.src = URL.createObjectURL(event.target.files[0]);
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
    // };



    render(){
        var {items} = this.state;

        if (this.state.redirectToUserSearch === true) {
            return <Redirect to="/userProfile"/>;
        }
        return (

            <div className="container-fluid">

                <UserImageSection className="mb-4" headerTitle=" "/>

                {/*mt = margin top mb = margin buttom*/}
                <div className="main-heading mt-10 mb-4"><b> ISHANI HERATH </b></div>

                <div className="row mt-4">
                    <div className="col-md-3">

                        <div className="row ml-5 mt-2 mb-4">
                            <div className="img-avatar">
                                <Avatar className="main-dp-large">
                                    <img src={avatar} alt="Avatar" width="100" height="100" border-radius="50%"
                                         className="main-dp-large"/>
                                </Avatar>
                            </div>
                        </div>
                        <div className="row ml-5">

                            {/*<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.readURL}/>*/}
                            {/*<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.readURL}>*/}
                            {/*<PublishRoundedIcon/>*/}
                            {/*</input>*/}
                            {/*<label htmlFor="imageUpload"></label>*/}
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
                                        <Input
                                            placeholder="Full Name"
                                            value={this.state.fullName}
                                            name="FirstName"
                                            onChange={this.handleOnChange}
                                            required={true}

                                        />
                                        <br/>
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
                                            <label htmlFor="" className="mandatory">Reg Number: </label>
                                        </div>
                                        <div className="col-md-7">
                                            <Input className="mandatory"
                                                   placeholder="Register Number"
                                                   value={this.state.regNumber}
                                                   name="regNumber"
                                                   required={true}
                                                   onChange={this.handleOnChange}
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
                                            <label htmlFor="" className="mandatory">Department : </label>
                                        </div>

                                        <div className="col-md-7">
                                            <ComboBox
                                                data={this.state.AllDepartments}
                                                textField="name"
                                                dataItemKey="id"
                                                value={this.state.selectedDepartment}
                                                onChange={this.handleOnChangeCombo}
                                                name="selectedDepartment"
                                                placeholder="Please Select"
                                                filterable={true}
                                                // onFilterChange={this.filterChangeCombo}
                                                //       popupSettings={this.popupSet}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(this.state.selectedType === "Student") && (
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <label htmlFor="" className="mandatory">Program:</label>
                                        </div>
                                        <div className="col-md-7" id="statusToolTip">
                                            <ComboBox
                                                data={this.state.AllPrograms}
                                                textField="name"
                                                dataItemKey="id"
                                                value={this.state.selectedProgram}
                                                onChange={this.handleOnChangeCombo}
                                                name="selectedProgram"
                                                placeholder="Please Select"
                                                filterable={true}
                                                // onFilterChange={this.filterChangeCombo}
                                                //       popupSettings={this.popupSet}
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
                                            <ComboBox
                                                data={this.state.AllPrograms}
                                                textField="name"
                                                dataItemKey="id"
                                                value={this.state.selectedProgram}
                                                onChange={this.handleOnChangeCombo}
                                                name="selectedProgram"
                                                placeholder="Please Select"
                                                filterable={true}
                                                // onFilterChange={this.filterChangeCombo}
                                                //       popupSettings={this.popupSet}
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
                                        <Label htmlFor="" className="mandatory">Email:</Label>
                                    </div>
                                    <div className="col-md-7" id="statusToolTip">
                                        <Input className="mandatory"
                                               placeholder="example@gmail.com"
                                               value={this.state.email}
                                               name="Email"
                                               required={true}
                                               onChange={this.handleOnChange}
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
                                        primary={true}
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
                        </div>
                    </div>
                </div>

                <div className="main-seperator"/>

                <div className="main-heading">My Courses</div>
                <div className="row">
                    <Fragment>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Fragment>
                </div>

                <div>
                    {this.state.visible === true && (
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
                                            : this.redirectToUserSearch
                                    }>
                                    OK
                                </button>
                            </DialogActionsBar>
                        </Dialog>
                    )}

                    {/*{this.state.visible === true && (*/}
                    {/*    <div>*/}
                    {/*        <Collapse in={this.state.open}>*/}
                    {/*            < Alert severity="success"*/}
                    {/*                action={*/}
                    {/*                    <IconButton*/}
                    {/*                        aria-label="close"*/}
                    {/*                        color="inherit"*/}
                    {/*                        size="small"*/}
                    {/*                        onClick={() => {*/}
                    {/*                            this.state.setOpen = false;*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        <CloseIcon fontSize="inherit"/>*/}
                    {/*                    </IconButton>*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                */}
                    {/*                /!*<AlertTitle>Success</AlertTitle>*!/*/}
                    {/*                /!*This is a success alert — <strong>check it out!</strong>*!/*/}
                    {/*            </Alert>*/}
                    {/*        </Collapse>*/}
                    {/*        <Button*/}
                    {/*            disabled={this.state.open}*/}
                    {/*            variant="outlined"*/}
                    {/*            onClick={() => {*/}
                    {/*                this.state.setOpen = false;*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            Re-open*/}
                    {/*        </Button>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        )
    }
}

export default UserProfile;
