import React, {Component} from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {EmojiEvents, ExpandLess, ExpandMore, NotificationImportant} from "@material-ui/icons";
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {ComboBox} from "@progress/kendo-react-dropdowns";

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,
            courseList: [],
            selectedCourse: [],

            //Tab selected
            selected: 0,

            //drop down selected data
            selectedType: null,

            //drop down data
            types: ['Student', 'Lecturer', 'Other'],

            // other
            ListItemOpen_01: false,
            ListItemOpen_02: false,
            setOpen: false,
            setDialogOpen: false,
            open: false,
            visible: false,
        };
        this.toggleDialog = this.toggleDialog.bind(this);

    }

    componentDidMount(): void {
        this.populateCourseByProgramId();
    }

    populateCourseByProgramId = () => {
        fetch('http://localhost:5000/courses/getCoursesByProgram')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    courseList: json
                })
            });
    };

    handleClick = () => {
        this.setState({
            ListItemOpen_01: !this.state.ListItemOpen_01
        });
        this.forceUpdate();
    };

    handleClickOpen = () => {
        console.log("setDialogOpen", this.state.setDialogOpen);
        this.state.setDialogOpen = true;
    };

    handleOnChangeCombo = (event) => {
        const valueObj = event.value;
        const field = event.target.name;

        if (field === 'selectedCourse' && valueObj) {
            this.setState({
                selectedCourse: valueObj
            })
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        var userCourseList = [];

        if (this.state.selectedCourse) {
            userCourseList = {
                CourseId: this.state.selectedCourse.id,
                UserId: 90, //TODO
                CourseStatus: 1,
            }
        }
        console.log('userCourseList : ', userCourseList);

        fetch('http://localhost:5000/courses/updateUserCourseStatus', {
            method: 'PUT',
            body: JSON.stringify(userCourseList),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log("result : >> ", result);
                this.toggleDialog('You have successfully requested to add the course ' + '"' + this.state.selectedCourse.name + '"', 'Success');
                this.setState({
                    selectedCourse: []
                })
            })
            .catch(error => {
                console.error('Error:', error);
            })

    };

    // handleClose = () => {
    //     this.state.visible = false;
    // };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };

    render() {
        return (
            <div className='course-main'>
                <div className="main-heading mt-4 mb-4"><b> COURSE DETAILS </b></div>

                <div className="row">
                    <div className="col-md-3">
                        <div className=" course-navigation">
                            <h6>My Course List</h6>
                            <ul>
                                <li><a href=""> EEI6560-Software Project Management </a></li>
                                <li><a href=""> EEI6565-Artificial Intelligent Technology </a></li>
                                <li><a href=""> EEI6567-Software Architecture and design </a></li>
                            </ul>
                        </div>
                        <div className=" course-navigation">
                            <h6>Add Courses</h6>
                            <div className="col">
                                <label>Course :</label>
                            </div>
                            <ComboBox className='ml-3'
                                textField="name"
                                dataItemKey="id"
                                data={this.state.courseList}
                                value={this.state.selectedCourse}
                                onChange={this.handleOnChangeCombo}
                                name="selectedCourse"
                                placeholder="Please Select"
                            />
                            <MuiThemeProvider className = 'ml-3'>
                                <React.Fragment>
                                    <RaisedButton
                                        className={"rbtn-primary"}
                                        primary={true}
                                        variant="contained"
                                        onClick={this.handleSubmit}
                                    >Add Course</RaisedButton>
                                </React.Fragment>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <h6> EEX6598-Software Construction </h6>
                            <p> Hello and welcome to the course!
                                You have logged into the course on EEI6567 - Software Architecture and Design of the
                                Bachelor of Software Engineering. This course comprises of System software and different
                                areas of operating system management such as Processor management, Memory Management,
                                Device
                                management, File management, Network organization and System management.

                                In this course students will learn how to analyze and design large scale software
                                systems
                                and apply different architecture styles to software design, identify and define quality
                                attributes for a software system, address functional and non-functional requirements in
                                the
                                architecture and measure architecturally significant quality attributes and metrics.

                                This course is comprised of 10 units namely, </p>

                        </div>

                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            // subheader={
                            //     <ListSubheader component="div" id="nested-list-subheader">
                            //         Nested List Items
                            //     </ListSubheader>
                            // }
                            // className={this.styles.root}
                        >

                            <ListItem button onClick={this.toggleDialog}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <NotificationImportant/>
                                    </Avatar>
                                </ListItemAvatar>
                                <a href="Announcements" id="title_1">Announcements</a>
                            </ListItem>

                            <ListItem button onClick={this.handleClickOpen}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Day Schools"/>
                            </ListItem>

                            <ListItem button onClick={this.handleClickOpen}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Assignments"/>
                            </ListItem>

                            <ListItem button onClick={this.handleClick}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmojiEvents/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Marks"/>
                                {this.state.ListItemOpen_01 === true ? <ExpandMore/> : <ExpandLess/>}
                            </ListItem>

                            <Collapse in={this.state.ListItemOpen_01} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className='styles-nested'>
                                        <ListItemIcon>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="CAT Marks"/>
                                    </ListItem>
                                    <ListItem button className='styles-nested'>
                                        <ListItemIcon>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="TMA Marks"/>
                                    </ListItem>
                                    <ListItem button className='styles-nested'>
                                        <ListItemIcon>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Mini Project Marks"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
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
                                        : this.toggleDialog
                                }>
                                OK
                            </button>
                        </DialogActionsBar>
                    </Dialog>
                )}




                {/*{this.state.visible && (*/}
                {/*    <Dialog fullScreen open={this.state.open} onClose={this.toggleDialog}>*/}
                {/*        <AppBar className="appBar-dialog">*/}
                {/*            <Toolbar>*/}
                {/*                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">*/}
                {/*                    <CloseIcon/>*/}
                {/*                </IconButton>*/}
                {/*                <Typography variant="h6">*/}
                {/*                    Announcements*/}
                {/*                    <NotificationImportant/>*/}
                {/*                </Typography>*/}
                {/*                <Button autoFocus color="inherit" className="toolbar-button" onClick={this.handleClose}>*/}
                {/*                    save*/}
                {/*                </Button>*/}
                {/*            </Toolbar>*/}
                {/*        </AppBar>*/}

                {/*        <List>*/}
                {/*            <ListItem button>*/}
                {/*                <ListItemText primary="Phone ringtone" secondary="Titania"/>*/}
                {/*            </ListItem>*/}
                {/*            <Divider/>*/}
                {/*            <ListItem button>*/}
                {/*                <ListItemText primary="Default notification ringtone" secondary="Tethys"/>*/}
                {/*            </ListItem>*/}
                {/*        </List>*/}
                {/*    </Dialog>*/}
                {/*)}*/}
            </div>
        );
    }
}

export default Course;
