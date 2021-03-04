import React from 'react';
import Chart from './Chart';

const average = (props) => {
    let totalAverage = 0;
    const totalLength = props.labels.length;
    let average = 0;
    Object.values(props.totals).forEach(res => {
        let total = parseInt(res);
        totalAverage += total;
    })
    
    average = totalAverage / totalLength;
    // console.log(props.chartDisplay);
    // console.log('Total Length: '+totalLength);
    // console.log('totalAverage: ' + totalAverage);
    return (
        <div>
            <Chart
            
                titleText={props.titleText + average.toFixed(0)}
                labels={props.labels}
                chartDisplay={props.chartDisplay}
                totals={props.totals}
                titleLabel={props.titleLabel}
                backgroundColor={props.backgroundColor}
                thickness={props.thickness}

            />

        </div>
    )


}
export default average;