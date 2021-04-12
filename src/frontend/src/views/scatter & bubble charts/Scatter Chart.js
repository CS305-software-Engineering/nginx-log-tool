import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ScatterChart extends Component {
	render() {
		const options = {
			theme: "dark2",
			animationEnabled: true,
			zoomEnabled: true,
			title:{
				text: "Ice Cream Sales vs Temperature"
			},
			axisX: {
				title:"Temperature (in °C)",
				suffix: "°C",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY:{
				title: "Sales",
				includeZero: false,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			data: [{
				type: "scatter",
				markerSize: 15,
				toolTipContent: "<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}",
				dataPoints: [
					{ x: 14.2, y: 215},
					{ x: 12.9, y: 175},
					{ x: 16.4, y: 325},
					{ x: 26.9, y: 635},
					{ x: 32.5, y: 464},
					{ x: 22.1, y: 522},
					{ x: 19.4, y: 412},
					{ x: 25.1, y: 614},
					{ x: 34.9, y: 374},
					{ x: 28.7, y: 625},
					{ x: 23.4, y: 544},
					{ x: 31.4, y: 502},
					{ x: 40.8, y: 262},
					{ x: 37.4, y: 312},
					{ x: 42.3, y: 202},
					{ x: 39.1, y: 302},
					{ x: 17.2, y: 408}
				]
			}]
		}
		
		return (
		<div>
			<h1>React Scatter Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ScatterChart;