import React, { Component, Fragment, useEffect , useState } from 'react';
import Replies from './Replies';
import AddReplies from './AddReplies';
import ThumbsUp from './ThumbsUp';
import ThumbsDown from './ThumbsDown';
import Likes from './Likes';
import DeletePost from './DeletePost';


class QAndAPosts extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            id: this.props.id
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
                    <div className='post-card'>
                        <div className='postlabel'>
                            <Likes post_id = {item.post_id} id={this.state.id}/>
                            <ThumbsUp post_id = {item.post_id} id={this.state.id}/>
                            <ThumbsDown post_id = {item.post_id} id={this.state.id}/>
                            <DeletePost post_id = {item.post_id} id={this.state.id}/>
                        </div>
                        <div>
                        <h6 className='postname'>{item.user_name}</h6>
                        </div>
                        <div>
                            <p className='postp'>{item.post_content}</p>
                        </div>  
                        <Replies postid = {item.post_id}/>

                        <div className='postlabel'>  
                            <AddReplies postid = {item.post_id} id={this.state.id}/> 
                        </div> 
                        
                    </div>  
                       ))}
                </div>
            );
        }
    

}
export default QAndAPosts;
