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
import AlarmIcon from '@material-ui/icons/Alarm';
import moment from "moment";

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            department: "",
            email: "",
            typeId: this.props.typeId,
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

            //To catch the selected tab
            selected: 0,

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
        this.populateUserDetails();
        this.populateCoursesList();
        this.populatePrograms();
        this.populateDepartments();
        this.populateUserType();
        this.populateDashboard();
    }

    populateUserDetails() {
        var UserData = [];
        var id = this.state.userId;
        var typeId = this.state.typeId;

        //Other Users
        if(typeId ===3){
            fetch('http://localhost:5000/userProfile/otherUser/' + id)
                .then(res => res.json())
                .then(respond => {
                    respond.forEach(function (userData) {
                        UserData = {
                            Name: userData.username,
                            Email: userData.email,
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
                        regNumber: UserData.RegNumber,
                    })
                })
        } else {
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
    }

    populateDashboard = async () => {
        var toBeDueAssignment = [];
        var overdueAssignment = [];
        var OverdueAssignments = [];
        const ToBeDueAssignments = [];
        var id = this.state.userId;

        await fetch('http://localhost:5000/userProfile/' + id + '/getAssignments')
            .then(res => res.json())
            .then(respond => {

                respond.forEach(function (assignmentData) {

                    //Filter only not submitted assignments
                    if(assignmentData.issubmitted === false){

                        // Already overdue Assignmets
                        let dueDateObject = new Date(assignmentData.duedatetime);
                        let currentDateObj = new Date(Date.now());

                        //Date After 31 days for dueDate
                        var dueAfter30 = dueDateObject.getDate() + 31;
                        let dueAfter30Obj = new Date(dueAfter30);

                        //Date After 31 days for dueDate
                        var dueBefore30 = dueDateObject.getDate() - 31;
                        let dueBefore30Obj = new Date(dueBefore30);

                        // var dueAfter30_ = moment(dueDateObject.getDate() + 31).format('DD-MM-YYYY h:mm:ss');
                        // var dueBefore30_ = moment(dueBefore30).format('DD-MM-YYYY h:mm:ss');
                        // var dueBefore30_ = moment(dueDateObject.getDate() - 31).format('DD-MM-YYYY h:mm:ss');
                        // var currentDate = moment(Date.now()).format('DD-MM-YYYY h:mm:ss');

                        //TODO
                        // error in 'dueBefore30Obj'

                        //Recently overdue
                        if (dueDateObject.getTime() < currentDateObj.getTime())
                        {
                            //TODO Erro in substracting 30 days
                            // && dueDateObject.getTime() > dueBefore30Obj.getTime()) {

                            overdueAssignment = {
                                Title: assignmentData.title,
                                Code: assignmentData.code,
                                Date: moment(dueDateObject).format('DD-MM-YYYY h:mm:ss'),
                            };
                            OverdueAssignments.push(overdueAssignment);
                        }

                        //Next 30 days
                        else if (dueDateObject.getTime() >= currentDateObj.getTime()  ) {

                            //TODO Error in adding 30 days
                            // && dueDateObject.getTime() < dueAfter30Obj.getTime()) {

                            toBeDueAssignment = {
                                Title: assignmentData.title,
                                Code: assignmentData.code,
                                Date: moment(dueDateObject).format('DD-MM-YYYY h:mm:ss'),
                            };
                            ToBeDueAssignments.push(toBeDueAssignment);
                        }
                        //    TODO future (after 30 days)
                    }
                });
                this.setState({
                    toBeDueAssignments: ToBeDueAssignments,
                    overdueAssignments: OverdueAssignments,
                })
            });
    };

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
                this.setState({
                    courses: json,
                });
                this.props.parentCallBackCourseList(json);
            });
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
                    fetch('http://localhost:5000/userProfile/:id', {
                        method: 'PUT',
                        body: JSON.stringify(userProfile),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
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

    handleLinkClick = (e) => {
        this.setState({
            selected: 1
        });
        this.props.parentCallBackSelectedTab(this.state.selected);
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
                                <div className="row personal-data-field">
                                    <label htmlFor="" className="mandatory">
                                        Name :
                                    </label>
                                    <Input className="ml-3"
                                           placeholder="Full Name"
                                           value={this.state.fullName}
                                           name="FirstName"
                                           onChange={this.handleOnChange}
                                           required={true}
                                    />
                                </div>

                                <div className="row personal-data-field">
                                    <label className="mandatory">Type :</label>

                                    <ComboBox
                                        className="ml-3"
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

                                {(this.state.selectedType && this.state.selectedType.name === "Student") && (
                                    <div className="row personal-data-field">
                                        <label htmlFor="" className="mandatory">Reg No :</label>

                                        <Input className="ml-3 mandatory"
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
                                )}

                                {(this.state.selectedType && this.state.selectedType.name === "Lecturer") && (
                                    <div className="row personal-data-field">
                                        <label htmlFor="" className="mandatory">Department : </label>

                                        <ComboBox
                                            className="ml-3"
                                            data={this.state.AllDepartments}
                                            textField="name"
                                            dataItemKey="id"
                                            value={this.state.selectedDepartment}
                                            onChange={this.handleOnChangeCombo}
                                            name="selectedDepartment"
                                            placeholder="Please Select"
                                            filterable={true}
                                            required={true}
                                        />
                                    </div>
                                )}

                                {(this.state.selectedType && this.state.selectedType.name === "Student") && (
                                    <div className="row personal-data-field">
                                        <label htmlFor="" className="mandatory">Program :</label>
                                        <ComboBox
                                            className="ml-3"
                                            data={this.state.AllPrograms}
                                            textField="name"
                                            dataItemKey="id"
                                            value={this.state.selectedProgram}
                                            onChange={this.handleOnChangeCombo}
                                            name="selectedProgram"
                                            placeholder="Please Select"
                                            disabled={true}
                                            required={true}
                                        />
                                    </div>
                                )}
                                {(this.state.selectedType && this.state.selectedType.name === "Lecturer") && (
                                    <div className="row personal-data-field">
                                        <label htmlFor="" className="mandatory">Program :</label>
                                        <ComboBox
                                            className="ml-3"
                                            data={this.state.AllPrograms}
                                            textField="name"
                                            dataItemKey="id"
                                            value={this.state.selectedProgram}
                                            onChange={this.handleOnChangeCombo}
                                            name="selectedProgram"
                                            placeholder="Please Select"
                                            filterable={true}
                                            required={true}
                                        />
                                    </div>
                                )}

                                <div className="row personal-data-field">
                                    <Label htmlFor="" className="mandatory">Email :</Label>
                                    <div id="statusToolTip">
                                        <Input className="ml-3 mandatory"
                                               placeholder="example@gmail.com"
                                               value={this.state.email}
                                               name="Email"
                                               required={true}
                                               onChange={this.handleOnChange}
                                        />
                                    </div>
                                </div>

                                <div className="row personal-data-field">
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
                                                        <td className="link-format">
                                                            <a onClick={this.handleLinkClick}>
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
                                                <h6 className="link-format" ><AlarmIcon/>
                                                    <a onClick={this.handleLinkClick}>
                                                        {item.Code}: &nbsp;
                                                        {item.Title} &nbsp;
                                                        {item.Date}
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="dashboard-heading"><b> Future </b></div>
                                    {this.state.toBeDueAssignments.map((item) => (
                                        <div className="col small-card">
                                            <div>
                                                <h6 className="link-format" ><AlarmIcon/>
                                                    <a onClick={this.handleLinkClick}>
                                                        {item.Code}: &nbsp;
                                                        {item.Title} &nbsp;
                                                        {item.Date}
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    ))}

                                    {/*<div className="dashboard-heading"><b> Future </b></div>*/}
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
