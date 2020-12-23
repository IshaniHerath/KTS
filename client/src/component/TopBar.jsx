import React, { Component } from 'react';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import { Button } from '@progress/kendo-react-buttons';
import Avatar from '@material-ui/core/Avatar';
import logo from './logo....png';
import dp from './img_avatar.jpg';
import Chip from '@material-ui/core/Chip';
import Tooltip from "@material-ui/core/Tooltip";
import Redirect from "react-router-dom/Redirect";

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //coming from layout.jsx (for non-admin users) and admin.jsx (for admin users)
            userId: this.props.id,
            RedirectToLogin: false,
            firstName: "",
        }
    }

    componentDidMount() {
        this.populateUserDetails()
    }

    handleClick = () => {
        this.setState({
            RedirectToLogin: true
        })
    };

    populateUserDetails() {
        var fullName,firstName = "";
        var id = this.state.userId;

        if(id){
            fetch('http://localhost:5000/userProfile/' + id + '/userName')
                .then(res => res.json())
                .then(respond => {
                        respond.forEach(function (userData) {
                            fullName= userData.username
                        });
                        firstName = fullName.split(' ').slice(0,-1).join(' ');
                    if(!firstName){
                        this.setState({
                            firstName: fullName
                        });
                    }else {
                        this.setState({
                            firstName: firstName
                        });
                    }
                });
        }
    }

    render() {

        if (this.state.RedirectToLogin === true) {
            return <Redirect to="/login"/>;
        }

        return (
            <div className="top-bar">
                <div className = "mt-3 icon">
                    <Avatar alt="Remy Sharp" src={logo}
                        // className={classes.large}
                    />
                </div>

                <div className="mt-3 global-search" >
                    <div className="row">
                        <div className="mr-3">
                            <label>Search:</label>
                        </div>
                        <div className="searchbar">
                            <AutoComplete
                                // data={this.state.opids}
                                textField="UniqueId"
                                name="globalSearch"
                                // value={this.state.globalSearch}
                                // onChange={this.handleChangeGlobalSearch}
                            />
                        </div>
                        <div className="search-btn">
                            <Tooltip title="Search">
                                <Button type="submit" icon="search" look="bare" onClick={this.handleSubmit} />
                                {/*{this.state.isSearchResultVisible && this.globalSearchResult(this.state.searchResult)}*/}
                            </Tooltip>
                        </div>
                        <div className="vertical-menu-seperator" />
                    </div>
                </div>

                <div className="page-title mt-3">Knowledge Transferring System</div>

                <div className = "mt-3 chip-dp">
                    <Tooltip title="Sign Out" >
                        <Chip avatar={<Avatar alt="Natacha" src={dp} />}
                            // avatar={<Avatar>M</Avatar>}
                              label= {this.state.firstName}
                              onClick={this.handleClick}
                        />
                    </Tooltip >
                </div>

                {/*<Tooltip title="Message">*/}
                {/*    <IconButton*/}
                {/*        className = "message-icon"*/}
                {/*        aria-label="account of current user"*/}
                {/*        aria-controls="primary-search-account-menu"*/}
                {/*        aria-haspopup="true"*/}
                {/*        color="inherit"*/}
                {/*    >*/}
                {/*        <Avatar>*/}
                {/*            <Textsms />*/}
                {/*        </Avatar>*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
            </div>
        )}
}
export default TopBar;
