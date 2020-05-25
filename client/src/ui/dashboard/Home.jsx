import React, { Component } from 'react';
import Hidden from "@material-ui/core/Hidden";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TopBar from "../../component/TopBar";
import IconButton from '@material-ui/core/IconButton';

import Dashboard from "@material-ui/icons/Dashboard";
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import Person from "@material-ui/icons/Person";
import ChatIcon from '@material-ui/icons/Chat';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SubjectIcon from '@material-ui/icons/Subject';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // regNumber: 0,
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <TopBar headerTitle=" "
                    // displayName={this.props.displayName} logoutCallback={this.props.logoutCallback}
                />

                <div className="col-md-3">

                    <Drawer>

                    </Drawer>

                <Divider />


                <List>
                    {['User Profile', 'Chat'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 3 === 0 ? <Person /> : <ChatIcon/> }</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Courses', 'Groups'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <SubjectIcon /> : <PeopleOutlineIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                {['Q and A'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <QuestionAnswerIcon /> : < QuestionAnswerIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                {/*</Drawer>*/}

oooooooooooooooooooooooooooooooo
                    <CssBaseline />
                    <AppBar position="fixed"
                            // className={classes.appBar}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                // onClick={handleDrawerToggle}
                                // className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Responsive drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>

                </div>
            </div>

            )
    }
}
export default Home;
