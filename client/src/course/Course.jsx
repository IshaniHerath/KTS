import React, { Component } from 'react';
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
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,

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

    handleClick = () => {
        this.setState({
            ListItemOpen_01: !this.state.ListItemOpen_01
        });
        this.forceUpdate();
    };

    handleClickOpen =() => {
        console.log("setDialogOpen", this.state.setDialogOpen);
        this.state.setDialogOpen = true;
    };

    handleClose = () => {
        this.state.visible = false;
    };

    toggleDialog = () => {
        this.setState({
            visible : !this.state.visible
        });
    };

    render(){
        return (
            <div className = 'course-main'>
                {/*mt = margin top mb = margin buttom*/}
                <div className="main-heading mt-4 mb-4"> <b> COURSE DETAILS </b></div>
                <div className="row">
                    <div className="col-md-3 course-navigation">
                        <h6>My Course List</h6>
                        <ul>
                            <li> EEI6560-Software Project Management </li>
                            <li> EEI6565-Artificial Intelligent Technology </li>
                            <li> EEI6567-Software Architecture and design </li>
                        </ul>
                        </div>

                    <div className="col-md-9">
                        <div className="row">
                            <h6> EEX6598-Software Construction </h6>
                            <p> Hello and welcome to the course!
                                You have logged into the course on EEI6567 - Software Architecture and Design of the Bachelor of Software Engineering. This course comprises of System software and different areas of operating system management such as Processor management, Memory Management, Device management, File management, Network organization and System management.

                                In this course students will learn how to analyze and design large scale software systems and apply different architecture styles to software design, identify and define quality attributes for a software system, address functional and non-functional requirements in the architecture and measure architecturally significant quality attributes and metrics.

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
                                    <NotificationImportant />
                                </Avatar>
                            </ListItemAvatar>
                            <a href="Announcements" id="title_1">Announcements</a>
                        </ListItem>

                        <ListItem button onClick={this.handleClickOpen}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Day Schools" />
                        </ListItem>

                        <ListItem button onClick={this.handleClickOpen}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Assignments" />
                        </ListItem>

                        <ListItem button onClick={this.handleClick}>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmojiEvents />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Marks" />
                            {this.state.ListItemOpen_01 === true ? <ExpandMore /> : <ExpandLess />}
                        </ListItem>

                        <Collapse in={this.state.ListItemOpen_01} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className = 'styles-nested'>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="CAT Marks" />
                                </ListItem>
                                <ListItem button className = 'styles-nested'>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="TMA Marks" />
                                </ListItem>
                                <ListItem button className= 'styles-nested'>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mini Project Marks" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    </div>
                </div>

                {this.state.visible && (
                    <Dialog fullScreen open={this.state.open} onClose={this.toggleDialog}>
                        <AppBar className = "appBar-dialog">
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6">
                                    Announcements
                                    <NotificationImportant />
                                </Typography>
                                <Button autoFocus color="inherit" className = "toolbar-button" onClick={this.handleClose} >
                                    save
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <List>
                            <ListItem button>
                                <ListItemText primary="Phone ringtone" secondary="Titania" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                            </ListItem>
                        </List>
                    </Dialog>
                )}
            </div>
    );}
}
export default Course;
