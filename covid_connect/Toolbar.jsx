import React from 'react';
import './Toolbar.css';


const toolbar = (props) => {

        return(
                <React.Fragment>
                    <div className="Toolbar">
                        <div className="ToolbarImg"></div>
                        <div className="ToolbarTitle">
                                    <p style={{color: '#B10F0F'}}>Covid-Connect</p>
                                    <p style={{color:'#B10F0F'}}>Daily Fact-Checker</p>
                                    <p className='ToolbarTotal' >{'U.S total deaths: '}<span style={{color:'black', fontFamily:'-moz-initial'}}>
                                    {props.totalDeaths}
                                    </span></p>
                                    <p className='ToolbarTotal' >{'U.S total cases: '}<span style={{color:'black', fontFamily:'-moz-initial'}}>
                                    {props.totalCases}
                                    </span></p>
                                    <p style={{fontSize: '16px'}}>{'Updated: '}{props.updated}</p>     
                        </div>
                    </div>  
                </React.Fragment>  
        )
}
export default toolbar;