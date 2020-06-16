import React, {Component} from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import {TabStrip, TabStripTab} from "@progress/kendo-react-layout";

import TopBar from './TopBar';
import UserProfile from '../userProfile/UserProfile';
import Course from '../course/Course';
import QAndA from '../QAndA/QAndA';
import Group from '../group/Group';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            status: this.props.status,

            //Tab selected
            selected: 0
        }
    }

    handleSelect = (e) => {
        this.setState({selected: e.selected})
    };

    render(){
        return (

            <div>
                <TopBar headerTitle=" "
                    // displayName={this.props.displayName} logoutCallback={this.props.logoutCallback}
                />

                <div className="container-fluid">
                    <div className="main-card">

                        <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>

                            <TabStripTab title="User Profile">
                                <UserProfile
                                    id={this.state.id}
                                    status={this.state.status}
                                />
                            </TabStripTab>

                            <TabStripTab title="Course Details">
                                <Course
                                    id={this.state.id}
                                    status={this.state.status}
                                />
                            </TabStripTab>

                            <TabStripTab title="Q And A">
                                <QAndA
                                    id={this.state.id}
                                    status={this.state.status}
                                />
                            </TabStripTab>

                            <TabStripTab title="Groups">
                                <Group
                                    id={this.state.id}
                                    status={this.state.status}
                                />
                            </TabStripTab>
                        </TabStrip>
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;
