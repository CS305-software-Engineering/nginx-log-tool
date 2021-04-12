import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class RangeSplineAreaChart extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "General Electric Company Stock Price"
			},
			subtitles: [{
				text: "High and Low Prices - 2017"
			}],
			axisY: {
			title: "Stock Price (in USD)",
				includeZero: false,
			prefix: "$"
			},
			data: [{
				type: "rangeSplineArea",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				toolTipContent: "{x}<br><b>High:</b> {y[1]}<br><b>Low:</b> {y[0]}",
				dataPoints: [
					{ x: new Date("2017-01"), y: [29.5, 31.84]},
					{ x: new Date("2017-02"), y: [29.26, 30.59]},
					{ x: new Date("2017-03"), y: [29.25, 30.43]},
					{ x: new Date("2017-04"), y: [28.93, 30.54]},
					{ x: new Date("2017-05"), y: [27.1, 29.31]},
					{ x: new Date("2017-06"), y: [26.79, 29.47]},
					{ x: new Date("2017-07"), y: [25.26, 27.59]},
					{ x: new Date("2017-08"), y: [24.15, 25.89]},
					{ x: new Date("2017-09"), y: [23.58, 25.3]},
					{ x: new Date("2017-10"), y: [20.05, 24.89]},
					{ x: new Date("2017-11"), y: [17.46, 20.75]},
					{ x: new Date("2017-12"), y: [17.25, 18.28]},
				]
			}]
		}
		
		return (
		<div>
			<h1>React Range Area Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default RangeSplineAreaChart;