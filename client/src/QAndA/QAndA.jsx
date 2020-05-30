import React, { Component } from 'react';
import {Textarea, Button, Row} from 'react-materialize';
import QAndAPosts from './QAndAPosts';
import Samplepost from './samplepost';



class QAndA extends Component {

    constructor(props){
        super();
        this.postContentEl = React.createRef();
        this.userIdEl = React.createRef();
    }


    submitHandler = (event) =>{
        event.preventDefault();
        const post_content = this.postContentEl.current.value;
       // const user_id = this.userIdEl.current.value;
        const user_id = 1;
        const body = {post_content , user_id}

        console.log(body);
        fetch('http://localhost:5000/posts' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.reload(false);
    };

    render() {
        return (
            <div>
               <h1 className = 'text-center mt-5'>Q AND A</h1>
                

               <form className='d-flex mt-5 mb-5' onSubmit = {this.submitHandler}>
                   
                    <input type = 'text' 
                        className = 'form-control ml-1 mr-1 '
                        ref = {this.postContentEl}
                    />
                    <button className = 'btn btn-primary mr-5'>Add</button>
               </form>
               <QAndAPosts />
               
               

            </div>
        );
    }
}
export default QAndA;
