import React, {Component} from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default';

class UserImageSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null
        }
    }

    handleClick = () => {
        console.info('You clicked the Chip.');
    };

    readURL() {
        const preview = document.querySelector('#preview');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
            // reader.readAsDataURL(file[0]);
        }
    }

    readURL_cover = event => {
        //Calling the fetch Function
        console.log("event cover >>>>>>>>>>>>", event);
        console.log("event.target.files[0] >>> ",event.target.files[0]);
        this.uploadFile(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            // loaded: 0,
        })

        //Preview
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

    uploadFile(files){
        // console.log("files 111111111111111111111111", files)
        fetch('http://localhost:5000/fileUpload/upload', {
            method: 'POST',
            body: JSON.stringify(files),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("res", res)
        })
    }

    render() {
        return (
            <div className="main-card-cover">
                <div className="col-md-12 ">

                    <img id='cover-preview' src="" height="200" alt="" className="main-cover-large"/>
                    <input type="file" onChange={this.readURL_cover} className = "cover-button" />

                    <img id='preview' src="" height="200" alt="" className="main-dp-large"/>
                    <input type="file" onChange={this.readURL} className = "dp-button"/>

                </div>
            </div>

        )
    }
}

export default UserImageSection;
