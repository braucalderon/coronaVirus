import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import './Chart.css';


const chart = (props) => {

    const titleLabel = props.titleLabel;
    const titleText = props.titleText;
    const labels = props.labels;
    const totals = props.totals;
    const typeDisplay = props.chartDisplay;
    const backgroundColor = props.backgroundColor;

    const chartData = {
      labels: labels,
      datasets : [
          {
              label: titleLabel,
              type: typeDisplay,
              borderWidth: .4,
              data: totals,
              backgroundColor: backgroundColor,
              hoverBorderColor: 'black',
              barThickness: props.thickness,
          }
      ],
      

    }
    // console.log(props.chartData);
    return(
        <div className="Bar">
            <Bar
             data={chartData}
             
             options= {{
                 maintainAspectRatio: false,
                 title:{
                     display:true,
                     text: titleText,
                     fontFamily: 'Crimson Text',
                     fontSize:16
                     
                 },
                 scales:{
                     yAxes:[{
                         stacked: true,
                        
                         ticks:{
                             lineHeight: 2,
                             beginAtZero: true,
                             fontSize:12,
                             
                            //  fontColor: 'green',
                              
                         }
                     }],
                     xAxes:[{
                         stacked: true,
                         ticks:{
                             lineHeight: 2,
                             fontSize: 14,
                             
                             
                            //  fontColor: 'green',
                            //  callback: function(value){
                            //      return value.substring(0,10);
                            //  } 
                         },
                         
                     }]
                 }
             }}        
            >
            </Bar>
        </div>
    );
}
export default chart;