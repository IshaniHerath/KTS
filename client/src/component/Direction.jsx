import React, {Component} from 'react';
import Redirect from "react-router-dom/Redirect";

class Direction extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.id == 0) {
            return <Redirect to={"/login"}/>;
        } else {
            return <Redirect to={"/" + this.props.id}
            />
        }
    }

}

export default Direction;