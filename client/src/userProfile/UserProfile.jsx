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
import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import AlarmIcon from '@material-ui/icons/Alarm';
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

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
            userDetails: [],
            userId: this.props.id,
            status: this.props.status,

            // passToCourse: {
            //     courseList: [],
            //     ProgramId: 0,
            // },

            //drop down selected data
            selectedType: null,
            selectedProgram: null,
            selectedDepartment: null,

            //drop down data
            types: ['Student', 'Lecturer', 'Other'],
            AllPrograms: [],
            courses: [],
            AllDepartments: [],
            AllTypes: [],
            // isLoaded: false,

            toBeDueAssignments: [],
            overdueAssignments:[],

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
        this.populateCoursesList();
        this.populatePrograms();
        this.populateDepartments();
        this.populateUserType();
        this.populateUserDetails();
        this.populateDashboard();
    }

    populateUserDetails() {
        var UserData = [];
        var id = this.state.userId;

        fetch('http://localhost:5000/userProfile/' + id)
            .then(res => res.json())
            .then(respond => {
                respond.forEach(function (userData) {
                    UserData = {
                        Name: userData.username,
                        Email: userData.email,
                        Program: {
                            id: userData.programid,
                            name: userData.progname
                        },
                        Type: {
                            typeid: userData.typeid,
                            name: userData.typename,
                        },
                        RegNumber: userData.regnumber,
                    }
                });
                this.setState({
                    fullName: UserData.Name,
                    email: UserData.Email,
                    typeId: UserData.Type.typeid,
                    selectedType: UserData.Type,
                    selectedProgram: UserData.Program,
                    regNumber: UserData.RegNumber,
                })
            })
    }

    populateDashboard() {
        var toBeDueAssignment = [];
        var overdueAssignment = [];
        var OverdueAssignments = [];
        const ToBeDueAssignments = [];
        var id = this.state.userId;
        var currentDate = moment().format("DD-MM-YYYY hh:mm:ss");

        fetch('http://localhost:5000/userProfile/' + id + '/getAssignments')
            .then(res => res.json())
            .then(respond => {
                respond.forEach(function (datewant) {
                    let dueDateObject = new Date(datewant.duedatetime);
                    let currentDateObj = new Date(Date.now());

                    // console.log("dueDateObject obj : ", dueDateObject);

                    // var dueAfter30 = dueDateObject.setDate(dueDateObject.getDate() + 31);
                    var dueAfter30 = dueDateObject.getDate() + 31;
                    var dueBefore30 = dueDateObject.getDate() - 31;
                    // var dueBefore30 = dueDateObject.setDate(dueDateObject.getDate() - 10);
                    let dueBefore30Obj = new Date(dueBefore30);
                    let dueAfter30Obj = new Date(dueAfter30);

                    // console.log("dueDateObject : ", dueDateObject);
                    // console.log("dueAfter30 : ", dueAfter30);
                    // console.log("dueBefore30 : ", dueBefore30);

                    // var dueAfter30_ = moment(dueAfter30).format('DD-MM-YYYY h:mm:ss');
                    var dueAfter30_ = moment(dueDateObject.getDate() + 31).format('DD-MM-YYYY h:mm:ss');
                    // var dueBefore30_ = moment(dueBefore30).format('DD-MM-YYYY h:mm:ss');
                    var dueBefore30_ = moment(dueDateObject.getDate() - 31).format('DD-MM-YYYY h:mm:ss');
                    var currentDate = moment(Date.now()).format('DD-MM-YYYY h:mm:ss');
                    // console.log("dueAfter30_ : ", dueAfter30_);
                    // console.log("dueBefore30_ : ", dueBefore30_);
                    // console.log("currentDate : ", currentDate);
                    // console.log("dueDateObject : ", dueDateObject);

                    if (dueDateObject.getTime() < currentDateObj.getTime() && dueDateObject.getTime() > dueBefore30Obj.getTime()) {
                        // console.log("current date max ?? overdueAssignment");
                        overdueAssignment = {
                            Title: datewant.title,
                            Date: moment(dueDateObject).format('DD-MM-YYYY h:mm:ss'),
                        };
                        OverdueAssignments.push(overdueAssignment);
                    } else if (dueDateObject.getTime() >= currentDateObj.getTime() && dueDateObject.getTime() < dueAfter30Obj.getTime()) {
                        // console.log("due date max ?? toBeDueAssignment");
                        toBeDueAssignment = {
                            Title: datewant.title,
                            Date: moment(dueDateObject).format('DD-MM-YYYY h:mm:ss'),
                        };
                        ToBeDueAssignments.push(toBeDueAssignment);
                    }
                    // console.log("ToBeDueAssignments : ", ToBeDueAssignments)
                    // console.log("OverdueAssignments : ", OverdueAssignments)
                });
                this.setState({
                    toBeDueAssignments: ToBeDueAssignments,
                    overdueAssignments: OverdueAssignments,
                })
            });
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
    }

    populateDepartments() {
        fetch('http://localhost:5000/userProfile/:id/getDepartments')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    AllDepartments: data
                });
            });
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

    populateCoursesList() {
        var id = this.state.userId;
        fetch('http://localhost:5000/userProfile/' + id + '/courseList')
            .then(res => res.json())
            .then(json => {
                // console.log("courses: ", json);
                this.setState({
                    courses: json,
                });
                this.props.parentCallBackCourseList(json);
            });
        // console.log("this.state.courses : ",this.state.courses)
        // this.props.parentCallBackCourseList(this.state.courses);
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
                            UserId: this.state.userId,
                            UserName: this.state.fullName,
                            Email: this.state.email,
                            Type: this.state.typeId,
                            regNumber: this.state.regNumber,
                            ProgramId: this.state.selectedProgram.id,
                        };
                    } else if (this.state.selectedType.name === 'Lecturer') {
                        userProfile = {
                            UserId: this.state.userId,
                            UserName: this.state.fullName,
                            ProgramId: this.state.selectedProgram.id,
                            DepartmentId: this.state.selectedDepartment.id,
                            Type: this.state.typeId,
                            Email: this.state.email,
                        };
                    } else if (this.state.selectedType.name === 'Other') {
                        userProfile = {
                            UserId: this.state.userId,
                            UserName: this.state.fullName,
                            Type: this.state.typeId,
                            Email: this.state.email,
                            // ProgramId: null,
                        };
                    }
                    // console.log("userProfile : ", userProfile);
                    fetch('http://localhost:5000/userProfile/:id', {
                        method: 'PUT',
                        body: JSON.stringify(userProfile),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            // console.log("data :", data);
                            this.toggleDialog('The user profile has been successfully updated', 'Success');
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
        // this.onClickCancel();
    };

    redirectToUserSearch = () => {
        this.setState({
            redirectToUserSearch: true
        });
    };

    //TODO
    handleLinkClick = (e) => {
        this.state.selected = 1;
        // e.preventDefault();
    };

    onClickCancel = event => {
        //Modify this as reset to previous values
        this.setState({
            fullName: "",
            email: "",
        })
    };

    render() {
        var {courses, dashboard, } = this.state;

        if (this.state.redirectToUserSearch === true) {
            return <Redirect to="/"/>;
        }

        if (this.state.redirectToAdminPage === true) {
            return <Redirect to='/admin'/>;
        }

        return (
            <div className="container-fluid">
                {/*{console.log("overdueAssignments >> : ", this.state.overdueAssignments)}*/}
                {/*{console.log("toBeDueAssignments >> : ", this.state.toBeDueAssignments)}*/}

                <UserImageSection
                    className="mb-4" headerTitle=" "
                    id={this.state.userId}
                />

                {/*mt = margin top mb = margin buttom*/}
                <br/> <br/>
                <div className="main-heading mt-10 mb-4"><b> {(this.state.fullName).toUpperCase()} </b></div>

                <div className="row">

                    <div className="col">
                        <div className="col sub-card">
                            <div className="col-md-12">

                                <div className="main-heading"><b> Personal Details </b></div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
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
                                                required={true}
                                                disabled={true}
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
                                                       disabled={true}
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
                                                    disabled={true}
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

                        {(this.state.status === 2 && this.state.selectedType && (this.state.selectedType.typeid === 1 || this.state.selectedType.typeid === 2)) && (
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
                                                {courses.map((item) => (
                                                    <tr key={item.id}>
                                                        <td> {item.code} </td>
                                                        <td><a href="#" onClick={this.handleLinkClick}>
                                                            {item.name} </a></td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </Fragment>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {(this.state.status === 2 && this.state.selectedType && (this.state.selectedType.typeid === 1 || this.state.selectedType.typeid === 2)) && (
                        <div className="col">
                            <div className="col sub-card">
                                <div className="col-md-12">
                                    <div className="main-heading"><b> Dashboard </b></div>
                                    <div className="dashboard-heading"><b> Recently overdue </b></div>

                                    {this.state.overdueAssignments.map((item) => (
                                        <div className="col small-card">
                                            <div>
                                                <h6><AlarmIcon/>
                                                    <a href="#" onClick={this.handleLinkClick}>
                                                        {item.Title} &nbsp; &nbsp;
                                                        {item.Date}
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="dashboard-heading"><b> Next 30 days </b></div>
                                    {/*{this.state.toBeDueAssignments.map((item) => (*/}
                                        <div className="col small-card">
                                            <div>
                                                <h6><AlarmIcon/>
                                                    <a href="#" onClick={this.handleLinkClick}>
                                                        {/*{item.Title} &nbsp; &nbsp;*/}
                                                        {/*{item.Date}*/}
                                                        2020-07-30 04:22:00
                                                        {/*{"2020-07-30 04:22:00"}*/}

                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    {/*))}*/}

                                    <div className="dashboard-heading"><b> Future </b></div>

                                </div>
                            </div>
                        </div>
                    )}
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
