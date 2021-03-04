import React, {Component} from 'react';
import axios from 'axios';
import './StateAbbreviation.css';



class StateAbbreviation extends Component{

    state = {
        data_response: [],
        error: false,
        stateId: null
    
    }
    
    componentDidMount () {
        axios.get('https://raw.githubusercontent.com/braucalderon/react/main/covid_connect/state_title.json')
            .then(response => {
                const res = response.data;
                this.setState({data_response: res})
                // console.log(res);
                
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            }); 
    }
    
    render(){
        
        let post = <p style={{textAlign: "center"}}>Something went wrong!<p></p><span style={{fontSize: 11}}>Hint: StateAbbreviation</span></p>
        
        if(!this.state.error){
            post = this.state.data_response.map((res, index) => {
                    if(this.props.stateId === res.state_id){
                        // console.log(this.props);  

                        return (
                                <p key={(res.State+index).toString()}
                                className="Font1">{res.State}</p> 
                        )
                    }else{
                        return null;
                    }
            })
        }
        return post
        
    }
}
export default StateAbbreviation;