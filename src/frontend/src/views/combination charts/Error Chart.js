import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ErrorChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "QOS - Survey Result"
			},
			axisY:{
				title: "Response values",
			includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [
			{
				type: "column",
				name: "Avg. Score",
				toolTipContent: "<b>{label}</b> <br> <span style=\"color:#4F81BC\">{name}</span>: {y}",
				dataPoints: [
					{ y: 94, label: "Order Accuracy" },
					{ y: 74, label: "Packaging" },
					{ y: 80, label: "Quantity" },
					{ y: 88, label: "Quality" },
					{ y: 76, label: "Delivery" }
				]
			},
			{
				type: "error",
				name: "Variability Range",
				toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]}",
				dataPoints: [
					{ y: [92, 98], label: "Order Accuracy" },
					{ y: [70, 78], label: "Packaging" },
					{ y: [78, 85], label: "Quantity" },
					{ y: [85, 92], label: "Quality" },
					{ y: [72, 78], label: "Delivery" }
				]
			}
			]
		}
		
		return (
		<div>
			<h1>React Error Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ErrorChart;