import React, { Component } from 'react';

class AddReplies extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            
        }

        this.replayContentEl = React.createRef();
    }

    submitHandler = (event) =>{
        event.preventDefault();
        var post_id = this.props.postid;
        //var user_id = this.props.user_id;
        var user_id = 1;
        const replay_content = this.replayContentEl.current.value;
        const body = {replay_content , user_id , post_id}

        console.log(body);
        fetch('http://localhost:5000/replies' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    render(){
       // var {isLoaded, items} = this.state;
        return(
            <form onSubmit = {this.submitHandler}>
                <textarea className = 'textarea' ref = {this.replayContentEl}/>
                <button className = 'btn btn-outline-primary mt-2 mb-5'>Submit</button>
            </form>
        );
    }
}
export default AddReplies;