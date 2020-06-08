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
            AllTypes: [],
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
        this.populateAllCourses();
        this.populatePrograms();
        this.populateDepartments();
        this.populateUserType();
    }

    populatePrograms() {
        fetch('http://localhost:5000/courses/getPrograms')
            .then(res => res.json())
            .then(data => {
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

    populateUserType() {
        fetch('http://localhost:5000/userProfile/getUserTypes')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    AllTypes: data
                });
            });
    }

    populateAllCourses() {
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
            if (this.isMount) {
                this.setState({
                    selectedProgram: valueObj
                })
            }
        }

        if (field === 'selectedType' && valueObj) {
            if (this.isMount) {
                this.setState({
                    selectedType: valueObj,
                    typeId: valueObj.typeid,
                });
            }
        }
    };

    handleOnChange = (event) => {
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

    handleSubmit = (event) => {
        //Do not refresh the page
        event.preventDefault();

        if (this.isMount) {
            this.setState(
                () => {
                    var userProfile = {};

                    if (this.state.selectedType.name === 'Student') {
                        userProfile = {
                            UserName: this.state.fullName,
                            Email: this.state.email,
                            Type: this.state.typeId,
                            regNumber: this.state.regNumber,
                            ProgramId: this.state.selectedProgram.id,
                        };
                    } else if (this.state.selectedType.name === 'Lecturer') {
                        userProfile = {
                            UserName: this.state.fullName,
                            ProgramId: this.state.selectedProgram.id,
                            DepartmentId: this.state.selectedDepartment.id,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                    } else if (this.state.selectedType.name === 'Other') {
                        userProfile = {
                            UserName: this.state.fullName,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                    }

                    console.log("userProfile : ", userProfile)
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
                            });
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
        // this.onClickCancel();
    };

    redirectToUserSearch = () => {
        this.setState({
            redirectToUserSearch: true
        });
    };

    //TODO
    handleLinkClick = (e) => {
        console.log("UUUUUUUUUUUUUUUUUUUu")
        this.state.selected = 1;
        // e.preventDefault();
    }

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
            return <Redirect to="/"/>;
        }

        if (this.state.redirectToAdminPage === true) {
            return <Redirect to='/admin'/>;
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

                                <div className="main-heading"><b> Personal Details </b></div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            {/*   <div className="col-md-6">*/}
                                            <label htmlFor="" className="mandatory">
                                                Name :
                                            </label>
                                            <Input
                                                placeholder="Full Name"
                                                value={this.state.fullName}
                                                name="FirstName"
                                                onChange={this.handleOnChange}
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <label className="mandatory">Type :</label>

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
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {(this.state.selectedType && this.state.selectedType.name === "Student") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label htmlFor="" className="mandatory">Reg No :</label>

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
                                    )}

                                    {(this.state.selectedType && this.state.selectedType.name === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label htmlFor="" className="mandatory">Department : </label>

                                                <ComboBox
                                                    data={this.state.AllDepartments}
                                                    textField="name"
                                                    dataItemKey="id"
                                                    value={this.state.selectedDepartment}
                                                    onChange={this.handleOnChangeCombo}
                                                    name="selectedDepartment"
                                                    placeholder="Please Select"
                                                    filterable={true}
                                                    //       popupSettings={this.popupSet}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {(this.state.selectedType && this.state.selectedType.name === "Student") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label htmlFor="" className="mandatory">Program :</label>
                                                <ComboBox
                                                    data={this.state.AllPrograms}
                                                    textField="name"
                                                    dataItemKey="id"
                                                    value={this.state.selectedProgram}
                                                    onChange={this.handleOnChangeCombo}
                                                    name="selectedProgram"
                                                    placeholder="Please Select"
                                                    filterable={true}
                                                    //       popupSettings={this.popupSet}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {(this.state.selectedType && this.state.selectedType.name === "Lecturer") && (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label htmlFor="" className="mandatory">Program :</label>
                                                <ComboBox
                                                    data={this.state.AllPrograms}
                                                    textField="name"
                                                    dataItemKey="id"
                                                    value={this.state.selectedProgram}
                                                    onChange={this.handleOnChangeCombo}
                                                    name="selectedProgram"
                                                    placeholder="Please Select"
                                                    filterable={true}
                                                    //       popupSettings={this.popupSet}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <Label htmlFor="" className="mandatory">Email :</Label>
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
                                <div className="main-heading"><b> My Courses </b></div>
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
                                                    <td> {item.code} </td>
                                                    <td><a href="#" onClick={this.handleLinkClick}>
                                                        {/*<a href="">*/}
                                                        {item.name} </a></td>
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
                                <div className="main-heading"><b> Dashboard </b></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
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
                                            this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status" || this.state.dialogTitle === "Success"
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
