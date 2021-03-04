import React, { Component } from 'react';
import axios from 'axios';
import './States.css';
import Cards from '../cards/Cards';
import Aux from '../hoc/Aux';
import Modal from '../UI/modal/Modal';
import IndividualState from '../states/IndividualState';
import StateAbbreviation from '../states/StateAbbreviation';
import Button from '@material-ui/core/Button';
import Toolbar from '../toolbar/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Navigation from '../toolbar/Navigation';
import Progress from '../Progress';
import News from '../news/News';

// the architectural of this component is not well executed

class States extends Component {

    state = {
        data_response: [],
        clickedModal: false,
        date: new Date(),
        newDate: null,
        stateId: null,
        error: false,
        NonState: 'FSM',
        checkedBox: true
    }

    componentDidMount() {
        let day = this.state.date.getDate() - 2;
        let month = this.state.date.getMonth() + 1;
        let year = this.state.date.getFullYear();
        let fullDate = null;

        year = day < 2 && month === 1 ? year - 1 : year;
        // console.log(year);
        month = month === 1 && day < 2 ? 12 : month;
        
       
        // console.log(month);
        day = day < 2 ? 30 : day;
        day = day < 2 && month === 3 ? 27 : day;
        
        // console.log(`Stats day: ${day}`);
        // month is a default browser time zone 'change by itself' 
        month = day === 30  ? month-1 : month;

        
        // fixed a single value integer to a two value integer to match the key value in the api
        let fixedDay = day < 10 ? '0' + day : day;
        let fixedMonth = month < 10 ? '0' + month : month;
        // console.log(year);
        fullDate = year + "-" + fixedMonth + "-" + fixedDay;

        // console.log(fullDate);
        this.loadData(fullDate, fixedMonth, fixedDay, year);

        // console.log(year+"-"+fixedMonth+"-"+fixedDay);


    }

    loadData(date, month, day, year) {
        axios.get(`https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=${date}T00:00:00.000`)
            .then(response => {
                const posts = response.data;

                // const update_data = posts.map(post => {
                //     return {
                //         ...post,

                //     }
                // });
                this.setState({
                    data_response: posts.sort(this.compare),
                    newDate: `${month}/${day}/${year}`
                });
                // console.log(response);
                // console.log(this.state.newDate);
            })
            .catch(error => {
                // console.log(error);
                // change error to true
                this.setState({ error: true })


            });
    }


    // sort it alphabetically 
    compare = (a, b) => {
        const stateA = a.state.toUpperCase();
        const stateB = b.state.toUpperCase();

        let comparison = 0;

        if (stateA > stateB) {
            comparison = 1;
        } else if (stateA < stateB) {
            comparison = -1;
        }

        return comparison;
    }

    cardClickedHandler = (id) => {

        this.setState({ clickedModal: true })
        this.setState({ stateId: id })


    }

    cardClickedCancel = () => {
        this.setState({ clickedModal: false })

    }

    onClickedComponentHandler = () => {
        // ev.preventDefault();
        // created state:"variable" on this.props.history
        // variable pass into statistics component 
        // console.log(this.props);

        this.props.history.push({
            pathname: '/statistics',
            state: this.state.stateId
        });
    }

    onClickCheckBoxHandler = (event) => {
        // event.preventDefault();
        // checked is the property in <CheckedBox />
        // target is a reserved variable 
        this.setState({ checkedBox: event.target.checked })
        // console.log(this.state.checkedBox);
        // console.log(event);
    }

    render() {

        let posts = <Progress />
        // <p style={{textAlign: "center"}}>Something went wrong!<p></p>
        // <span style={{fontSize: 11}}>Hint: States</span></p>
        // ------------------------------------------------------------------
        let valueNextDeath = 0;
        let totalValueDeath = 0;
        let valueNextCases = 0;
        let totalValueCases = 0;
        // ------------------------------------------------------------------
        if (!this.state.error) {
            // let valueNext = 0;
            // let totalValue = 0;

            posts = this.state.data_response.map((post, index) => {
                let card = <Progress />;
                if (this.state.NonState !== post.state && this.state.checkedBox) {
                    
                    return card =
                        <Cards key={post.state + index}
                            details={"More details"}
                            state={post.state}
                            totalDeaths={post.tot_death}
                            titleDeaths={'Deaths: '}
                            // date={(post.created_at).substring(0, 10)}
                            // cdcClaim={'Data collected from the CDC'}
                            clicked={() => this.cardClickedHandler(post.state)} />

                } else if (this.state.NonState !== post.state && !this.state.checkedBox) {

                    return card =
                        <div key={post.state + index}>
                            <Cards state={post.state}
                                details={"More details"}
                                // date={(post.created_at).substring(0, 10)}
                                clicked={() => this.cardClickedHandler(post.state)} />
                        </div>

                }
                else {
                    return null;
                }

            })

            Object.values(this.state.data_response).forEach(res => {
                let numDeath = parseInt(res.tot_death, 10);
                let numCases = parseInt(res.tot_cases, 10);
                totalValueDeath = numDeath + valueNextDeath;
                totalValueCases = numCases + valueNextCases;
                valueNextDeath = totalValueDeath;
                valueNextCases = totalValueCases;

            })
            // console.log(totalValue);


        }
        let color = 'red';
        if (this.state.checkedBox) {
            color = '#5A1F12';
        }

        // --------------------------------------------------------------
        return (
            <Aux>

                <Navigation />
                <Toolbar totalDeaths={totalValueDeath} totalCases={totalValueCases}
                    updated={this.state.newDate} />

                <div className="CheckBox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedBox}
                                style={{ color: color }}
                                indeterminate onChange={this.onClickCheckBoxHandler}
                            />
                        }
                        style={{ color: 'black' }}
                        label="Click here to expand or condense details" />

                </div>


                <div className="ContainerState" id="state">
                    <div className="States">
                        {posts}

                    </div>

                    <Modal show={this.state.clickedModal}
                        closedModal={this.cardClickedCancel}>
                        <StateAbbreviation stateId={this.state.stateId} />

                        <IndividualState stateId={this.state.stateId} />

                        <div>
                            <Button className="ButtonGraph"
                                onClick={this.onClickedComponentHandler}>
                                <p>Graph</p>
                            </Button>

                            <Button className="ButtonExit"
                                onClick={this.cardClickedCancel}>
                                <p>Exit</p>
                            </Button>
                        </div>

                    </Modal>

                </div>
                <div className="NewsState">
                    <News />
                </div>


            </Aux>
        )
    }
}
export default States;