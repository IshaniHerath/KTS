import React, {Component, Fragment} from 'react';
import TopBar from "../component/TopBar";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.id,
            userList: [],
            courseList: [],
        }
    }

    componentDidMount(): void {
        this.populateUserPendingRequest();
        this.populatePendingCourseRequest();
        // setInterval(this.getData, 5000); // runs every 5 seconds.
    }

    populateUserPendingRequest() {
        fetch('http://localhost:5000/admin/getPendingUserDetails')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    userList: json,
                });
            });
    }

    populatePendingCourseRequest() {
        fetch('http://localhost:5000/admin/getPendingCourseDetails')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    courseList: json,
                })
            })
    }

    updateUserStatus(userDetail) {
        fetch('http://localhost:5000/admin/updateUserStatus', {
            method: 'PUT',
            body: JSON.stringify(userDetail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                if (userDetail.NewStatusId === 2) {
                    this.toggleDialog(userDetail.Name + ': request type as ' + userDetail.Type + ' is successfully APPROVED!', 'Success');
                } else if (userDetail.NewStatusId === 3) {
                    this.toggleDialog(userDetail.Name + ': request type as ' + userDetail.Type + ' is successfully REJECTED!', 'Success');
                }
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    updateCourseStatus(courseDetail) {
        fetch('http://localhost:5000/admin/updateCourseStatus', {
            method: 'PUT',
            body: JSON.stringify(courseDetail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (courseDetail.NewStatusId === 2) {
                    this.toggleDialog('Course is successfully APPROVED!', 'Success');

                    // Course-Student Enrolement Integration
                    const CourseID  = courseDetail.cId;
                    const StudId    = courseDetail.uId;
                    const body_Inte = {CourseID, StudId}; 
                    fetch('http://ktrans-001-site1.etempurl.com/api/EventReporter/CourseStudentAdd/' , {
                        method: 'POST',
                        body: JSON.stringify(body_Inte),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    // END Course-Student Enrolement Integration

                } else if (courseDetail.NewStatusId === 3) {
                    this.toggleDialog('Course is successfully REJECTED!', 'Success');
                }
                console.log('Success:', result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handleCourseAccept = (event) => {
        event.preventDefault();
        var courseDetail = [];

        this.state.courseList.forEach(function (item, key) {
            if (parseInt(event.target.value) === key) {
                courseDetail = {
                    cId: item.cid,
                    uId: item.uid,
                    NewStatusId: 2
                }
            }
        });
        this.updateCourseStatus(courseDetail);
    };

    handleUserAccept = event => {
        event.preventDefault();
        var userDetail = [];

        this.state.userList.forEach(function (item, key) {
            //To check the row
            if (parseInt(event.target.value) === key) {
                userDetail = {
                    UserId: item.id,
                    NewStatusId: 2,
                    Name: item.name,
                    Type: item.typename
                };
            }
        });
        this.updateUserStatus(userDetail);
    };

    handleCourseReject = (event) => {
        event.preventDefault();
        var courseDetail = [];

        this.state.courseList.forEach(function (item, key) {
            if (parseInt(event.target.value) === key) {
                courseDetail = {
                    cId: item.cid,
                    uId: item.uid,
                    NewStatusId: 3
                };
            }
        });
        this.updateCourseStatus(courseDetail);
    };

    handleUserReject = event => {
        event.preventDefault();
        var userDetail = [];

        this.state.userList.forEach(function (item, key) {
            if (parseInt(event.target.value) === key) {
                userDetail = {
                    UserId: item.id,
                    NewStatusId: 3,
                    Type: item.typename,
                    Name: item.name,
                };
            }
        });
        this.updateUserStatus(userDetail);
    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };

    render() {
        var {userList} = this.state;
        var {courseList} = this.state;

        return (
            <div>
                <TopBar headerTitle=""
                        id={this.state.userId}
                />

                <div className="container-fluid">
                    <div className="main-card">
                        <div className="heading"> ADMIN</div>
                        <br/>

                        <div className="main-heading mt-3">User Type Requests</div>
                        <Fragment>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>User Type</th>
                                    <th>Register number</th>
                                    <th>User Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList.map((item, i) => (
                                        <tr>
                                            <td>{i}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.typename}</td>
                                            <td>{item.regnumber}</td>
                                            <td>{item.statusname}</td>
                                            <td>
                                                <button
                                                    className="mr-3  btn  btn-primary"
                                                    value={i}
                                                    onClick={this.handleUserAccept}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className={"btn btn-secondary"}
                                                    value={i}
                                                    onClick={this.handleUserReject}
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </Fragment>
                    </div>

                    <div className="main-card">
                        <div className="main-heading">Course Requests</div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th> User Name</th>
                                <th> Register Number</th>
                                <th> Program</th>
                                <th> Course Name</th>
                                <th> Course Code</th>
                                <th> Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courseList.map((item, i) => (
                                    <tr>
                                        <td> {item.username} </td>
                                        <td> {item.regnumber} </td>
                                        <td> {item.programname} </td>
                                        <td> {item.coursename} </td>
                                        <td> {item.code} </td>
                                        <td>
                                            <button
                                                className="mr-3  btn  btn-primary"
                                                value={i}
                                                onClick={this.handleCourseAccept}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className={"btn btn-secondary"}
                                                value={i}
                                                onClick={this.handleCourseReject}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}

                            </tbody>
                        </table>
                    </div>

                </div>

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
        );
    }
}

export default Admin;
