import React, { Component } from 'react';

class AddReplies extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            id: this.props.id
        }

        this.replayContentEl = React.createRef();
    }

    submitHandler = (event) =>{
        event.preventDefault();
        var post_id = this.props.postid;
        //var user_id = this.props.user_id;
        var user_id = this.state.id;
        const replay_content = this.replayContentEl.current.value;
        const body = {replay_content , user_id , post_id}
        const post_content = this.props.post_text;

        console.log(body);
        fetch('http://localhost:5000/replies' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

                // Replies - Search Integration  **
                const AnswerDetail = this.replayContentEl.current.value;
                const Answer       = "";  // in short
                const Qid          = this.props.postid;
                const AnswerBy     = this.state.id;
                const Question     = post_content;
                const body_Inte    = {AnswerDetail, Answer, Qid, AnswerBy, Question}; 
                fetch('http://ktrans-001-site1.etempurl.com/api/SearchEngSubmit/Answer' , {
                method: 'POST',
                body: JSON.stringify(body_Inte), 
                headers: {
                'Content-Type': 'application/json'
                }
                });
                // END  Replies - Search Integration
    };

    render(){
       // var {isLoaded, items} = this.state;
        return(
            <form onSubmit = {this.submitHandler}>
                <textarea className = 'textarea' ref = {this.replayContentEl}/><br />
                <button className = 'btn btn-primary mt-2 mb-5'>Submit</button>
            </form>
        );
    }
}
export default AddReplies;