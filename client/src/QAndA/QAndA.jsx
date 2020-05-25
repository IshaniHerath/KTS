import React, { Component } from 'react';
<<<<<<< HEAD
import {Textarea, Button, Row} from 'react-materialize';
import QAndAPosts from './QAndAPosts';
import Samplepost from './samplepost';


=======
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
>>>>>>> master

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
               <h1 className = 'text-center mt-5'>Post Page</h1>
<<<<<<< HEAD
                

               <form className='d-flex mt-5 mb-5' onSubmit = {this.submitHandler}>
                   
=======
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />

                <form className='d-flex mt-5 mb-5' onSubmit = {this.submitHandler}>
               
                    <input type = 'text' 
                        className = 'form-control ml-5'
                        ref = {this.userIdEl}
                    />

>>>>>>> master
                    <input type = 'text' 
                        className = 'form-control ml-1 mr-1 '
                        ref = {this.postContentEl}
                    />
                    <button className = 'btn btn-success mr-5'>Add</button>
               </form>
               <QAndAPosts />
               
               

            </div>
        );
    }
}
export default QAndA;
