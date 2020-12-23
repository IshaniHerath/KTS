import React, {Component} from 'react';
import GroupImageSection from "../group/GroupImageSection";
import {ComboBox} from "@progress/kendo-react-dropdowns";
import ThumbsUp from '../QAndA/ThumbsUp';
import ThumbsDown from '../QAndA/ThumbsDown';
import Likes from '../QAndA/Likes';
import DeletePost from '../QAndA/DeletePost';
import AddReplies from '../QAndA/AddReplies';
import Replies from '../QAndA/Replies';

class Group extends Component {

    constructor(props){
        super(props);
        this.cName = React.createRef();
        this.cid = React.createRef();
        this.postContentEl = React.createRef();
        this.state = {
            items: [],
            isLoaded: false,
            id: this.props.id,
            status: this.props.status,
            type: this.props.type,
            courseid: [],
            courses: [],
            groupposts: [],
            groupid:[],
            csid:[]
           
            
        }
    }

    componentDidMount(){
        var uid = this.props.id;
        fetch('http://localhost:5000/group/'+uid)
            .then(res => res.json())
            .then(json => {
               this.setState({
                   isLoaded: true,
                   items: json,
               }) 
            });


            fetch('http://localhost:5000/courses/getCourses/'+uid)
            .then(res => res.json())
            .then(json => {
               this.setState({
                courses: json,
                courseid: json.id
               }) 
            });
            console.log(this.courses);
    }

    onSubmit = (event) => {
        console.log('type is ' + this.state.status);
        if(this.state.type === 2 || this.state.type === 4){
            event.preventDefault();
            const name = this.cName.current.value.name;
            const owner = this.state.id;
            const courseid = this.cName.current.value.id;
            //console.log(this.cName.current.value.id);
            const body = {name,owner,courseid}
            console.log(body);
            fetch('http://localhost:5000/group' , {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            window.alert("You dont have the access to create group.");
        }
    }

    //need to complete
    handleCourse = async (item) => {
        let gid = item.id;
        console.log(gid);
        this.groupid = item.id

        fetch('http://localhost:5000/groupPost/'+gid)
            .then(res => res.json())
            .then(json => {
               this.setState({
                   isLoaded: true,
                   groupposts: json,
               }) 
            });
    };

    //add group post
    submitHandler = (event) =>{
        event.preventDefault();
        const post_content = this.postContentEl.current.value;  
        const user_id = this.state.id;
        const group_id = this.groupid; 
        console.log(this.state.id);
        console.log(this.groupid);

        const body = {post_content , user_id , group_id }

        fetch('http://localhost:5000/groupPost' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    deleteGroup = (event) => {
        const id = this.groupid;
        const body = {id}
        if(this.state.type === 2 || this.state.type === 4){
        fetch(`http://localhost:5000/group/${id}` , {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }else{
        window.alert("You dont have the access to Delete this group."); 
    }
    }


    render() {
        var {items} = this.state;
        var {groupposts} = this.state;
        return (
            <div className="container-fluid">
                <GroupImageSection className="mb-4" headerTitle=" "/>
                <br/> <br/>
                    <div className="row">

                        <div className="col-md-3">
                            <div className=" course-navigation">
                                <h6>My Group List</h6>
                                
                                    <ul>
                                    {items.map((item) => (
                                        <li>
                                            <a href="#Content" 
                                            onClick={() => this.handleCourse(item)}>
                                                {item.name}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                    <button className = 'btn btn-danger mr-7' onClick={this.deleteGroup}>Delete</button>
                            </div>
                            <div className=" course-navigation">
                                <h6>Create Group</h6>
                                <ComboBox className='ml-3'
                                      textField="name"
                                      //dataItemKey="id"
                                      data={this.state.courses}
                                      //value={this.state.selectedCourse}
                                      //onChange={this.handleOnChangeCombo}
                                      //name="selectedCourse"
                                      placeholder="Please Select"
                                      ref = {this.cName}
                            />
                            <button className="k-button " onClick={this.onSubmit}>Create</button>
                                
                            </div>
                        </div>

                        <div className="col-md-9">
                        <h6 id={"Content"}> Posts </h6>

                        <form className='d-flex mt-5 mb-5' onSubmit = {this.submitHandler}>
                            <input type = 'text' className = 'form-control ml-1 mr-1 'ref = {this.postContentEl}/>
                            <button className = 'btn btn-primary mr-5'>Add</button>
                        </form>
                        
                        {groupposts.map(grouppost => (
                            <div className='post-card'>
                                <Likes post_id = {grouppost.post_id} id={this.state.id}/>
                                <ThumbsUp post_id = {grouppost.post_id} id={this.state.id}/>
                                <ThumbsDown post_id = {grouppost.post_id} id={this.state.id}/>
                                <div>
                                    <p className='postp'>{grouppost.post_content}</p>
                                    <Replies postid = {grouppost.post_id}/>
                                    <div className='postlabel'>  
                                        <AddReplies postid = {grouppost.post_id} id={this.state.id}/> 
                                    </div>
                                </div> 
                                <DeletePost post_id = {grouppost.post_id} id={this.state.id}/>  
                            </div>  
                       ))}
                        </div>

                    </div>

                    
            </div>
        )
    }


}
export default Group;
