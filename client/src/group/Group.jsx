import React, {Component, Fragment} from 'react';
import GroupImageSection from "../group/GroupImageSection";

class Group extends Component {


    render() {

        return (
            <div className="container-fluid">
                <GroupImageSection className="mb-4" headerTitle=" "/>

                {/*mt = margin top mb = margin buttom*/}
                <br/> <br/>
                <div className="main-heading mt-10 mb-4"><b> GROUP NAME HERE </b></div>

                <div className="row">

                    <div className="col">
                        <div className="col sub-card">
                            <div className="col-md-12">

                                <div className="main-heading"><b> Personal Details </b></div>

                            </div>
                        </div>
                        <div className="col sub-card">
                            <div className="col-md-12">
                                <div className="main-heading"><b> Hi </b></div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }


}
export default Group;