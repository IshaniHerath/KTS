import React, { Component } from 'react';
import { GoThumbsup } from "react-icons/go";
class ThumbsUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            
        }
    }

    submitHandler = (event) =>{
        event.preventDefault();
        //var user_id = this.props.user_id;
        
        var user_id = 1;
        var post_id = this.props.post_id;
        var post_user = `${user_id}${post_id}`;
        var thumbs = '1';
        const body = {user_id,post_id,post_user,thumbs}

        console.log(body);
        fetch('http://localhost:5000/thumbsUp' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        });
    };


    render(){
        var {isLoaded, items} = this.state;
        return(
            <form onSubmit = {this.submitHandler}>
                <button className = 'btn btn-success mb-5'>Thumbs Up</button>
            </form>
        );
    }
}
export default ThumbsUp;