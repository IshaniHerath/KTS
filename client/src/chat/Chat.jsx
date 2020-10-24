import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from '@material-ui/core/TextField';

class Chat extends Component {

    render() {
        return (
            <div>
                <Paper className= "chat-paper"
                       elevation={1}>
                    <Typography variant="h5" component="h3">
                        Happy Chatting
                    </Typography>

                    <div className="row">
                        <div className="chat-topic-window">
                            {/*TODO MAP array*/}
                            <List>
                                {
                                    ['User 01', 'User 02', 'User 03'].map(topic => (
                                        <ListItem key={topic} button>
                                            <ListItemText primary="topic" />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>

                        <div>
                            <div className="chat-chat-window">
                                {/*TODO MAP array*/}
                                {
                                    [{from: 'User 01', msg:'hello'}].map((chat, i) => (
                                        <div key={i}>
                                            <Chip label= {chat.from}
                                                // className={classes.chip}
                                            />
                                            <Typography variant= 'p'> {chat.msg}</Typography>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="row">
                                <div className = "ml-5">
                                    <TextField
                                        // id="standard-full-width"
                                        // style={{ margin: 8 }}
                                        placeholder="Type your message"
                                        // style = {{width: 100}}
                                        // fullWidth = true
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                <div style={{float: "right"}}>
                                    <MuiThemeProvider>
                                        <React.Fragment>
                                            <RaisedButton
                                                className={"rbtn-primary"}
                                                primary={true}
                                                variant="contained"
                                                // onClick={this.handleSubmitAddCourse}
                                            >Send</RaisedButton>
                                        </React.Fragment>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Chat;
