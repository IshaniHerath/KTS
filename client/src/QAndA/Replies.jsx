import React, { Component } from 'react';
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";

class Replies extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            
        }
    }


    componentDidMount(){
        var postId = this.props.postid;
        fetch('http://localhost:5000/replies/'+postId)
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
                <div className='sub-card'>
                    <h6>Replies</h6>
                     {items.map(item => (
                        <div className='box'>
                            <label>{item.replay_content}</label>
                            <Avatar
                                // onClick={() => this.deleteAnnouncement(item)}
                            >
                                <DeleteIcon style={{float: "right"}}/>
                            </Avatar>
                        </div>
                     ))}
                </div>
            );
        }
    

}
export default Replies;
