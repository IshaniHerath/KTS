import React, { Component } from 'react';
// import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Replies from './Replies';
import AddReplies from './AddReplies';
import ThumbsUp from './ThumbsUp';
import ThumbsDown from './ThumbsDown';
import Likes from './Likes';

class samplepost extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/posts')
            .then(res => res.json())
            .then(json => {
               this.setState({
                   isLoaded: true,
                   items: json,
               }) 
            });
    }

        render(){
            var {isLoaded, items} = this.state;
            return(
                <div>
                    {items.map(item => (
                    <div className='box'>
                        <p>{item.post_content}
                                <Likes post_id = {item.post_id}/>
                                <ThumbsUp post_id = {item.post_id} />
                                <ThumbsDown post_id = {item.post_id} />
                                <AddReplies postid = {item.post_id} />    
                                <Replies postid = {item.post_id}/>
                        </p>
                    </div>  
                       ))}
                </div>
            );
        }
    

}
export default samplepost;
