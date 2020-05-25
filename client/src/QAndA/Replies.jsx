import React, { Component } from 'react';

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
                <div className='box'>
                    <h6>Replies</h6>
                     {items.map(item => (
                        <div>
                            <label>{item.replay_content}</label>
                        </div>   
                       ))}
                </div> 
            );
        }
    

}
export default Replies;
