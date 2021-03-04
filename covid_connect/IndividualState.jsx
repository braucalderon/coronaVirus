import React, {Component} from 'react';
import axios from 'axios';
import './IndividualState.css';
import NewCases from '../statistics/NewCases';



class IndividualState extends Component {
    state = {
        dataLoaded: [],
        confirmed_death: 'Confirmed Deaths: ',
        total_cases: 'Total Cases: ',
        new_cases: 'New Cases: ',
        new_death: 'New Deaths: ',
        total_deaths: 'Total Deaths: ',
        date: new Date(),
        stateId: null,
        error: false
    }

    // compare props to avoid infinite loops
    componentDidMount () {
        let day = this.state.date.getDate()-2;
        let month = this.state.date.getMonth()+1;
        let year = this.state.date.getFullYear();
        let fullDate = null;

        year = day < 2 && month === 1 ? year-1 : year;
        
        month = month === 1 && day < 2 ? 12 : month;
       
        // console.log(month);

        day = day < 2 ? 30 : day;
        // console.log(day);
        day = day === 1 && month === 3 ? 29 : day;
        month = day === 30 || day === 31 ? month-1 : month; 

        let fixedDay = day < 10 ? '0'+day : day;
        let fixedMonth = month < 10 ? '0'+month : month;
       
        fullDate = year+"-"+fixedMonth+"-"+fixedDay;
        // console.log(fullDate);
        this.loadData(fullDate);
        
    }
    

    loadData(date) {
        axios.get(`https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=${date}T00:00:00.000`)
            .then(response => {
                const stateLoaded = response.data;
                // const updatedStateLoaded = stateLoaded.map(res => {
                //     return {
                //         ...res
                //     }
                // })
                this.setState({dataLoaded: stateLoaded});
                // console.log(response);
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true})
            });
    }
    render(){
        let statePost = <p style={{textAlign: "center"}}>Something went wrong! <p></p><span style={{fontSize: 11}}>Hint: Individual States </span></p>
        if(!this.state.error){
            const d = 'No Data'
            statePost = this.state.dataLoaded.map((res, index) => {
                if(this.props.stateId === res.state){
                    // console.log("Individual State: "+res.state);
                    
                    
                   
                        return(
                                <div key={res.state+index}>
                                    <ul>
                                        <p>{this.state.confirmed_death}{res.conf_death? res.conf_death : d}</p>
                                        <p>{this.state.total_deaths}{res.tot_death? res.tot_death : d}</p>
                                        <p>{this.state.new_cases}<NewCases stateId={res.state} newCases={res.tot_cases}/></p>
                                        <p>{this.state.new_death}{res.new_death? res.new_death : d}</p>
                                        <p>{this.state.total_cases}{res.tot_cases? res.tot_cases : d}</p>
                                        <p className="Font5">Updated:  {(res.submission_date).substring(0,10)}</p>
                                        <p style={{fontSize: "13px"}}>* New Deaths per day</p>
                                        <p style={{fontSize: "13px"}}>* New Cases are compared to data from a month ago</p>         
                                    </ul>
                                </div>            
                        )
                        // console.log("StatePost: " + error);
                }
                else{
                    return null;
                }
                
            })
        }
        return statePost
    }
}
export default IndividualState;