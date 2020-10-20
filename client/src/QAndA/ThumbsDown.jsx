import React, { Component } from 'react';
import { MdThumbDown } from "react-icons/md";
class ThumbsDown extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            id: this.props.id
            
        }
    }

    submitHandler = (event) =>{
        event.preventDefault();
        //var user_id = this.props.user_id;
        
        var user_id = this.state.id;
        var post_id = this.props.post_id;
        var post_user = `${user_id}${post_id}`;
        var thumbs = '0';
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

    componentDidMount(){
        var post_id = this.props.post_id;
        //var postid = 54;
        console.log(post_id);
        fetch('http://localhost:5000/thumbsUp/down/'+post_id)
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
            <div className='iconsallignment'>
            <MdThumbDown size='1rem' className='thumbsUpDownIcone' onClick={this.submitHandler} />
            {items.map(item => (
                    
                    <label>{item.count}</label>
                   
            ))}
            </div>
        );
    }
}
export default ThumbsDown;