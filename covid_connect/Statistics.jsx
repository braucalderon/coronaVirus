import React, { Component } from 'react';
import './Statistics.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ButtonBack from '@material-ui/core/Button';
import StateAbbreviation from '../states/StateAbbreviation';
import Dropdown from './Dropdown';
import * as TDate from './Actions';
import AverageChart from './Average';
import Progress from '../Progress';




class Statistics extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        this.state = {
            test: '',
            data_response: [],
            date: new Date(),
            back: false,
            data: false,
            records: 350,
            state: null,
            defaultValue: 'd',
            error: false,
            month: new Date(),
            open: false,
            open2: false,
            setData: '',
            setData2: '',
            twoDays: [],
            sevenDays: [],
            threeMonths: [],
            sixMonths: [],
            twoDaysDeaths: [],
            twoDaysCases: [],
            sevenDaysCases: [],
            sevenDaysDeaths: [],
            threeMonthsCases: [],
            threeMonthsDeaths: [],
            sixMonthsCases: [],
            sixMonthsDeaths: []

        }


    }

    compareDates = (a, b) => {
        // ascending order based on number of cases 
        return a.tot_cases - b.tot_cases;
    }

    onClickedBackHandler = () => {
        // console.log(this.props);
        // this.props.history.goBack("/statistics");
        this.setState({ back: true })

    }
    onClickOpenHandler2 = () => {
        this.setState({ open2: true });
    }
    onClickCloseHandler2 = () => {
        this.setState({ open2: false })
    }
    onClickChangeHandler2 = (event) => {
        // event.preventDefault();
        this.setState({ setData2: event.target.value });
    }
    onClickHandlerOpen = () => {
        this.setState({ open: true })
    }

    onClickedHandlerClose = () => {
        this.setState({ open: false });
    }

    onChangedHandler = (event) => {
        event.preventDefault();
        this.inputRef.current.focus();
        this.setState({ setData: event.target.value, data: true })
    }

    componentDidMount() {
        // retrieve variable create on states.js onClickedComponentHandler 
        // variable from props.history state:"ND"
        const query = new URLSearchParams(this.props.location);
        const state = query.get('state');  // state from props.history
        this.setState({ state: state })
        // console.log(this.props);
        this.loadData(state);


    }


    loadData(state) {
        axios.get(`https://data.cdc.gov/resource/9mfq-cb36.json?state=${state}`)
            .then(response => {
                const posts = response.data;
                // const post = posts.map(res => {
                //     if(res.submission_date === '2020-05-29T00:00:00.00'){
                //         console.log(res.submission_date);
                //         return res.submission_date;
                //     }

                // })
                this.setState({ data_response: posts.sort(this.compareDates) });

                // console.log(posts);
            })
            .catch(error => {
                // console.log(error);
                // change error to true
                this.setState({ error: true })

            });
    }
    // -----------------------------------------------------------------

    twoDaysData = (totalDeath, totalCases, labelCases, labelDeath) => {

        let day1 = this.state.date.getDate() - 2;
        let day2 = this.state.date.getDate() - 3;
        let month = this.state.date.getMonth() + 1;
        let year = this.state.date.getFullYear();
        let monthFixed = null;
        let dayFixed1 = null;
        // console.log(day1);
        // console.log(day2);
        year = month === 1 && day1 < 1 ? year - 1 : year;
        day1 = day1 < 1 && month === 1 ? 30 : day1;
        day1 = month > 1 && day1 < 1 ? 30 : day1;
        day1 = month === 3 && day1 < 1 ? 29 : day1;
        // console.log('Two days (day one): '+day1);
        month = month === 1 && 1 > day1 ? 12 : month;
        month = month === 3 && day1 === 29 ? 2 : month;
        month = day1 === 31 || day1 === 30 || day1 === 29 ? month-1 : month;
        // console.log(`Two days (month one): ${month}`);
        monthFixed = month < 10 ? '0' + month : month;
        dayFixed1 = day1 < 10 ? '0' + day1 : day1;
        let fullDate1 = `${year}-${monthFixed}-${dayFixed1}${TDate.t_date}`;
        // console.log('Date 1: '+fullDate1);

        // reset year and month and day2
        year = this.state.date.getFullYear();
        month = this.state.date.getMonth() + 1;
        //    console.log(day2);
        year = month === 1 && day2 < 1 ? year - 1 : year;
        day2 = month === 1 && day2 < 0 ? 29 : day2;
        day2 = month === 1 && day2 < 1 ? 30 : day2;
        day2 = month > 1 && day2 < 1 ? 30 : day2;
        day2 = day2 === day1 ? day2 -1 : day2;
        
        // console.log('Two days (day two): '+day2);
        // console.log(year);
        month = month === 1 && day2 < 1 ? 12 : month;
        month = day2 === 31 || day2 === 30 || day2 === 29 ? month-1 : month;
        // console.log('Two days 2(month): '+month);
        monthFixed = month < 10 ? '0' + month : month;
        let dayFixed2 = day2 < 10 ? '0' + day2 : day2;
        let fullDate2 = `${year}-${monthFixed}-${dayFixed2}${TDate.t_date}`;
        // console.log('Date 2: '+fullDate2);
        // console.log(this.state.data_response[i].submission_date);



        Object.values(this.state.data_response).forEach(res => {

            if (res.submission_date === fullDate1 && this.state.twoDays.length < 2) {
                this.state.twoDays.push(res.submission_date.substring(0, 10));
                this.state.twoDaysCases.push(res.tot_cases);
                this.state.twoDaysDeaths.push(res.tot_death);

            }
            if (res.submission_date === fullDate2 && this.state.twoDays.length < 2) {

                this.state.twoDays.push(res.submission_date.substring(0, 10));
                this.state.twoDaysDeaths.push(res.tot_death);
                this.state.twoDaysCases.push(res.tot_cases);

            }
            //  console.log("day1: " + day1);
        })
        // console.log(this.state.twoDays);
    }
    // ----------------------------------------------------------------------
    sevenDaysData = (totalDeath, totalCases, labelCases, labelDeath) => {
        // this.state.sevenDays store the days from the API
        // this.state.sevenDaysCases store total Cases from API
        // get the right date based on the day
        // let day = this.state.date.getDate();
        let day1 = this.state.date.getDate() - 2;
        let day2 = this.state.date.getDate() - 3;
        let day3 = this.state.date.getDate() - 4;
        let day4 = this.state.date.getDate() - 5;
        let day5 = this.state.date.getDate() - 6;
        let day6 = this.state.date.getDate() - 7;
        let day7 = this.state.date.getDate() - 8;
        // ------------------------------------
        // console.log(`Seven days (day1) ${day1}`);
        let month = this.state.date.getMonth() + 1;
        let year = this.state.date.getFullYear();
        // year = month === 1 && day < 8 ? year-1 : year;
        // month = month === 1 && day < 8 ? 12 : month -1;
        // -------------------------------------
        let monthFixed = month < 10 ? '0' + month : month;
        // console.log(day1);
        // -------------------------------------
        let dayFixed1 = day1 < 10 && day1 > 0 ? '0' + day1 : day1;
        let dayFixed2 = day2 < 10 && day2 > 0 ? '0' + day2 : day2;
        let dayFixed3 = day3 < 10 && day3 > 0 ? '0' + day3 : day3;
        let dayFixed4 = day4 < 10 && day4 > 0 ? '0' + day4 : day4;
        let dayFixed5 = day5 < 10 && day5 > 0 ? '0' + day5 : day5;
        let dayFixed6 = day6 < 10 && day6 > 0 ? '0' + day6 : day6;
        let dayFixed7 = day7 < 10 && day7 > 0 ? '0' + day7 : day7;
        // console.log(dayFixed1);
        // --------------------------------------
        let fullDate1 = `${year}-${monthFixed}-${dayFixed1}${TDate.t_date}`;
        let fullDate2 = `${year}-${monthFixed}-${dayFixed2}${TDate.t_date}`;
        let fullDate3 = `${year}-${monthFixed}-${dayFixed3}${TDate.t_date}`;
        let fullDate4 = `${year}-${monthFixed}-${dayFixed4}${TDate.t_date}`;
        let fullDate5 = `${year}-${monthFixed}-${dayFixed5}${TDate.t_date}`;
        let fullDate6 = `${year}-${monthFixed}-${dayFixed6}${TDate.t_date}`;
        let fullDate7 = `${year}-${monthFixed}-${dayFixed7}${TDate.t_date}`;

        // ---------------------------------------
        // console.log(fullDate2);


        // ---------------------------------------

        if (day1 === -1) {
            year = month === 1 && day1 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day1 === -1 ? 12 : monthFixed;
            monthFixed = day1 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            fullDate1 = `${year}-${monthFixed}-${31}${TDate.t_date}`;
            fullDate2 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate3 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            fullDate4 = `${year}-${monthFixed}-${28}${TDate.t_date}`;
            fullDate5 = `${year}-${monthFixed}-${27}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${26}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${25}${TDate.t_date}`;
            // console.log('passed1');
            // console.log(monthFixed);
            // console.log(fullDate1);

        } else if (day2 === -1) {
            year = month === 1 && day2 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day2 === -1 ? 12 : monthFixed;
            monthFixed = day2 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            
            fullDate2 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate3 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            fullDate4 = `${year}-${monthFixed}-${28}${TDate.t_date}`;
            fullDate5 = `${year}-${monthFixed}-${27}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${26}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${25}${TDate.t_date}`;
            // console.log('passed2');

        } else if (day3 === -1) {
            year = month === 1 && day3 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day3 === -1 ? 12 : monthFixed;
            monthFixed = day3 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            fullDate2 = `${year}-${monthFixed}-${31}${TDate.t_date}`;
            fullDate3 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate4 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            fullDate5 = `${year}-${monthFixed}-${28}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${27}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${26}${TDate.t_date}`;
            // console.log('passed3');


        } else if (day4 === -1) {
            year = month === 1 && day4 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day4 === -1 ? 12 : monthFixed;
            monthFixed = day4 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            fullDate3 = `${year}-${monthFixed}-${31}${TDate.t_date}`;
            fullDate4 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate5 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${28}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${27}${TDate.t_date}`;
            // console.log('passed4');

        } else if (day5 === -1) {
            year = month === 1 && day5 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day5 === -1 ? 12 : monthFixed;
            monthFixed = day5 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            fullDate4 = `${year}-${monthFixed}-${31}${TDate.t_date}`;
            fullDate5 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${28}${TDate.t_date}`;
            // console.log('passed5');

            // console.log(monthFixed);
        } else if (day6 === -1) {
            year = month === 1 && day6 === -1 ? year - 1 : year;
            monthFixed = month === 1 && day6 === -1 ? 12 : monthFixed;
            monthFixed = day6 === -1 ? monthFixed-1 : monthFixed;
            monthFixed = monthFixed < 10 ? '0'+monthFixed : monthFixed

            fullDate5 = `${year}-${monthFixed}-${31}${TDate.t_date}`;
            fullDate6 = `${year}-${monthFixed}-${30}${TDate.t_date}`;
            fullDate7 = `${year}-${monthFixed}-${29}${TDate.t_date}`;
            // console.log('passed6');
        }
        // console.log(month -1);
        // console.log(day7);
        // -----------------------------------------
        Object.values(this.state.data_response).forEach(res => {
            if (res.submission_date === fullDate1 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate2 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate3 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate4 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate5 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate6 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate7 && this.state.sevenDays.length < 7) {
                this.state.sevenDays.push(res.submission_date.substring(0, 10));
                this.state.sevenDaysCases.push(res.tot_cases);
                this.state.sevenDaysDeaths.push(res.tot_death);
            }
        })
    }

    // -----------------------------------------------------------------------
    theeMonths = (totalDeath, totalCases, labelCases, labelDeath) => {
        let day = 1;
        let currentDay = this.state.date.getDate();
        let month1 = this.state.date.getMonth() + 1;
        let month2 = this.state.date.getMonth();
        let month3 = this.state.date.getMonth() - 1;
        let year = this.state.date.getFullYear();

        month1 = currentDay === 1 ? month1 -1 : month1;
        
        

        // console.log(`Three month (current day): ${currentDay}`);
        // console.log(`Three month (current month1): ${month1}`);
        // console.log(`Three month (current month2): ${month2}`);
        // console.log(`Three month (current month3): ${month3}`);
        let dayFixed = day < 10 ? '0' + day : day;
        let monthFixed1 = month1 < 10 ? '0' + month1 : month1;
        let monthFixed2 = month2 < 10 ? '0' + month2 : month2;
        let monthFixed3 = month3 < 10 ? '0' + month3 : month3;

        // console.log(year -1);

        let fullDate1 = `${year}-${monthFixed1}-${dayFixed}${TDate.t_date}`;
        let fullDate2 = `${year}-${monthFixed2}-${dayFixed}${TDate.t_date}`;
        let fullDate3 = `${year}-${monthFixed3}-${dayFixed}${TDate.t_date}`;


        // console.log(month1);

        if (month1 === 1) {
            year = this.state.date.getFullYear() - 1;
            month2 = 12;
            month3 = 11;
            fullDate2 = `${year}-${month2}-${dayFixed}${TDate.t_date}`;
            fullDate3 = `${year}-${month3}-${dayFixed}${TDate.t_date}`;
            // console.log(year);
            // console.log('month_passed1');
        }
        if (month2 === 1) {
            year = this.state.date.getFullYear() - 1;
            month3 = 12;
            fullDate3 = `${year}-${month3}-${dayFixed}${TDate.t_date}`;
            // console.log('month_passed2');
        }
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        Object.values(this.state.data_response).forEach(res => {
            if (res.submission_date === fullDate1 && this.state.threeMonths.length < 3) {
                this.state.threeMonths.push(res.submission_date.substring(0, 10));
                this.state.threeMonthsCases.push(res.tot_cases);
                this.state.threeMonthsDeaths.push(res.tot_death);

            }
            if (res.submission_date === fullDate2 && this.state.threeMonths.length < 3) {
                this.state.threeMonths.push(res.submission_date.substring(0, 10));
                this.state.threeMonthsCases.push(res.tot_cases);
                this.state.threeMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate3 && this.state.threeMonths.length < 3) {
                this.state.threeMonths.push(res.submission_date.substring(0, 10));
                this.state.threeMonthsCases.push(res.tot_cases);
                this.state.threeMonthsDeaths.push(res.tot_death);
            }
        })




    }
    // -----------------------------------------------------------------------
    sixMonths = (totalDeath, totalCases, labelCases, labelDeath) => {
        let day = 1;
        let month1 = this.state.date.getMonth() + 1;
        let month2 = this.state.date.getMonth();
        let month3 = this.state.date.getMonth() - 1;
        let month4 = this.state.date.getMonth() - 2;
        let month5 = this.state.date.getMonth() - 3;
        let month6 = this.state.date.getMonth() - 4;
        let year = this.state.date.getFullYear();

        let dayFixed = day < 10 ? '0' + day : day;

        let monthFixed1 = month1 < 10 ? '0' + month1 : month1;
        let monthFixed2 = month2 < 10 ? '0' + month2 : month2;
        let monthFixed3 = month3 < 10 ? '0' + month3 : month3;
        let monthFixed4 = month4 < 10 ? '0' + month4 : month4;
        let monthFixed5 = month5 < 10 ? '0' + month5 : month5;
        let monthFixed6 = month6 < 10 ? '0' + month6 : month6;



        // console.log(year -1);

        let fullDate1 = year + '-' + monthFixed1 + '-' + dayFixed + TDate.t_date;
        let fullDate2 = year + '-' + monthFixed2 + '-' + dayFixed + TDate.t_date;
        let fullDate3 = year + '-' + monthFixed3 + '-' + dayFixed + TDate.t_date;
        let fullDate4 = year + '-' + monthFixed4 + '-' + dayFixed + TDate.t_date;
        let fullDate5 = year + '-' + monthFixed5 + '-' + dayFixed + TDate.t_date;
        let fullDate6 = year + '-' + monthFixed6 + '-' + dayFixed + TDate.t_date;

        // ------------------------------------------------------------------



        // ------------------------------------------------------------------

        if (month1 === 1) {
            year = this.state.date.getFullYear() - 1;
            month2 = 12;
            month3 = 11;
            month4 = 10;
            month5 = 9;
            month6 = 8;
            fullDate2 = `${year}-${month2}-${dayFixed}${TDate.t_date}`;
            fullDate3 = `${year}-${month3}-${dayFixed}${TDate.t_date}`;
            fullDate4 = `${year}-${month4}-${dayFixed}${TDate.t_date}`;
            fullDate5 = `${year}-0${month5}-${dayFixed}${TDate.t_date}`;
            fullDate6 = `${year}-0${month6}-${dayFixed}${TDate.t_date}`;

            // console.log(fullDate4);
            console.log('seven day month 1 passed');
        }
        if (month2 === 1) {
            year = this.state.date.getFullYear() - 1;
            
            month3 = 12;
            month4 = 11;
            month5 = 10;
            month6 = 9;
            fullDate3 = `${year}-${month3}-${dayFixed}${TDate.t_date}`;
            fullDate4 = `${year}-${month4}-${dayFixed}${TDate.t_date}`;
            fullDate5 = `${year}-${month5}-${dayFixed}${TDate.t_date}`;
            fullDate6 = `${year}-0${month6}-${dayFixed}${TDate.t_date}`;
            // console.log('seven days month 2 passed');
            // console.log(fullDate5);
        }
        if (month3 === 1) {
            year = this.state.date.getFullYear() - 1;
            month4 = 12;
            month5 = 11;
            month6 = 10;
            fullDate4 = `${year}-${month4}-${dayFixed}${TDate.t_date}`;
            fullDate5 = `${year}-${month5}-${dayFixed}${TDate.t_date}`;
            fullDate6 = `${year}-${month6}-${dayFixed}${TDate.t_date}`;
            // console.log('seven days month 3 passed');

        }
        if (month4 === 1) {
            year = this.state.date.getFullYear() - 1;
            month5 = 12;
            month6 = 11;
            fullDate5 = `${year}-${month5}-${dayFixed}${TDate.t_date}`;
            fullDate6 = `${year}-${month6}-${dayFixed}${TDate.t_date}`;
            // console.log('seven days month 4 passed');

        }
        if (month5 === 1) {
            year = this.state.date.getFullYear() - 1;
            month6 = 12;
            fullDate6 = `${year}-${month6}-${dayFixed}${TDate.t_date}`;

        }
        Object.values(this.state.data_response).forEach(res => {
            if (res.submission_date === fullDate1 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate2 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate3 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate4 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate5 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
            if (res.submission_date === fullDate6 && this.state.sixMonths.length < 6) {
                this.state.sixMonths.push(res.submission_date.substring(0, 10));
                this.state.sixMonthsCases.push(res.tot_cases);
                this.state.sixMonthsDeaths.push(res.tot_death);
            }
        })
    }


    // -----------------------------------------------------------------------
    render() {
        let backgroundColorCases = '#DDB124';
        let backgroundColorDeaths = '#9C3416';
        let chartTypeDisplay = 'bar';
        let textDeaths = ' Average fatal cases: '
        let textCases = ' Average confirmed cases: ';
        let labelTitle = 'Per Month';
        let chartBarThickness = 25;
        let redirect = null;
        let hint = null;
        let progress = null;
        let chart1 = <Progress />;
        let chart2 = <Progress />;
        let explanation = null;
        let statement = null;
        let statement1 = null;
        
        if (this.state.back) {
            redirect = <Redirect to='/' />
        }
        // let default =  <p>Something went wrong!! <span>Hint: Statistics</span> </p>;
        let labelDeath = null;
        let totalDeath = null;
        let labelCases = null;
        let totalCases = null;

        labelDeath = this.state.data_response.map(res => res.submission_date > '2020-02-29T00:00:00.00' ? res.submission_date.substring(0, 10) : '');

        totalDeath = this.state.data_response.map(res => res.tot_death);

        labelCases = this.state.data_response.map(res => res.submission_date > '2020-02-29T00:00:00.00' ? res.submission_date.substring(0, 10) : '');

        totalCases = this.state.data_response.map(res => res.tot_cases);

        // ----------------------------------------------------------------
        if (this.state.setData === 'one') {
            chartBarThickness = 55;
            labelTitle = 'Per Day';
            this.twoDaysData(totalDeath, totalCases, labelCases, labelDeath);
            // console.log(this.props);
            labelDeath = this.state.twoDays.map(res => res);
            labelCases = this.state.twoDays.map(res => res);
            totalDeath = this.state.twoDaysDeaths.map(res => res);
            totalCases = this.state.twoDaysCases.map(res => res);

        }
        if (this.state.setData2 === 'one') {
            chartTypeDisplay = 'line';
        }
        // ------------------------------------------------------------------
        if (this.state.setData === 'two') {
            chartBarThickness = 30;
            labelTitle = 'Per Day';
            this.sevenDaysData(totalDeath, totalCases, labelCases, labelDeath);
            labelDeath = this.state.sevenDays.map(res => res);
            labelCases = this.state.sevenDays.map(res => res);
            totalDeath = this.state.sevenDaysDeaths.map(res => res);
            totalCases = this.state.sevenDaysCases.map(res => res);
        }
        if (this.state.setData2 === 'two') {
            chartTypeDisplay = 'scatter';
            // console.log(chartTypeDisplay);
        }
        // --------------------------------------------------------------------
        if (this.state.setData === 'three') {
            chartBarThickness = 55;
            this.theeMonths(totalDeath, totalCases, labelCases, labelDeath);
            labelDeath = this.state.threeMonths.map(res => res);
            labelCases = this.state.threeMonths.map(res => res);
            totalDeath = this.state.threeMonthsDeaths.map(res => res);
            totalCases = this.state.threeMonthsCases.map(res => res);

        }
        // ----------------------------------------------------------------------
        if (this.state.setData === 'four') {
            chartBarThickness = 40;
            this.sixMonths(totalDeath, totalCases, labelCases, labelDeath);
            labelDeath = this.state.sixMonths.map(res => res);
            labelCases = this.state.sixMonths.map(res => res);
            totalDeath = this.state.sixMonthsDeaths.map(res => res);
            totalCases = this.state.sixMonthsCases.map(res => res);

        }


        if (this.state.error || this.state.state === null || totalCases === null ||
            totalDeath === null || labelCases === null || labelDeath === null) {
            progress = <Progress />;
            hint = <p style={{ fontSize: '10px' }}>Something went wrong!! <span>Hint: Statistics</span> </p>;


        } else {

            chart1 =
                <AverageChart
                    labels={labelCases}
                    chartDisplay={chartTypeDisplay}
                    totals={totalCases}
                    titleLabel={labelTitle}
                    titleText={textCases}
                    backgroundColor={backgroundColorCases}
                    thickness={chartBarThickness}
                />
            // console.log(chartTypeDisplay);
            

            chart2 =
                <AverageChart

                    labels={labelDeath}
                    chartDisplay={chartTypeDisplay}
                    totals={totalDeath}
                    titleLabel={labelTitle}
                    titleText={textDeaths}
                    backgroundColor={backgroundColorDeaths}
                    thickness={chartBarThickness}
                />
            
            explanation = <p style={{ fontSize: '17px', fontFamily: 'Crimson Text', marginBottom: '0', textAlign: 'center' }}>Data is sorted in ascending order based on total cases.</p>
            statement = <p style={{ fontSize: '17px', fontFamily: 'Crimson Text', marginTop: '0', marginBottom: '0', textAlign: 'center' }}>Data might be repeated due to server updates,</p>
            statement1 = <p style={{ fontSize: '17px', fontFamily: 'Crimson Text', marginTop: '0', textAlign: 'center' }}>which could be visible twice in the chart.</p>


        }


        return (
            <React.Fragment>


                {redirect}

                <div className="ButtonDiv">
                    <ButtonBack className="ButtonStatistics"
                        onClick={this.onClickedBackHandler}
                        style={{ color: 'white', fontSize: '10px', fontFamily: 'Crimson Text', }}>
                        Check States
                    </ButtonBack>

                </div>
                <div className="ProStatistics">

                    <div className="TitleStatistics">
                        <StateAbbreviation stateId={this.state.state} />
                    </div>
                    <div className="StatisticsDropdown">

                        <Dropdown ref={this.inputRef}
                            clickedOpen={this.onClickHandlerOpen}
                            open={this.state.open}
                            clickedClose={this.onClickedHandlerClose}
                            changedSetData={this.state.setData}
                            changedHandler={this.onChangedHandler}
                            selectedTitle={'Compare Data'}
                            inputTitle={'Days & Months'}
                            menuTitleOne={'2 days'}
                            menuTitleTwo={'7 days'}
                            menuTitleThree={'3 months'}
                            menuTitleFour={'6 months'}
                        />
                        <Dropdown
                            clickedOpen={this.onClickOpenHandler2}
                            open={this.state.open2}
                            clickedClose={this.onClickCloseHandler2}
                            changedSetData={this.state.setData2}
                            changedHandler={this.onClickChangeHandler2}
                            selectedTitle={'Scale Graphs'}
                            inputTitle={'Graph'}
                            menuTitleOne={'Linear Scale'}
                            menuTitleTwo={'Scatter Scale'}

                        />

                    </div>



                    <div className="ChartStatistics">
                        {progress}
                        {chart1}
                        {chart2}


                    </div>
                    {explanation}
                    {statement}
                    {statement1}
                    {this.state.newDate}
                    {hint}




                </div>


            </React.Fragment>
        )
    }

}
export default Statistics;