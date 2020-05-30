import React, {Component, Fragment} from 'react';
import TopBar from "../component/TopBar";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            id: 0,
        }
    }

    componentDidMount(): void {
        this.populatePendingRequest();
        // setInterval(this.getData, 5000); // runs every 5 seconds.
    }

    populatePendingRequest() {
        fetch('http://localhost:5000/admin/getPendingUserDetails')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    // isLoaded: true,
                    items: json,
                });
            });
    }

    updateStatus(userDetail) {
        fetch('http://localhost:5000/admin/updateStatus', {
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

    handleAccept = event => {
        event.preventDefault();
        var userDetail = [];

        this.state.items.forEach(function (item, key) {
            if (parseInt(event.target.value) === key) {
                userDetail = {
                    UserId: item.id,
                    NewStatusId: 2,
                    Name: item.name,
                    Type: item.typename
                };
            }
        });
        this.updateStatus(userDetail);
    };

    handleReject = event => {
        event.preventDefault();
        var userDetail = [];

        this.state.items.forEach(function (item, key) {
            if (parseInt(event.target.value) === key) {
                userDetail = {
                    UserId: item.id,
                    NewStatusId: 3,
                    Type: item.typename,
                    Name: item.name,
                };
            }
        });
        this.updateStatus(userDetail);
    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };

    render() {
        var {items} = this.state;
        return (
            <div>
                <TopBar headerTitle=""/>

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
                                {items.map((item, i) => (
                                        <tr>
                                            <td>{i}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.typename}</td>
                                            <td>{item.regnumber}</td>
                                            <td>{item.statusname}</td>
                                            <td>
                                                <button
                                                    className="mt-3 mr-3"
                                                    value={i}
                                                    onClick={this.handleAccept}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    value={i}
                                                    onClick={this.handleReject}
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

                    {/*TODO in Courses*/}
                    <div className="main-card">
                        <div className="main-heading">Course Requests</div>
                        Hi Admin
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
