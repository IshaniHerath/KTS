import React, { Component, Fragment } from 'react';

import { AutoComplete } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import { Button } from '@progress/kendo-react-buttons';

class TopBar extends Component {


    render() {
        return (
        <div className="top-bar">
                <div className="page-title">Knowledge Transferring System</div>
                <div className="vertical-menu-seperator" />
                <div className="global-search">
                    <div className="row">
                        <div className="mr-5">
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
                            <Button type="submit" icon="search" look="bare" onClick={this.handleSubmit} />
                            {/*{this.state.isSearchResultVisible && this.globalSearchResult(this.state.searchResult)}*/}
                        </div>
                        <div className="vertical-menu-seperator" />
                    </div>
                </div>
            </div>
        )}
}
export default TopBar;
