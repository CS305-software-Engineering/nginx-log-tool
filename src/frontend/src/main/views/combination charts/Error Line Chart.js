import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ErrorLineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Average Rain Days in London - 2017"
			},
			axisX: {
				interval: 1
			},
			axisY:{
				title: "Number of Days",
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "line",
				name: "Predicted",
				showInLegend: true,
				toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y} days",
				dataPoints: [
				  { y: 19, label: "Jan" },
				  { y: 16, label: "Feb" },
				  { y: 16, label: "Mar" },
				  { y: 16, label: "Apr" },
				  { y: 15, label: "May" },
				  { y: 13, label: "Jun" },
				  { y: 14, label: "Jul" },
				  { y: 13, label: "Aug" },
				  { y: 15, label: "Sep" },
				  { y: 15, label: "Oct" },
				  { y: 17, label: "Nov" },
				  { y: 17, label: "Dec" }
			]
			},
			{
				type: "error",
				name: "Error Range",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]} days",
				dataPoints: [
				  { y: [18, 20], label: "Jan" },
				  { y: [14, 18], label: "Feb" },
				  { y: [15, 17], label: "Mar" },
				  { y: [15, 17], label: "Apr" },
				  { y: [14, 16], label: "May" },
				  { y: [12, 14], label: "Jun" },
				  { y: [13, 15], label: "Jul" },
				  { y: [12, 14], label: "Aug" },
				  { y: [14, 16], label: "Sep" },
				  { y: [14, 16], label: "Oct" },
				  { y: [16, 18], label: "Nov" },
				  { y: [16, 19], label: "Dec" }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Error-Line Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ErrorLineChart;