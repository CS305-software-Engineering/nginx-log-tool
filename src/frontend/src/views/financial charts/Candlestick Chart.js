import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class CandlestickChart extends Component {
	render() {
		const options = {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: "Intel Corporation Stock Price -  2017"
			},
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				includeZero:false,
				prefix: "$",
				title: "Price (in USD)"
			},
			data: [{
				type: "candlestick",
				showInLegend: true,
				name: "Intel Corporation",
				yValueFormatString: "$###0.00",
				xValueFormatString: "MMMM YY",
				dataPoints: [
					{ x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
					{ x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.20] },
					{ x: new Date("2017-03-01"), y: [35.85, 36.30, 34.66, 36.07] },
					{ x: new Date("2017-04-01"), y: [36.19, 37.50, 35.21, 36.15] },
					{ x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
					{ x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
					{ x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
					{ x: new Date("2017-08-01"), y: [35.66, 36.70, 34.38, 35.07] },
					{ x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
					{ x: new Date("2017-10-01"), y: [38.12, 45.80, 38.08, 45.49] },
					{ x: new Date("2017-11-01"), y: [45.97, 47.30, 43.77, 44.84] },
					{ x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] }
				]
			}
		  ]
		}
		
		return (
		<div>
			<h1>React Candlestick Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default CandlestickChart;