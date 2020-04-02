import React, { Component } from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import {DatePicker} from '@progress/kendo-dateinputs-react-wrapper';

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,

            //Tab selected
            selected: 0,

            //drop down selected data
            selectedType: null,

            //drop down data
            types: ['Student', 'Lecturer', 'Other'],

        }
    }


    render(){
        return (
            <div>
                {/*mt = margin top mb = margin buttom*/}
                <div className="main-heading mt-4 mb-4"> <b> COURSE DETAILS </b></div>
                <div className="row">
                    <div className="col-md-3 course-navigation">
                        <h6>My Course List</h6>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <h6> EEX6598-Software Construction </h6>
                            <p> Hello and welcome to the course!
                                You have logged into the course on EEI6567 - Software Architecture and Design of the Bachelor of Software Engineering. This course comprises of System software and different areas of operating system management such as Processor management, Memory Management, Device management, File management, Network organization and System management.

                                In this course students will learn how to analyze and design large scale software systems and apply different architecture styles to software design, identify and define quality attributes for a software system, address functional and non-functional requirements in the architecture and measure architecturally significant quality attributes and metrics.

                                This course is comprised of 10 units namely, </p>

                        </div>

                    </div>
                </div>
            </div>
    );
    }
}
export default Course;
