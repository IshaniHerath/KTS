import React, {Component} from 'react';
import {ComboBox} from "@progress/kendo-react-dropdowns";
import TextField from '@material-ui/core/TextField';

class JoinChat extends Component {

    constructor(props){
        super(props);
        this.cid = React.createRef();
        this.chatName = React.createRef();
        this.delchatName = React.createRef();
        this.state = {
            id: this.props.id,
            type: this.props.type,
            chatRooms: [],
            name: [],
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

        fetch('http://localhost:5000/userProfile/' + uid + '/userName')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    name: json,
                })
            });
    }

    chatlink = (chatRoom) => {
        const name = ''+this.state.name[0].username+'_'+this.state.id;
        const room = chatRoom.chat_name;
       window.open('https://kts-chat-client.herokuapp.com/chat?name=' + name + '&room='+ room, '_blank');
    }; 

    createChat = (event) => {
        if(this.state.type === 2 || this.state.type === 4){
            event.preventDefault();
            const cid = this.cid.current.value.id;
            const chat_name = this.chatName.current.value;
            const body = {chat_name , cid }
            console.log(body);
            fetch('http://localhost:5000/chat' , {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.alert("Room successfully created. Please switch the tabe to view change");
        }else{
            window.alert("You dont have the access to create a Chat Room");
        }
    }

    deleteRoom = (event) => {
        if(this.state.type === 2 || this.state.type === 4){
            event.preventDefault();
            const chat_name = this.delchatName.current.value.chat_name;
            const body = {chat_name}
        
            fetch(`http://localhost:5000/chat/del` , {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.alert("Room successfully deleted. Please switch the tabe to view change");
        }else{
            window.alert("You dont have the access to Delete this chat room.");
        }
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

                    <h3>Delete Chat Room</h3>
                    <ComboBox className='ml-3'
                                      textField="chat_name"
                                      //dataItemKey="id"
                                      data={this.state.chatRooms}
                                      //value={this.state.selectedCourse}
                                      //onChange={this.handleOnChangeCombo}
                                      //name="selectedCourse"
                                      placeholder="Please Select"
                                      ref = {this.delchatName}
                    /><br /><br />
                    <button className="btn btn-danger" onClick = {this.deleteRoom}>Delete</button>
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
