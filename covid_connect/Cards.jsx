import React from 'react';
import './Cards.css';


// connected to the States.js file and clicked
const cards = (props) => {


    return (
        
    <article className="Cards" onClick={props.clicked}>
        <p className="CardDetails">{props.details}</p>
        <h1 className="Font" style={{fontFamily: 'Crimson Text'}}>
       
        {props.state}
        </h1>
        <p className="FontDeaths"><span style={{color: "#AB381F"}}>
        {props.titleDeaths}
        {props.totalDeaths}</span>
        </p>
        <p className="Font3" >
        {props.cdcClaim}
        </p>

    </article>
    )

};
export default cards;

