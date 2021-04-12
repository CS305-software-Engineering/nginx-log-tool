import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class FunnelChartWithCustomization extends Component {
	render() {
		var dataPoint;
		var total;
		const options = {
			theme: "dark2",
			animationEnabled: true,
			title:{
				text: "Recruitment Analysis - July 2016"
			},
			data: [{
				type: "funnel",
				indexLabel: "{label} - {y}",
				toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
				neckWidth: 20,
				neckHeight: 0,
				valueRepresents: "area",
				dataPoints: [
					{ y: 265, label: "Applications" },
					{ y: 134, label: "Interviewed" },
					{ y: 48, label: "Assessment" },
					{ y: 26, label: "Hired" }
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
			<h1>React Funnel Chart with Custom Neck</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default FunnelChartWithCustomization;