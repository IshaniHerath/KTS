import React, { Component, Fragment } from 'react';

import {AutoComplete, ComboBox} from '@progress/kendo-react-dropdowns';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import { Button } from '@progress/kendo-react-buttons';
import {TabStrip, TabStripTab} from "@progress/kendo-react-layout";
import avatar from "../userProfile/img_avatar.jpg";
import {MaskedTextBox} from "@progress/kendo-inputs-react-wrapper";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";


import TopBar from './TopBar';
import UserProfile from '../userProfile/UserProfile';
import Course from '../course/Course';
import QAndA from '../QAndA/QAndA';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {

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

                        <TabStrip
                            selected={this.state.selected} onSelect={this.handleSelect}
                        >

                            <TabStripTab title="User Profile">
                                <UserProfile headerTitle=" "/>
                            </TabStripTab>


                            <TabStripTab title="Course Details">
                                <Course headerTitle=" "/>
                            </TabStripTab>


                            <TabStripTab title="Q And A">
                                <QAndA headerTitle=" "/>

                            </TabStripTab>

                        </TabStrip>

                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;
