import React, {Component} from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';
import cover from './cover3_group.jpg';

class GroupImageSection extends Component {

    readURL_cover(){
        const preview = document.querySelector('#cover-preview');
        // const preview = document.querySelector('photos-preview');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <div className="main-card-cover">
                <div className="col-md-12 ">

                    <img id='cover-preview' src={cover} height="200" alt="" className="main-cover-large"/>
                    {/*<input type="file" onChange={this.readURL_cover} className = "cover-button" />*/}

                </div>
            </div>

        )
    }
}

export default GroupImageSection;
