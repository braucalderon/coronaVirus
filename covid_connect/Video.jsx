
import React from 'react';
import './Video.css';


const video = (props) => {

    let videoShow = null;
    if (props.clickedModal) {
        videoShow =
            <iframe className="VideoDimentions" src="https://www.youtube.com/embed/9RcgAXSKQyw"
                frameBorder="0"
                title="CDC News"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowFullScreen">
            </iframe>

    }

    return videoShow

}
export default video;