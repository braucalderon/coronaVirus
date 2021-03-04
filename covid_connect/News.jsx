import React from 'react';
import { Component } from 'react';
import './News.css';
import Button from '@material-ui/core/Button';
import Modal from '../UI/modal/Modal';
import Video from './Video';


class News extends Component {

    state = {
        clickedModal: false
    }

    onClickedOpenModal = () => {
        this.setState({ clickedModal: true });
    }
    onClickedCloseModal = () => {
        this.setState({ clickedModal: false });
    }

    // let button = null / button disappear once clicked 
    render() {

        let button = null;
        if (!this.state.clickedModal) {
            button =
                <Button className="NewsButton"
                    onClick={this.onClickedOpenModal}>
                    <p className="P_Button">Open News Channel</p>
                </Button>

        }
        
        return (
            <div id="news">
                {button}
                <Modal show={this.state.clickedModal}
                    closedModal={this.onClickedCloseModal} >
                    <Video clickedModal={this.state.clickedModal} />
                    
                    <a href="https://vaers.hhs.gov/" 
                        target="_blank" 
                        className="NewsLink" 
                        rel="noreferrer">Vaccine Adverse Event Reporting System (VAERS)</a>
                    
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety/vsafe.html" 
                        target="_blank" 
                        className="NewsLink" 
                        rel="noreferrer">V-safe After Vaccination Health Checker</a>
                    
                    <Button className="NewsCloseButton"
                    style={{marginTop:'2vh'}}
                        onClick={this.onClickedCloseModal}>
                        <p className="P_Button">Close</p>
                    </Button>
                </Modal>

            </div>
        )
    }
}
export default News;