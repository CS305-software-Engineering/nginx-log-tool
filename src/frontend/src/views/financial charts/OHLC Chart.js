import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class OhlcChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			exportFileName: "Bank-of-America-Corporation-StockChart",
			title:{
				text: "Bank of America Corporation - 2017"
			},
			axisX: {
				interval:1,
				intervalType: "month",
				valueFormatString: "MMM"
			},
			axisY: {
				includeZero:false,
				prefix: "$",
				title: "Price (in USD)"
			},
			data: [{
				type: "ohlc",
				yValueFormatString: "$###0.00",
				xValueFormatString: "MMM YYYY",
				dataPoints: [
					{ x: new Date("2017-01-01"), y: [22.60, 23.55, 22.01, 22.64] },
					{ x: new Date("2017-02-01"), y: [22.97, 24.95, 22.45, 24.68] },
					{ x: new Date("2017-03-01"), y: [25.37, 25.80, 22.16, 23.59] },
					{ x: new Date("2017-04-01"), y: [23.65, 24.35, 22.26, 23.34] },
					{ x: new Date("2017-05-01"), y: [23.52, 24.31, 22.09, 22.41] },
					{ x: new Date("2017-06-01"), y: [22.48, 24.67, 22.07, 24.26] },
					{ x: new Date("2017-07-01"), y: [24.46, 25.11, 23.61, 24.12] },
					{ x: new Date("2017-08-01"), y: [24.29, 25.35, 23.12, 23.89] },
					{ x: new Date("2017-09-01"), y: [23.90, 25.64, 22.75, 25.34] },
					{ x: new Date("2017-10-01"), y: [25.46, 27.98, 25.12, 27.39] },
					{ x: new Date("2017-11-01"), y: [27.64, 28.72, 25.81, 28.17] },
					{ x: new Date("2017-12-01"), y: [28.25, 30.03, 27.50, 29.52] }
				]
			}]
		}
		
		return (
		<div>
			<h1>React OHLC Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default OhlcChart;