import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PyramidChart extends Component {
	render() {
		var dataPoint;
		var total;
		const options = {
			animationEnabled: true,
			title: {
				text: "Sales via Advertisement"
			},
			legend: {
				horizontalAlign: "right",
				verticalAlign: "center",
				reversed: true
			},
			data: [{
				type: "pyramid",
				showInLegend: true,
				legendText: "{label}",
				indexLabel: "{label} - {y}",
				toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
				dataPoints: [
					{ label: "Impressions", y: 2850},
					{ label: "Clicked", y: 2150},
					{ label: "Free Downloads", y: 1900},
					{ label: "Purchase", y: 650},
					{ label: "Renewal", y: 250}
				]
			}]
		}
		//calculate percentage
		dataPoint = options.data[0].dataPoints;
		total = dataPoint[0].y;
		for(var i = 0; i < dataPoint.length; i++) {
			if(i === 0) {
				options.data[0].dataPoints[i].percentage = 100;
			} else {
				options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
			}
		}
		
		return (
		<div>
			<h1>React Pyramid Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PyramidChart;