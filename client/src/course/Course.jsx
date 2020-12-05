import React, {Component} from 'react';
import moment from "moment";

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
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {ComboBox} from "@progress/kendo-react-dropdowns";
import AddIcon from '@material-ui/icons/Add';
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import FilePreviewer, {FilePreviewerThumbnail} from 'react-file-previewer';

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.id,
            userType: 0,
            email: "",
            fullName: "",
            ProgramId: 0,
            ProgramName: "",
            courseList: this.props.courseList,
            status: this.props.status,

            courseId: 0,
            heading: "",
            description: "",

            //Announcement
            announcement: "",
            title: "",
            AnnouncementList: [],

            //Assignment
            assTitle: "",
            assignmentDueDate: "",
            AssignmentList: [],

            //DaySchool
            dsName: "",
            DayshoolSelectedDate: "",
            // selectedTime: "",
            selectedFromTime: "",
            selectedToTime: "",

            allCourseList: [],
            selectedCourse: [],

            //Tab selected
            selected: 0,

            //drop down data
            // types: ['Student', 'Lecturer', 'Other'],

            // other
            ListItemOpen_01: false,
            ListAnnouncementOpen: false,
            ListAssignmentOpen: false,
            ListDayschoolOpen: false,

            isErrorMessageVisible: false,
            ListItemOpen_02: false,
            setOpen: false,
            setDialogOpen: false,
            open: false,
            visible: false,
            selectedFile: null

        };
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    componentDidMount(): void {
        this.populateCourseByProgramId();
        this.populateUserDetails();
    }

    populateUserDetails() {
        var UserData = [];
        var id = this.state.userId;

        fetch('http://localhost:5000/userProfile/' + id)
            .then(res => res.json())
            .then(respond => {
                respond.forEach(function (userData) {
                    UserData = {
                        Type: userData.typeid
                    }
                });

                this.setState({
                    userType: UserData.Type,
                })
            })
    }

    populateCourseByProgramId = () => {
        var pid = 10; //TODO
        fetch('http://localhost:5000/courses/getCoursesByProgram/' + pid)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    allCourseList: json
                })
            });
    };

    populateAnnouncementDetails = () => {
        fetch('http://localhost:5000/courses/getAnnouncementDetails/' + this.state.courseId)
            .then(res => res.json())
            .then(respond => {
                this.setState({
                    AnnouncementList: respond
                })
            });
    };

    populateAssignmentQuestionList = () => {
        fetch('http://localhost:5000/courses/getAssignmentQuestionList/' + this.state.courseId)
            .then(res => res.json())
            .then(respond => {
                this.setState({
                    AssignmentList: respond
                })
            });
    };

    handleClick = () => {
        this.setState({
            ListItemOpen_01: !this.state.ListItemOpen_01
        });
        this.forceUpdate();
    };

    handleClickAnnouncement = () => {
        this.setState({
            ListAnnouncementOpen: !this.state.ListAnnouncementOpen
        });
        this.forceUpdate();
    };


    handleClickAssignment = () => {
        this.setState({
            ListAssignmentOpen: !this.state.ListAssignmentOpen
        });
        this.forceUpdate();
    };

    handleClickDayschool = () => {
        this.setState({
            ListDayschoolOpen: !this.state.ListDayschoolOpen
        });
        this.forceUpdate();
    };

    // handleClickAssignment = () => {
    //     this.state.setDialogOpen = true;
    // };

    handleOnChangeCombo = (event) => {
        const valueObj = event.value;
        const field = event.target.name;

        if (field === 'selectedCourse' && valueObj) {
            this.setState({
                selectedCourse: valueObj
            })
        }
    };

    handleOnChange = (event) => {
        const field = event.target.name;

        if (field === "Announcement") {
            this.setState({
                announcement: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "Title") {
            this.setState({
                title: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "AssTitle") {
            this.setState({
                assTitle: event.target.value,
                isFormDirty: true,
            });
        }
        if (field === "DsName") {
            this.setState({
                dsName: event.target.value
            })
        }
    };

    handleDayshoolDateChange = async (event) => {
        await this.setState({
            DayshoolSelectedDate: event
        });
    };
    handleAssignmentDueDateChange = async (event) => {
        await this.setState({
            assignmentDueDate: event
        });
    };

    handleFromTimeChange = async (forTime) => {
        await this.setState({
            selectedFromTime: forTime
        })
    };

    handleToTimeChange = (event) => {
        this.setState({
            selectedToTime: event
        })
    };

    handleSubmitAddCourse = (event) => {
        event.preventDefault();
        var userCourseList = [];
        if (this.state.selectedCourse) {
            userCourseList = {
                CourseId: this.state.selectedCourse.id,
                UserId: this.state.userId,
                CourseStatus: 1, //Pending status
            }
        }

        fetch('http://localhost:5000/courses/updateUserCourseStatus', {
            method: 'POST',
            body: JSON.stringify(userCourseList),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
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

    onClear = () => {
        this.setState({
            title: "",
            announcement: "",
        })
    };

    handleLinkClick = async (event, item) => {
        var Heading = (event.code + " - " + event.name);
        var CourseId = event.id;
        var courseDetails = [];

        await this.setState({
            courseId: event.id
        });

        await fetch('http://localhost:5000/courses/getCourseDetails/' + CourseId)
            .then(res => res.json())
            .then(respond => {

                respond.forEach(function (item) {
                    courseDetails = {
                        Name: item.name,
                        Code: item.code,
                        Description: item.description,
                    }
                });

                this.setState({
                    heading: Heading,
                    description: courseDetails.Description
                })
            });

        this.populateAnnouncementDetails();
        this.populateAssignmentQuestionList();
    };

    addAssignment = async (event) => {
        var curTime = new Date().toLocaleString();
        var Assignment = {
            courseId: this.state.courseId,
            postedDate: curTime,
            dueDateTime: this.state.assignmentDueDate,
            assTitle: this.state.assTitle,
            owner: this.state.userId,
        };

        fetch('http://localhost:5000/courses/postAssignment/', {
            method: 'POST',
            body: JSON.stringify(Assignment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(respond => {
                if (respond != null) {
                    this.toggleDialog('The assignment has been successfully added. Please Re-login if you wish to see the changes', 'Success');
                    this.onClear();
                }
            })
    }

    addAnnouncement = async (event) => {
        //Do not refresh the page
        event.preventDefault();

        this.setState(
            () => {
                if (!this.validation()) {
                    this.setState({
                        isErrorMessageVisible: true
                    });
                    this.setState({
                        visible: true
                    });
                    this.toggleDialog('Please fix the highlighted errors to continue', 'Error');
                } else {
                    this.setState({
                        isErrorMessageVisible: false
                    });

                    //To get the current date and time
                    var curTime = new Date().toLocaleString();

                    var Announcement = {
                        courseId: this.state.courseId,
                        dateTime: curTime,
                        title: this.state.title,
                        owner: this.state.userId,
                        announcement: this.state.announcement
                    };

                    fetch('http://localhost:5000/courses/postAnnouncement/', {
                        method: 'POST',
                        body: JSON.stringify(Announcement),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(respond => {
                            if (respond != null) {
                                this.toggleDialog('The announcement has been successfully added. Please Re-login if you wish to see the changes', 'Success');
                                this.onClear();
                            }
                        })
                }
            })
    };

    addDayschool = () => {
        var curTime = new Date().toLocaleString();

        var DaySchool = {
            CourseId: this.state.courseId,
            PostedDate: curTime,
            DsName: this.state.dsName,
            Owner: this.state.userId,
            DsDate: moment(this.state.DayshoolSelectedDate).format('YYYY-MM-DD'),
            FromTime: moment(this.state.selectedFromTime).format('HH:mm:ss'),
            ToTime: moment(this.state.selectedToTime).format('HH:mm:ss')
        };

        fetch('http://localhost:5000/courses/createDayschool', {
            method: 'POST',
            body: JSON.stringify(DaySchool),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                this.toggleDialog('The day school details are successfully create', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })

    };

    validateProperty = value => {
        if (value) {
            return 'd-none';
        } else {
            return 'inline-error';
        }
    };

    validation = () => {
        if (
            this.validateProperty(this.state.announcement)
                .toString()
                .includes('error')
        ) {
            return false;
        } else if (
            this.validateProperty(this.state.title)
                .toString()
                .includes('error')
        ) {
            return false;
        } else {
            return true;
        }
    };

    fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    fileUploadHandler = () => {
        var File= this.state.selectedFile;
        var path= 'F:\\0001\\DOCS\\Campus\\4th year\\EEY6A89-Group Project\\Implementation\\FYP\\KTS\\server\\fileUpload\\files\\';
        var fileName = 'Course_Announcement' + File.name;
        var curTime = new Date().toLocaleString();

        const fd = new FormData();

        fd.append('tma', this.state.selectedFile);
        fd.append('postedDate', curTime);
        fd.append('userID', this.state.userId);
        fd.append('fileName', fileName);
        fd.append('originalName', File.name);
        fd.append('path', path);
        fd.append('courseId', this.state.courseId);
        fd.append('title', "Course_Announcement");

        axios.post('http://localhost:5000/fileUpload/fileupload', fd)
            .then(res => {
                console.log(res);
            });
    }

    render() {
        var {courseList, AnnouncementList, AssignmentList} = this.state;

        return (
            <div className='course-main'>
                <div className="main-heading mt-4 mb-4"><b> COURSE DETAILS </b></div>

                <div className="row">
                    <div className="col-md-3">
                        <div className=" course-navigation">
                            <h6>My Course List</h6>
                            <ul>
                                {courseList.map((item, key) => (
                                    <li><a href="#Content"
                                        // onClick={this.handleLinkClick}
                                           onClick={() => this.handleLinkClick(item)}

                                    >
                                        {item.code + "-" + item.name} </a>
                                    </li>
                                ))}
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
                                      data={this.state.allCourseList}
                                      value={this.state.selectedCourse}
                                      onChange={this.handleOnChangeCombo}
                                      name="selectedCourse"
                                      placeholder="Please Select"
                            />
                            <MuiThemeProvider className='ml-3'>
                                <React.Fragment>
                                    <RaisedButton
                                        className={"rbtn-primary"}
                                        primary={true}
                                        variant="contained"
                                        onClick={this.handleSubmitAddCourse}
                                    >Add Course</RaisedButton>
                                </React.Fragment>
                            </MuiThemeProvider>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <h6 id={"Content"}> {this.state.heading} </h6>
                        <div className="row">
                            <p> {this.state.description} </p>
                        </div>
                        {(this.state.userType === 2) && (
                            <div style={{float: "right"}}>
                                <EditIcon className="mr-3"/>
                                <DeleteIcon/>
                            </div>
                        )}

                        {(this.state.courseId !== 0) && (
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

                                {/*    Announcement*/}
                                <ListItem button onClick={this.handleClickAnnouncement}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <NotificationImportant/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Announcements"/>
                                    {this.state.ListAnnouncementOpen === true ? <ExpandMore/> : <ExpandLess/>}
                                </ListItem>

                                <Collapse in={this.state.ListAnnouncementOpen} timeout="auto" unmountOnExit>
                                    {(this.state.userType === 2) && (
                                        <div>
                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory">
                                                    Title :
                                                </label>
                                                <Input
                                                    className="ml-md-3"
                                                    placeholder="Announcement title"
                                                    value={this.state.title}
                                                    name="Title"
                                                    onChange={this.handleOnChange}
                                                    required={true}
                                                />
                                                {this.state.isErrorMessageVisible === true ? (
                                                    <span className={this.validateProperty(this.state.title)}>
                    Please enter Announcement title
                  </span>
                                                ) : null}
                                            </div>

                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory mt-4">
                                                    Announcement :
                                                </label>
                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    label="Announcement message"
                                                    onChange={this.handleOnChange}
                                                    className="course-detail-section"
                                                    name="Announcement"
                                                    value={this.state.announcement}
                                                />
                                                {this.state.isErrorMessageVisible === true ? (
                                                    <span className={this.validateProperty(this.state.announcement)}>
                    Please enter Announcement message
                  </span>
                                                ) : null}
                                                <Avatar onClick={this.addAnnouncement}>
                                                    <AddIcon/>
                                                </Avatar>
                                            </div>
                                        </div>
                                    )}

                                    <div className="row ml-5">
                                        <Paper className={"classes-paper"}>
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <Grid item xs>
                                                    {AnnouncementList.map((item) => (
                                                        <Typography>
                                                            <br/>
                                                            <h5><b>
                                                                {(item.title).toUpperCase()}
                                                            </b>
                                                            </h5>
                                                            <p className="ml-3">
                                                                by {item.name} - {item.datetime}
                                                                <br/> <br/>
                                                                {item.description} </p>

                                                            {(this.state.userType === 2) && (

                                                                <div style={{float: "right"}}>
                                                                    {/*<Avatar*/}
                                                                    {/*    // onClick={this.deleteAnnouncement}*/}
                                                                    {/*>*/}
                                                                    <EditIcon className="mr-3"/>

                                                                    {/*</Avatar>*/}
                                                                    {/*<Avatar*/}
                                                                    {/*    // onClick={this.deleteAnnouncement}*/}
                                                                    {/*>*/}
                                                                    <DeleteIcon/>
                                                                    {/*</Avatar>*/}
                                                                </div>
                                                            )}
                                                            <br/> <br/>
                                                            <Divider/>
                                                        </Typography>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Collapse>

                                {/*TODO DS*/}
                                <ListItem button onClick={this.handleClickDayschool}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Day Schools"/>
                                    {this.state.ListDayschoolOpen === true ? <ExpandMore/> : <ExpandLess/>}
                                </ListItem>
                                <Collapse in={this.state.ListDayschoolOpen} timeout="auto" unmountOnExit>
                                    {(this.state.userType === 2) && (
                                        <div>
                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory">
                                                    Day School Title :
                                                </label>
                                                <Input
                                                    className="ml-md-3"
                                                    placeholder="Day School Title Here"
                                                    value={this.state.dsName}
                                                    name="DsName"
                                                    onChange={this.handleOnChange}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory mt-4">
                                                    Date :
                                                </label>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        name="Date"
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        format="MM/dd/yyyy"
                                                        value={this.state.DayshoolSelectedDate}
                                                        onChange={this.handleDayshoolDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>

                                            <div className="row ml-5">
                                                <label htmlFor=""
                                                       className="mandatory mt-4">
                                                    Time :
                                                </label>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        name="FromTime"
                                                        margin="normal"
                                                        placeholder="From Time"
                                                        id="from-time-picker"
                                                        value={this.state.selectedFromTime}
                                                        onChange={this.handleFromTimeChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />

                                                    <KeyboardTimePicker
                                                        name="ToTime"
                                                        className="ml-5"
                                                        placeholder="To Time"
                                                        margin="normal"
                                                        id="to-time-picker"
                                                        // label="Time picker"
                                                        value={this.state.selectedToTime}
                                                        onChange={this.handleToTimeChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />

                                                    <Avatar
                                                        className="ml-5"
                                                        onClick={this.addDayschool}>
                                                        <AddIcon/>
                                                    </Avatar>
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </div>
                                    )}
                                </Collapse>

                                {/*Assignment*/}
                                <ListItem button onClick={this.handleClickAssignment}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Assignments"/>
                                    {this.state.ListAssignmentOpen === true ? <ExpandMore/> : <ExpandLess/>}
                                </ListItem>

                                <Collapse in={this.state.ListAssignmentOpen} timeout="auto" unmountOnExit>
                                    {(this.state.userType === 2) && (
                                        <div>
                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory">
                                                    Title :
                                                </label>
                                                <Input
                                                    className="ml-md-3"
                                                    placeholder="Assignment title"
                                                    value={this.state.assTitle}
                                                    name="AssTitle"
                                                    onChange={this.handleOnChange}
                                                    required={true}
                                                />
                                                {this.state.isErrorMessageVisible === true ? (
                                                    <span className={this.validateProperty(this.state.assTitle)}>
                                                         Please enter Announcement title
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory">
                                                    Due Date :
                                                </label>

                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        name="DueDate"
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        format="MM/dd/yyyy"
                                                        value={this.state.assignmentDueDate}
                                                        onChange={this.handleAssignmentDueDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>

                                            <div className="row ml-5">
                                                <label htmlFor="" className="mt-4">
                                                    Upload the Question Paper Document :
                                                </label>
                                            </div>

                                            <div className="row fileUpload-button">
                                                <input type="file" onChange={this.fileSelectedHandler} />
                                                <button onClick={this.fileUploadHandler}>Upload</button>
                                            </div>
                                            <div className="add-button">
                                                <Avatar onClick={this.addAssignment}>
                                                    <AddIcon/>
                                                </Avatar>
                                            </div>
                                            <br/> <br/>
                                        </div>
                                    )}

                                    <div className="row ml-5">
                                        <Paper className={"classes-paper"}>
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <Grid item xs>
                                                    {AssignmentList.map((item) => (
                                                        <Typography>
                                                            <br/>
                                                            <h5><b>
                                                                {(item.title).toUpperCase()}
                                                            </b>
                                                            </h5>
                                                            <p className="ml-3">
                                                                by {item.name} - {item.posteddate}
                                                                <br/>
                                                                Due date: {item.duedatetime}
                                                            </p>

                                                            <div className="mt-4">
                                                                <a href="#Content"
                                                                    // onClick={this.handleLinkClick}
                                                                   onClick={() => this.handleLinkClick(item)}>
                                                                    {"this.pdf"} </a>
                                                            </div>
                                                            <br/>
                                                            <div>
                                                                <input type="file" onChange={this.fileSelectedHandler} />
                                                                <button onClick={this.fileUploadHandler}>Upload</button>
                                                            </div>

                                                            {/*Lecturer*/}
                                                            {(this.state.userType === 2) && (

                                                                <div style={{float: "right"}}>
                                                                    {/*<Avatar*/}
                                                                    {/*    // onClick={this.deleteAnnouncement}*/}
                                                                    {/*>*/}
                                                                    <EditIcon className="mr-3"/>

                                                                    {/*</Avatar>*/}
                                                                    {/*<Avatar*/}
                                                                    {/*    // onClick={this.deleteAnnouncement}*/}
                                                                    {/*>*/}
                                                                    <DeleteIcon/>
                                                                    {/*</Avatar>*/}
                                                                </div>
                                                            )}
                                                            <br/> <br/>
                                                            <Divider/>
                                                        </Typography>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Collapse>

                                {/*Marks*/}
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
                        )}
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

            </div>
        );
    }
}

export default Course;
