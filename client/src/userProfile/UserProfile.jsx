import React, { Component, Fragment } from 'react';

import {DatePicker} from '@progress/kendo-dateinputs-react-wrapper';
import {MaskedTextBox} from '@progress/kendo-inputs-react-wrapper';
import { ComboBox, DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
// import {AvatarUploader} from 'react-avatar-uploader';
// import AvatarUploader from '../../src';
import '@progress/kendo-ui';
// import '@progress/kendo-theme-default/all.css';
import '@progress/kendo-theme-default';
// import {BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import {Button} from "./components/Button";
import { Button } from '@progress/kendo-react-buttons';

import {saveUser} from'./UserService';

class UserProfile extends Component {
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


    componentDidMount() {
        window.scrollTo(0, 0);
        this.isMount = true;
        // this.setHeaderTitle();

    }

    handleOnChangeCombo = event => {
        const valueObj = event.target.value;
        const field = event.target.name;

        if (field === 'selectedType' && valueObj) {
            this.setState({
                selectedType: event.target.value,
                // isVisaCountryErrorMessageVisible: false
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isMount) {
                this.setState(
                    () => {
                        var userProfile = {};
                        console.log("1111111111111111111111");

                        const studentProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };

                        const lecturerProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };
                        const otherProfile = {
                            UserName: this.state.fullName,
                            regNumber: this.state.regNumber,
                            Program: this.state.program,
                            Type: this.state.selectedType,
                            Email: this.state.email,
                        };

                        if(this.state.selectedType === 'Student'){
                            console.log("222222222222222222222222222");
                            userProfile = studentProfile;
                        } else if(this.state.selectedType === 'Lecturer'){
                            console.log("333333333333333333333333333333333333");
                            userProfile = lecturerProfile;
                        } else if(this.state.selectedType === 'Other'){
                            console.log("4444444444444444444");
                            userProfile = otherProfile;
                        }

                        console.log("userProfile >> ",userProfile);
                        saveUser(userProfile)
                            .then(res => {
                                console.log("GGGGGGGGGGGGGGGGGGGGGGGGG");
                                this.toggleDialog(`The user is successfully created`, 'Success');
                                this.setState({});
                            })
                    })
            }
      };

    toggleDialog = (message, title) => {
        this.setState({
            visible: !this.state.visible,
            dialogMessage: message,
            dialogTitle: title,
        });
    };


    onClickCancel = event => {
        this.setState({
            fullName: "",
            program: "",
            email: "",
            regNumber: 0,
            selectedType: ""
        })
    };

    handleSelect = (e) => {
        this.setState({selected: e.selected})
    };

    render(){
        return (
            <div className="main-card">

                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h1 className="App-title">Knowledge Transferring System</h1>
                </header>

                <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
                    <TabStripTab title="User Profile">

                        <div className="main-heading">User Details </div>
                        <div className="row">



                            {/*<ImageUploader*/}
                            {/*    withIcon={true}*/}
                            {/*    buttonText='Choose images'*/}
                            {/*    onChange={this.onDrop}*/}
                            {/*    imgExtension={['.jpg', '.gif', '.png', '.gif']}*/}
                            {/*    maxFileSize={5242880}*/}
                            {/*/>*/}

                            {/*<div className="col-md-3 text-center">*/}
                            {/*    <div className="d-inline-block upld-img">*/}
                            {/*        <label className="label-upld-img">Upload Image</label>*/}
                            {/*        <AvatarUploader*/}
                            {/*            size={190}*/}
                            {/*            // uploadURL={apiUrl+'/integration/fileUpload/upload/'}*/}
                            {/*            // fileType={"image/png"}*/}
                            {/*            // withCredentials={true}*/}
                            {/*            // customHeaders={{referenceType:'UserAvatar', referenceId: this.state.userId}}*/}
                            {/*            // defaultImg={`${apiUrl}/integration/fileUpload/download?path=UserAvatar_${this.state.userId}_${encodeURIComponent(this.state.selectedAvatarFile ? this.state.selectedAvatarFile.FileName : null)}`}*/}
                            {/*            // onFinished={this.onFinishedUploadingAvatar}*/}
                            {/*            // placeholder={'Upload Image'}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}


                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">

                                    <div>
                                        <input type="file" onChange={this.handleChange}/>
                                        <img src={this.state.file}/>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="mandatory">
                                            Name:
                                        </label>
                                    </div>

                                    <div className="col-md-7">
                                        <MaskedTextBox
                                           placeholder="Full Name"
                                           value={this.state.fullName}
                                           name="FirstName"
                                           required={true}
                                        /> <br/>
                                    </div>
                                 </div>
                            </div>

                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">
                                       <label className="mandatory">Type:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <ComboBox
                                              data={this.state.types}
                                              value={this.state.selectedType}
                                              onChange={this.handleOnChangeCombo}
                                              name="selectedType"
                                              placeholder="Please Select"
                                              filterable={true}
                                        // onFilterChange={this.filterChangeCombo}
                                        //       popupSettings={this.popupSet}
                                              required={true}
                                         />
                                    </div>
                                </div>
                            </div>


                            {(this.state.selectedType === "Student") && (
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <label htmlFor="" className="mandatory" >Reg Number: </label>
                                        </div>
                                        <div className="col-md-7">
                                            <MaskedTextBox className="mandatory"
                                               placeholder="Register Number"
                                               value={this.state.regNumber}
                                               name="regNumber"
                                               required={true}
                                            // type="Numeric"
                                            // maxLength= '9'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(this.state.selectedType === "Student") && (
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="mandatory">Program:</label>
                                    </div>
                                    <div className="col-md-7" id="statusToolTip">
                                        <MaskedTextBox className="mandatory"
                                           placeholder="Program"
                                           value={this.state.program}
                                           name="Program"
                                           required={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            )}

                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="mandatory">Email:</label>
                                    </div>
                                    <div className="col-md-7" id="statusToolTip">
                                        <MaskedTextBox className="mandatory"
                                           placeholder="example@gmail.com"
                                           value={this.state.email}
                                           name="Email"
                                           required={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 btn-align-right">
                                    <Button
                                        onClick={this.onClickCancel}
                                        type="button"
                                        // buttonStyle="btn--primary--outline"
                                        // buttonSize="btn--medium"
                                        // primary={true}
                                    >
                                        CANCEL
                                    </Button>

                                    <Button
                                        onClick={this.handleSubmit}
                                        type="submit"
                                        primary={true}
                                        // buttonStyle="btn--primary--solid"
                                        // buttonSize="btn--medium"
                                    >
                                        SAVE
                                    </Button>
                                </div>
                            </div>
                            </div>

                        </div>


                        <div className="main-seperator" />
                            <div className="main-heading">My Courses </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-5">
                                                course list here
                                            </div>
                                        </div>
                                    </div>
                                </div>


                    </TabStripTab>

                    <TabStripTab title="Course Details">
                        <p>
                            sdfjuhgf
                        </p>
                    </TabStripTab>
                    <TabStripTab title="Q And A">
                        <p>
                            sdfjuhgf
                        </p>
                    </TabStripTab>
                </TabStrip>



                <div>
                    {this.state.visible === true && (

                        <Dialog
                            title={this.state.dialogTitle}
                            onClose={this.toggleDialog}
                            width="300px">
                            {console.log("OOOOOOOOOOOOOOOOOOOOOOOOO")}

                            <p style={{ margin: "25px", textAlign: "center" }}>
                                {this.state.dialogMessage}
                            </p>
                            <DialogActionsBar>
                                <button
                                    className="k-button modal-primary"
                                    onClick={
                                        this.state.dialogTitle === "Error" || this.state.dialogTitle === "Upload Status"
                                            ? this.toggleDialog
                                            : this.redirectToUserSearch
                                    }>
                                    OK
                                </button>
                            </DialogActionsBar>
                        </Dialog>
                    )}

                </div>

            </div>
        );
    }
}
export default UserProfile;
