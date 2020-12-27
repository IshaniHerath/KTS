import React, { Component } from 'react';
import {Textarea, Button, Row} from 'react-materialize';
import QAndAPosts from './QAndAPosts';
import Samplepost from './samplepost';
import Redirect from "react-router-dom/Redirect";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";




class QAndA extends Component {

    constructor(props){
        super(props);
        this.postContentEl = React.createRef();
        this.userIdEl = React.createRef();
        this.state = {
            id: this.props.id,
            isrender:true,
            type: this.props.type,
            visible: false,
            redirectToLogin: false
        };
    }

    submitHandler = (event) =>{
        event.preventDefault();
        const post_content = this.postContentEl.current.value;
       // const user_id = this.userIdEl.current.value;
        const user_id = this.state.id;
        const body = {post_content , user_id}

        console.log(body);
        fetch('http://localhost:5000/posts' , {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setState({visible: true});
        this.toggleDialog('The Post has been successfully added. Please Re-login to see the changes', 'Success');
        
        // Q&A (General) - Search Integration
        const QuestionDetail = "General : " + this.postContentEl.current.value;
        const UID            = this.state.id;
        const CourseId       = 0; // cant get this ID.  this.cName.current.value.id;
        const body_Inte      = {QuestionDetail, UID, CourseId}; 
        fetch('http://ktrans-001-site1.etempurl.com/api/SearchEngSubmit/Question' , {
        method: 'POST',
        body: JSON.stringify(body_Inte), 
        headers: {
        'Content-Type': 'application/json'
        }
        });
        // END  POST - Search Integration

    };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
        console.log("c");
    };

    redirectToLogin = () => {
        this.setState({
            redirectToLogin: true
        });
    };


    render() {

        if (this.state.redirectToLogin === true) {
            return <Redirect to="/login"/>;
        }

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
               
               <QAndAPosts id={this.state.id} type={this.state.type}/>


               <div>
                    {(this.state.visible === true) && (
                        <Dialog
                            title={this.state.dialogTitle}
                            onClose={this.toggleDialog}
                            width="300px">
                            <p style={{margin: "25px", textAlign: "center"}}>
                                {this.state.dialogMessage}
                            </p>
                            <DialogActionsBar>
                                <button
                                    className="k-button modal-primary"
                                    onClick={
                                        // this.toggleDialog
                                        this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status"
                                            ? this.toggleDialog
                                            : this.redirectToLogin
                                    }>
                                    OK
                                </button>
                                <button className="k-button " onClick={this.toggleDialog}>
                                     Cancel
                                </button>
                            </DialogActionsBar>
                        </Dialog>
                    )}
                </div>
               

            </div>
        );
    }
}
export default QAndA;
