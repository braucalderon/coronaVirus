import React from 'react';
import './Backdrop.css';

// clicked connected to Modal.js
const backdrop = (props) => (
    
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
    
);

export default backdrop;