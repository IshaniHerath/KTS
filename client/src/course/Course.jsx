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
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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
            AssignmentQuestionList: [],
            AssignmentAnswerList: [],
            AssignmentAllAnswerList: [],
            fileId: 0,
            questionId: 0,

            //Marks
            markTitle: "",
            MarksList: [],

            //DaySchool
            dsName: "",
            DayshoolSelectedDate: "",
            // selectedTime: "",
            selectedFromTime: "",
            selectedToTime: "",
            DaySchoolList:[],

            allCourseList: [],
            selectedCourse: [],

            //Tab selected
            selected: 0,

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

    populateDaySchoolDetails = () => {
        fetch('http://localhost:5000/courses/getDaySchoolDetails/' + this.state.courseId)
            .then(res => res.json())
            .then(respond => {
                this.setState({
                    DaySchoolList: respond
                })
            });
    };

    populateAssignmentQuestionList = () => {
        fetch('http://localhost:5000/courses/getAssignmentQuestionList/' + this.state.courseId)
            .then(res => res.json())
            .then(response => {

                this.setState({
                    AssignmentQuestionList: response
                })
                this.populateAssignmentAnswerList();
            });
    };

    populateAssignmentAnswerList = () => {
        var courseId = this.state.courseId;

        fetch('http://localhost:5000/courses/getAssignmentAnswerList/' + courseId)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    AssignmentAllAnswerList: response
                });
            });

    };

    populateMarksList = () => {
        fetch('http://localhost:5000/courses/getMarkList/' + this.state.courseId)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    MarksList: response
                })
            });
    }

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
        if (field === "MarkTitle"){
            this.setState({
                markTitle: event.target.value
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
            dsName: "",
            DayshoolSelectedDate : null,
            selectedFromTime : null,
            selectedToTime : null,
            assignmentDueDate: null,
            assTitle: "",
            markTitle: "",
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
        this.populateDaySchoolDetails();
        this.populateAssignmentQuestionList();
        this.populateMarksList();
        this.onClear();
    };

    addMarks = async (event) => {
        var curTime = new Date().toLocaleString();

        if(this.state.markTitle){

            var Marks = {
                courseId: this.state.courseId,
                postedDate: curTime,
                markTitle: this.state.markTitle,
                owner: this.state.userId,
                fileId: this.state.fileId
            };

            fetch('http://localhost:5000/courses/postMark/', {
                method: 'POST',
                body: JSON.stringify(Marks),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (response != null) {
                        this.toggleDialog('The mark sheet is successfully added.', 'Success');
                        this.onClear();
                        // this.setState({
                        //     selectedFile: null
                        // })
                    }
                })

        } else {
            this.toggleDialog('Please fill the mark sheet title to continue!', 'Error');
        }
    };


    addAssignmentAnswer = async (item) => {
        var assAnswerTitle = "Answer";
        this.state.questionId = item.id;

        var curTime = new Date().toLocaleString();
        var AssignmentAnswer = {
            courseId: this.state.courseId,
            postedDate: curTime,
            assAnsTitle: assAnswerTitle,
            owner: this.state.userId,
            isSubmitted: true,
            fileId: this.state.fileId,
            questionId: this.state.questionId
        };

        if(this.state.fileId !== 0){

            fetch('http://localhost:5000/courses/postAssignmentAnswer/', {
                method: 'POST',
                body: JSON.stringify(AssignmentAnswer),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(respond => {
                    if (respond != null) {
                        this.toggleDialog('The answer paper has been successfully added.', 'Success');
                    }
                })
        } else if (this.state.fileId === 0) {
            this.toggleDialog('Nothing to add!. Please upload the answer paper.', 'Error');
        }

    }

    addAssignmentQuestion = async (event) => {
        var curTime = new Date().toLocaleString();
        var Assignment = {
            courseId: this.state.courseId,
            postedDate: curTime,
            dueDateTime: this.state.assignmentDueDate,
            assTitle: this.state.assTitle,
            owner: this.state.userId,
            isAnswer: false,
            isSubmitted: null,
            fileId: this.state.fileId
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
                    this.toggleDialog('The question paper has been successfully added.', 'Success');
                    this.onClear();
                }
            })

            // TMA - Mobile Integration
            const CourseID = this.state.courseId;
            const EventMsg = this.state.assTitle + " :: Due Date : " + this.state.assignmentDueDate;
            const body_Inte = {CourseID, EventMsg};
            fetch('http://ktrans-001-site1.etempurl.com/api/EventReporter/CourseEventAdd/' , {
            method: 'POST',
            body: JSON.stringify(body_Inte),
            headers: {
            'Content-Type': 'application/json'
            }
            });
            // END TMA - Mobile Integration
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
                                this.toggleDialog('The announcement has been successfully added.', 'Success');
                                this.onClear();
                            }
                        })
                }
            })

                         // Announcement - Mobile Integration
                         const CourseID = this.state.courseId;
                         const EventMsg = this.state.title + " :: " + this.state.announcement;
                         const body_Inte = {CourseID, EventMsg};
                         fetch('http://ktrans-001-site1.etempurl.com/api/EventReporter/CourseEventAdd/' , {
                         method: 'POST',
                         body: JSON.stringify(body_Inte),
                         headers: {
                         'Content-Type': 'application/json'
                         }
                         });
                         // END Announcement - Mobile Integration
    };

    addDayschool = () => {
        var curTime = new Date().toLocaleString();

        var DaySchool = {
            courseId: this.state.courseId,
            postedDate: curTime,
            title: this.state.dsName,
            owner: this.state.userId,
            dsDate: moment(this.state.DayshoolSelectedDate).format('YYYY-MM-DD'),
            fromTime: moment(this.state.selectedFromTime).format('HH:mm:ss'),
            toTime: moment(this.state.selectedToTime).format('HH:mm:ss')
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
                this.toggleDialog('The day school details are successfully created', 'Success');
                this.onClear();
            })
            .catch(error => {
                console.error('Error:', error);
            })

                        // DaySchool - Mobile Integration
                        const CourseID = this.state.courseId;
                        const EventMsg = this.state.dsName + "... Date : " +  moment(this.state.DayshoolSelectedDate).format('YYYY-MM-DD') + "...From : "+ moment(this.state.selectedFromTime).format('HH:mm:ss') + ".. TO : " + moment(this.state.selectedToTime).format('HH:mm:ss');
                        const body_Inte = {CourseID, EventMsg};
                        fetch('http://ktrans-001-site1.etempurl.com/api/EventReporter/CourseEventAdd/' , {
                        method: 'POST',
                        body: JSON.stringify(body_Inte),
                        headers: {
                        'Content-Type': 'application/json'
                        }
                        });
                        // DaySchool - Mobile Integration

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
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    handleAttachementClick = (item) => {
        var fileName = item.OriginalName;
        window.open("http://localhost:5000/fileUpload/getAttachementByName/"+ fileName);
    };


    fileUploadHandler = () => {
        var File= this.state.selectedFile;

        if(this.state.selectedFile) {

            var path= 'F:\\0001\\DOCS\\Campus\\4th year\\EEY6A89-Group Project\\Implementation\\FYP\\KTS\\server\\fileUpload\\files\\';
            var fileName = 'Course_Assignment' + File.name;
            var curTime = new Date().toLocaleString();

            const fd = new FormData();
            var file;

            fd.append('tma', this.state.selectedFile);
            fd.append('postedDate', curTime);
            fd.append('userID', this.state.userId);
            fd.append('fileName', fileName);
            fd.append('originalName', File.name);
            fd.append('path', path);
            fd.append('courseId', this.state.courseId);

            if(this.state.markTitle){
                fd.append('title', "Marks");

                file = {
                    postedDate: curTime,
                    tma: this.state.selectedFile,
                    userID: this.state.userId,
                    fileName: fileName,
                    originalName: File.name,
                    path: path,
                    courseId: this.state.courseId,
                    title: "Marks"
                };
            }else {
                fd.append('title', "Course_Assignment");

                file = {
                    postedDate: curTime,
                    tma: this.state.selectedFile,
                    userID: this.state.userId,
                    fileName: fileName,
                    originalName: File.name,
                    path: path,
                    courseId: this.state.courseId,
                    title: "Course_Assignment"
                };
            }

            axios.post('http://localhost:5000/fileUpload/fileupload', fd)
                .then(res => {
                    this.fileUploadToDb(file)
                });

            // FileUpload - Search Integration
            const FileURL      = 'http://localhost/Node_Site/fileupload/' + fileName;  // Place the web server path pointed to upload folder.
            const courseID     = this.state.courseId;
            const SectionID    = 1;
            const keywords     = "Assignment due when" + this.state.assignmentDueDate + fileName;
            const DocTitle     = this.state.assTitle;
            const DocBrief     = "Due Date : " + this.state.assignmentDueDate;
            const CreatedByUID = this.state.userId;
            const body_Inte    = {courseID, SectionID, keywords, DocTitle, DocBrief, FileURL, CreatedByUID};
            fetch('http://ktrans-001-site1.etempurl.com/api/SearchEngSubmit/CourseDoc/' , {
                method: 'POST',
                body: JSON.stringify(body_Inte),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // END  FileUpload - Search Integration

        } else {
            this.toggleDialog('Please select a file first!', 'Error');
        }

    };

    fileUploadHandlerAssAnswer = (item) => {

        var File= this.state.selectedFile;
        var AssignmentAllAnswerList = this.state.AssignmentAllAnswerList;
        var isPresent = false;

        AssignmentAllAnswerList.forEach(function (AssignmentAllAnswer) {
            if(item.id === AssignmentAllAnswer.QuestionId){
                isPresent = true;
            }
        });


        if(this.state.selectedFile && isPresent !== true) {

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
            fd.append('title', "Course_Assignment_Answers");

            var file = {
                postedDate: curTime,
                tma: this.state.selectedFile,
                userID: this.state.userId,
                fileName: fileName,
                originalName: File.name,
                path: path,
                courseId: this.state.courseId,
                title: "Course_Assignment_Answers"
            };

            axios.post('http://localhost:5000/fileUpload/fileupload', fd)
                .then(res => {
                    this.fileUploadToDb(file)
                });

        } else if(!this.state.selectedFile) {
            this.toggleDialog('Please select a file first!', 'Error');
        } else if(isPresent === true) {
            this.toggleDialog('You can only upload one answer sheet!', 'Error');
        }

    };

    //Save In the DB
    fileUploadToDb = (File) => {
        var FileId = [];

        fetch('http://localhost:5000/fileUpload/fileUploadToDB', {
            method: 'POST',
            body: JSON.stringify(File),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                this.toggleDialog('The file is successfully uploaded.', 'Success');

                result.forEach(function (fileId) {
                    FileId = fileId.id;
                });

                this.setState({
                    fileId: FileId
                });

            })
            .catch(error => {
                console.error('Error:', error);
            })
    };

    deleteAnnouncement(item) {
        var annId = item.id;

        fetch(`http://localhost:5000/courses/deleteAnnouncement/` + annId , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .then(result => {
                this.toggleDialog('The Announcement is successfully deleted', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    deleteDayschool(item) {
        var Id = item.id;

        fetch(`http://localhost:5000/courses/deleteDaySchool/` + Id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .then(result => {
                this.toggleDialog('The Day School is successfully deleted', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    deleteAssignmentQuestion(item) {
        var Id = item.id;

        fetch(`http://localhost:5000/courses/deleteAssignmentQuestion/` + Id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .then(result => {
                this.toggleDialog('The Assignment Question is successfully deleted', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    deleteMarks(item) {
        var Id = item.id;

        fetch(`http://localhost:5000/courses/deleteMark/` + Id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .then(result => {
                this.toggleDialog('The Mark sheet is successfully deleted', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })

    }

    deleteAssignmentAnswer(item) {
        var Id = item.id;

        fetch(`http://localhost:5000/courses/deleteAssignmentAnswer/` + Id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .then(result => {
                this.toggleDialog('The Assignment Answer is successfully deleted', 'Success');
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }



    render() {
        var {courseList, AnnouncementList, DaySchoolList, AssignmentQuestionList, AssignmentAllAnswerList, MarksList} = this.state;

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
                                                <TextField
                                                    className="course-AnnTitle"
                                                    label="Announcement title"
                                                    value={this.state.title}
                                                    name="Title"
                                                    onChange={this.handleOnChange}
                                                />
                                                {this.state.isErrorMessageVisible === true ? (
                                                    <span className={this.validateProperty(this.state.title)}>
                    Please enter Announcement title
                  </span>
                                                ) : null}
                                            </div>

                                            <div className="row ml-5">
                                                <label htmlFor="" className="mandatory">
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
                                                                    <Avatar
                                                                        onClick={() => this.deleteAnnouncement(item)}
                                                                    >
                                                                        <DeleteIcon/>
                                                                    </Avatar>
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

                                {/*TODO DS Delete & Edit*/}
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

                                    <div className="row ml-5">
                                        <Paper className={"classes-paper"}>
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <Grid item xs>
                                                    {DaySchoolList.map((item) => (
                                                        <Typography>
                                                            <br/>
                                                            <h5><b>
                                                                {(item.title).toUpperCase()}
                                                            </b>
                                                            </h5>
                                                            <p className="ml-3">
                                                                by {item.name} - {item.posteddate}
                                                                <br/> <br/>
                                                                On {item.date}
                                                                <br/> <br/>
                                                                From: {item.fromtime} To: {item.totime}</p>

                                                            {(this.state.userType === 2) && (

                                                                <div style={{float: "right"}}>
                                                                    <Avatar
                                                                        onClick={() => this.deleteDayschool(item)}
                                                                    >
                                                                    <DeleteIcon/>
                                                                    </Avatar>
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
                                                    className="ml-md-4"
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
                                                <Avatar onClick={this.addAssignmentQuestion}>
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
                                                    {AssignmentQuestionList.map((item) => (
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
                                                                Question Paper:
                                                                <a href="#Content"
                                                                    onClick={() => this.handleAttachementClick(item)}>
                                                                    {item.OriginalName} </a>

                                                                {(this.state.userType === 2) && (

                                                                    <div style={{float: "right"}}>
                                                                        <Avatar
                                                                            onClick={() => this.deleteAssignmentQuestion(item)}
                                                                        >
                                                                            <DeleteIcon/>
                                                                        </Avatar>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <br/>

                                                            {(this.state.userType === 1) && (
                                                                <div>
                                                                <div>
                                                                    <br/>
                                                                    Upload Your Answer Paper:
                                                                    <br/>
                                                                    <input type="file" onChange={this.fileSelectedHandler} />
                                                                    <button onClick={() => this.fileUploadHandlerAssAnswer(item)}>Upload</button>
                                                                </div>
                                                                    <div className="add-button">
                                                                        <Avatar onClick={() => this.addAssignmentAnswer(item)}>
                                                                            <AddIcon/>
                                                                        </Avatar>
                                                                    </div>
                                                                    <br/> <br/>
                                                                </div>
                                                                )}

                                                            <div>
                                                                <br/>
                                                                Answer Paper:
                                                                <br/><br/>

                                                                {(this.state.userType === 2) && (
                                                                    <div>
                                                                        {AssignmentAllAnswerList.map((AssignmentAnswer) => (
                                                                            <div>
                                                                                {(() => {
                                                                                    if (item.id === AssignmentAnswer.QuestionId) {
                                                                                        return (
                                                                                            <div>
                                                                                                <a href="#Content"
                                                                                                   onClick={() => this.handleAttachementClick(AssignmentAnswer)}>
                                                                                                    {AssignmentAnswer.OriginalName} </a>
                                                                                                <br/><br/>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}


                                                                {(this.state.userType === 1) && (
                                                                    <div>
                                                                        {AssignmentAllAnswerList.map((AssignmentAnswer) => (
                                                                            <div>
                                                                                {(() => {
                                                                                    if (item.id === AssignmentAnswer.QuestionId && AssignmentAnswer.owner === this.state.userId) {
                                                                                        return (
                                                                                            <div>
                                                                                                <a href="#Content"
                                                                                                   onClick={() => this.handleAttachementClick(AssignmentAnswer)}>
                                                                                                    {AssignmentAnswer.OriginalName} </a>
                                                                                                <div style={{float: "right"}}>
                                                                                                    <Avatar
                                                                                                        onClick={() => this.deleteAssignmentAnswer(AssignmentAnswer)}
                                                                                                    >
                                                                                                        <DeleteIcon/>
                                                                                                    </Avatar>
                                                                                                </div>
                                                                                                <br/><br/>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>

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

                                    {(this.state.userType === 2) && (
                                        <div>
                                            <div className="row ml-5">
                                                <label htmlFor="" className="mt-4">
                                                    Upload the Marks Document :
                                                </label>
                                            </div>

                                            <div className="row ml-5">

                                                <label htmlFor="" className="mandatory">
                                                    Title :
                                                </label>
                                                <Input
                                                    className="ml-md-4"
                                                    placeholder="Mark title"
                                                    value={this.state.markTitle}
                                                    name="MarkTitle"
                                                    onChange={this.handleOnChange}
                                                    required={true}
                                                />

                                            </div>

                                            <div className="row fileUpload-button ml-2">
                                                <input type="file" onChange={this.fileSelectedHandler} />
                                                <button onClick={this.fileUploadHandler}>Upload</button>
                                            </div>

                                            <div className="add-button">
                                                <Avatar onClick={this.addMarks}>
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
                                                    <Typography>

                                                        <div>
                                                            <br/>
                                                            Mark Sheet:
                                                            <br/>

                                                            {MarksList.map((item) => (

                                                                <div className="mt-4">
                                                                    {item.title} -
                                                                    <a href="#Content"
                                                                       onClick={() => this.handleAttachementClick(item)}>
                                                                        {item.OriginalName} </a>

                                                                    {(this.state.userType === 2) && (

                                                                        <div style={{float: "right"}}>
                                                                            <Avatar
                                                                                onClick={() => this.deleteMarks(item)}
                                                                            >
                                                                                <DeleteIcon/>
                                                                            </Avatar>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            ))}
                                                        </div>

                                                        <br/> <br/>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>

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
