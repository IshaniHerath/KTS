import React, { Component } from 'react';

class DeletePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            
        }
    }

    submitHandler = (event) =>{
        if(this.state.type === 2 || this.state.type === 4){
            event.preventDefault();
        
            var post_id = this.props.post_id;
            const body = {post_id}
            console.log(body);
            fetch(`http://localhost:5000/posts/${post_id}` , {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            window.alert("You dont have the access to delete this post.");
        }
    };
  
    render(){
        return(
            <div className = 'deleteButton'>
                <button className = 'btn btn-danger' onClick={this.submitHandler}>Delete</button>
            </div>
        );
    }
}
export default DeletePost;
