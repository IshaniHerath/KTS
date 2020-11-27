import React, {Component} from 'react';
import {ComboBox} from "@progress/kendo-react-dropdowns";
import TextField from '@material-ui/core/TextField';

class JoinChat extends Component {

    constructor(props){
        super(props);
        this.cid = React.createRef();
        this.chatName = React.createRef();
        this.state = {
            id: this.props.id,
            chatRooms: [],
            name: "Ish",
            courseList:[]

        }
    }

    componentDidMount(){
        var uid = this.props.id;
        fetch('http://localhost:5000/chat/'+uid)
            .then(res => res.json())
            .then(json => {
               this.setState({
                   isLoaded: true,
                   chatRooms: json,
               }) 
            });

            fetch('http://localhost:5000/courses/getCourses/'+uid)
            .then(res => res.json())
            .then(json => {
               this.setState({
                courseList: json
               }) 
            });
    }

    chatlink = (chatRoom) => {
        const name = this.state.name;
        const room = chatRoom.chat_name;
       window.open('http://localhost:4000/chat?name=' + name + '&room='+ room, '_blank');
    }; 

    createChat = (event) => {
        event.preventDefault();
        const cid = this.cid.current.value.id;
        const chat_name = this.chatName.current.value;
        alert(cid+ ' ' + chat_name);
        const body = {chat_name , cid }
        console.log(body);
        fetch('http://localhost:5000/chat' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    render() {
        var {chatRooms} = this.state;
        return (
            <div className = 'flexBox'>
                <div className = 'topicWindow'> 
                    <h3>Create Chat Room</h3>
                    <input type = 'text' size="50"
                        ref = {this.chatName}
                    /><br /><br />
                    <ComboBox className='ml-3'
                                      textField="name"
                                      //dataItemKey="id"
                                      data={this.state.courseList}
                                      //value={this.state.selectedCourse}
                                      //onChange={this.handleOnChangeCombo}
                                      //name="selectedCourse"
                                      placeholder="Please Select"
                                      ref = {this.cid}
                    /><br /><br />
                    <button className="btn btn-primary" onClick = {this.createChat}>Create</button>
                </div>

                <div className = 'chatWindow'>
                    <div>
                        <h3>Join Room</h3>
                    </div>

                    <div>
                        <div>
                            {chatRooms.map((chatRoom) => (
                                <div>              
                                    <button className="btn btn-primary " onClick = {() => this.chatlink(chatRoom)}>{chatRoom.chat_name}</button><br /><br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinChat;