import React, {Component, Fragment} from 'react';
import {ComboBox} from '@progress/kendo-react-dropdowns';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Input from "@material-ui/core/Input";
import {Label} from '@progress/kendo-react-labels';
import Redirect from "react-router-dom/Redirect";
import UserImageSection from "../userProfile/UserImageSection";

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            department: "",
            email: "",
            typeId: 0,
            regNumber: "",
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
                    } else if (this.state.selectedType === 'Lecturer') {
                        userProfile = {
                            UserName: this.state.fullName,
                            ProgramId: this.state.selectedProgram.id,
                            DepartmentId: this.state.selectedDepartment.id,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                    } else if (this.state.selectedType === 'Other') {
                        userProfile = {
                            UserName: this.state.fullName,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                    }

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

                    const message = 'The user profile has been successfully created';
                    const title = 'Success';
                    this.toggleDialog(message, title);

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
    };

    onClickCancel = event => {
        //Modify this as reset to previous values
        this.setState({
            fullName: "",
            program: "",
            email: "",
            regNumber: "",
            selectedType: ""
        })
    };


    render() {
        var {items} = this.state;

        if (this.state.redirectToUserSearch === true) {
            return <Redirect to="/userProfile"/>;
        }
        return (
            <div className="container-fluid">
                <UserImageSection className="mb-4" headerTitle=" "/>

                {/*mt = margin top mb = margin buttom*/}
                <br/> <br/>
                <div className="main-heading mt-10 mb-4"><b> ISHANI HERATH </b></div>

                <div className="row">

                    <div className="col">
                        <div className="col sub-card">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            {/*   <div className="col-md-6">*/}
                                            <label htmlFor="" className="mandatory">
                                                Name:
                                            </label>
                                            {/*</div>*/}

                                            {/*<div className="col-md-6">*/}
                                            <Input
                                                placeholder="Full Name"
                                                value={this.state.fullName}
                                                name="FirstName"
                                                onChange={this.handleOnChange}
                                                required={true}
                                            />
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            {/*<div className="col-md-5">*/}
                                            <label className="mandatory">Type:</label>
                                            {/*</div>*/}
                                            {/*<div className="col-md-7">*/}
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
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {(this.state.selectedType === "Student") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                {/*<div className="col-md-5">*/}
                                                <label htmlFor="" className="mandatory">Reg No:</label>
                                                {/*</div>*/}
                                                {/*<div className="col-md-7">*/}
                                                <Input className="mandatory"
                                                       placeholder="Register Number"
                                                       value={this.state.regNumber}
                                                       name="regNumber"
                                                       required={true}
                                                       onChange={this.handleOnChange}
                                                    // type="Numeric"
                                                    // maxLength= '9'
                                                />
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    )}

                                    {(this.state.selectedType === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                {/*<div className="col-md-5">*/}
                                                <label htmlFor="" className="mandatory">Department : </label>
                                                {/*</div>*/}

                                                {/*<div className="col-md-7">*/}
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
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    )}

                                    {(this.state.selectedType === "Student") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                {/*<div className="col-md-5">*/}
                                                <label htmlFor="" className="mandatory">Program:</label>
                                                {/*</div>*/}
                                                {/*<div className="col-md-7" id="statusToolTip">*/}
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
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    )}
                                    {(this.state.selectedType === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                {/*<div className="col-md-5">*/}
                                                <label htmlFor="" className="mandatory">Program:</label>
                                                {/*</div>*/}
                                                {/*<div className="col-md-7" id="statusToolTip">*/}
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
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="row">
                                            {/*<div className="col-md-5">*/}
                                            <Label htmlFor="" className="mandatory">Email:</Label>
                                            {/*</div>*/}
                                            <div id="statusToolTip">
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
                                    <div className="btn-align-right">
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
                                                >RESET</RaisedButton>
                                            </React.Fragment>
                                        </MuiThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col sub-card">
                            <div className="col-md-12">
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
                            </div>

                        </div>
                    </div>

                    {/*Post Section here*/}
                    <div className="col">
                        <div className="col sub-card">
                            <div className="col-md-12">
                                <h1> this is post area </h1>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="row">
                    {/*<div className="col-md-12">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="sub-card">*/}
                    {/*            <div className="col-md-12">*/}

                    {/*                <div className="row">*/}
                    {/*                    <div className="col-md-6">*/}
                    {/*                        <div className="row">*/}
                    {/*                            /!*   <div className="col-md-6">*!/*/}
                    {/*                            <label htmlFor="" className="mandatory">*/}
                    {/*                                Name:*/}
                    {/*                            </label>*/}
                    {/*                            /!*</div>*!/*/}

                    {/*                            /!*<div className="col-md-6">*!/*/}
                    {/*                            <Input*/}
                    {/*                                placeholder="Full Name"*/}
                    {/*                                value={this.state.fullName}*/}
                    {/*                                name="FirstName"*/}
                    {/*                                onChange={this.handleOnChange}*/}
                    {/*                                required={true}*/}
                    {/*                            />*/}
                    {/*                            /!*</div>*!/*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                    <div className="col-md-6">*/}
                    {/*                        <div className="row">*/}
                    {/*                            /!*<div className="col-md-5">*!/*/}
                    {/*                            <label className="mandatory">Type:</label>*/}
                    {/*                            /!*</div>*!/*/}
                    {/*                            /!*<div className="col-md-7">*!/*/}
                    {/*                            <ComboBox*/}
                    {/*                                data={this.state.types}*/}
                    {/*                                value={this.state.selectedType}*/}
                    {/*                                onChange={this.handleOnChangeCombo}*/}
                    {/*                                name="selectedType"*/}
                    {/*                                placeholder="Please Select"*/}
                    {/*                                filterable={true}*/}
                    {/*                                // onFilterChange={this.filterChangeCombo}*/}
                    {/*                                //       popupSettings={this.popupSet}*/}
                    {/*                                required={true}*/}
                    {/*                            />*/}
                    {/*                            /!*</div>*!/*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}

                    {/*                <div className="row">*/}
                    {/*                    {(this.state.selectedType === "Student") && (*/}
                    {/*                        <div className="col-md-6">*/}
                    {/*                            <div className="row">*/}
                    {/*                                /!*<div className="col-md-5">*!/*/}
                    {/*                                <label htmlFor="" className="mandatory">Reg No:</label>*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                                /!*<div className="col-md-7">*!/*/}
                    {/*                                <Input className="mandatory"*/}
                    {/*                                       placeholder="Register Number"*/}
                    {/*                                       value={this.state.regNumber}*/}
                    {/*                                       name="regNumber"*/}
                    {/*                                       required={true}*/}
                    {/*                                       onChange={this.handleOnChange}*/}
                    {/*                                    // type="Numeric"*/}
                    {/*                                    // maxLength= '9'*/}
                    {/*                                />*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}

                    {/*                    {(this.state.selectedType === "Lecturer") && (*/}
                    {/*                        <div className="col-md-6">*/}
                    {/*                            <div className="row">*/}
                    {/*                                /!*<div className="col-md-5">*!/*/}
                    {/*                                <label htmlFor="" className="mandatory">Department : </label>*/}
                    {/*                                /!*</div>*!/*/}

                    {/*                                /!*<div className="col-md-7">*!/*/}
                    {/*                                <ComboBox*/}
                    {/*                                    data={this.state.AllDepartments}*/}
                    {/*                                    textField="name"*/}
                    {/*                                    dataItemKey="id"*/}
                    {/*                                    value={this.state.selectedDepartment}*/}
                    {/*                                    onChange={this.handleOnChangeCombo}*/}
                    {/*                                    name="selectedDepartment"*/}
                    {/*                                    placeholder="Please Select"*/}
                    {/*                                    filterable={true}*/}
                    {/*                                    // onFilterChange={this.filterChangeCombo}*/}
                    {/*                                    //       popupSettings={this.popupSet}*/}
                    {/*                                    required={true}*/}
                    {/*                                />*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}

                    {/*                    {(this.state.selectedType === "Student") && (*/}
                    {/*                        <div className="col-md-6">*/}
                    {/*                            <div className="row">*/}
                    {/*                                /!*<div className="col-md-5">*!/*/}
                    {/*                                <label htmlFor="" className="mandatory">Program:</label>*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                                /!*<div className="col-md-7" id="statusToolTip">*!/*/}
                    {/*                                <ComboBox*/}
                    {/*                                    data={this.state.AllPrograms}*/}
                    {/*                                    textField="name"*/}
                    {/*                                    dataItemKey="id"*/}
                    {/*                                    value={this.state.selectedProgram}*/}
                    {/*                                    onChange={this.handleOnChangeCombo}*/}
                    {/*                                    name="selectedProgram"*/}
                    {/*                                    placeholder="Please Select"*/}
                    {/*                                    filterable={true}*/}
                    {/*                                    // onFilterChange={this.filterChangeCombo}*/}
                    {/*                                    //       popupSettings={this.popupSet}*/}
                    {/*                                    required={true}*/}
                    {/*                                />*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}
                    {/*                    {(this.state.selectedType === "Lecturer") && (*/}
                    {/*                        <div className="col-md-6">*/}
                    {/*                            <div className="row">*/}
                    {/*                                /!*<div className="col-md-5">*!/*/}
                    {/*                                <label htmlFor="" className="mandatory">Program:</label>*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                                /!*<div className="col-md-7" id="statusToolTip">*!/*/}
                    {/*                                <ComboBox*/}
                    {/*                                    data={this.state.AllPrograms}*/}
                    {/*                                    textField="name"*/}
                    {/*                                    dataItemKey="id"*/}
                    {/*                                    value={this.state.selectedProgram}*/}
                    {/*                                    onChange={this.handleOnChangeCombo}*/}
                    {/*                                    name="selectedProgram"*/}
                    {/*                                    placeholder="Please Select"*/}
                    {/*                                    filterable={true}*/}
                    {/*                                    // onFilterChange={this.filterChangeCombo}*/}
                    {/*                                    //       popupSettings={this.popupSet}*/}
                    {/*                                    required={true}*/}
                    {/*                                />*/}
                    {/*                                /!*</div>*!/*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}
                    {/*                </div>*/}

                    {/*                <div className="row">*/}

                    {/*                    <div className="col-md-6">*/}
                    {/*                        <div className="row">*/}
                    {/*                            /!*<div className="col-md-5">*!/*/}
                    {/*                            <Label htmlFor="" className="mandatory">Email:</Label>*/}
                    {/*                            /!*</div>*!/*/}
                    {/*                            <div id="statusToolTip">*/}
                    {/*                                <Input className="mandatory"*/}
                    {/*                                       placeholder="example@gmail.com"*/}
                    {/*                                       value={this.state.email}*/}
                    {/*                                       name="Email"*/}
                    {/*                                       required={true}*/}
                    {/*                                       onChange={this.handleOnChange}*/}
                    {/*                                />*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}

                    {/*                <div className="row">*/}
                    {/*                    <div className="btn-align-right">*/}
                    {/*                        <MuiThemeProvider>*/}
                    {/*                            <React.Fragment>*/}
                    {/*                                <RaisedButton*/}
                    {/*                                    className={"rbtn-primary"}*/}
                    {/*                                    primary={true}*/}
                    {/*                                    variant="contained"*/}
                    {/*                                    onClick={this.handleSubmit}*/}
                    {/*                                >SAVE</RaisedButton>*/}

                    {/*                                <RaisedButton*/}
                    {/*                                    className={"rbtn-primary"}*/}
                    {/*                                    color="primary"*/}
                    {/*                                    variant="contained"*/}
                    {/*                                    onClick={this.onClickCancel}*/}
                    {/*                                >RESET</RaisedButton>*/}
                    {/*                            </React.Fragment>*/}
                    {/*                        </MuiThemeProvider>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*<div className="row">*/}
                    {/*    < div className="sub-card">*/}
                    {/*        <div className="col-md-12">*/}
                    {/*            <div className="main-heading">My Courses</div>*/}
                    {/*            <div className="row">*/}
                    {/*                <Fragment>*/}
                    {/*                    <table className="table table-striped">*/}
                    {/*                        <thead>*/}
                    {/*                        <tr>*/}
                    {/*                            <th>Course Code</th>*/}
                    {/*                            <th>Course Name</th>*/}
                    {/*                        </tr>*/}
                    {/*                        </thead>*/}
                    {/*                        <tbody>*/}
                    {/*                        {items.map(item => (*/}
                    {/*                            <tr>*/}
                    {/*                                <td>{item.code}</td>*/}
                    {/*                                <td>{item.name}</td>*/}
                    {/*                            </tr>*/}
                    {/*                        ))}*/}
                    {/*                        </tbody>*/}
                    {/*                    </table>*/}
                    {/*                </Fragment>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*</div>*/}


                    {/*<div className="col-md-12">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="sub-card">*/}
                    {/*            <div className="col-md-12">*/}
                    {/*                <h1> this is post area </h1>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*</div>*/}


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
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;
