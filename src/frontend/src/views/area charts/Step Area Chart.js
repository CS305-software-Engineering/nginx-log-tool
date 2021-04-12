import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StepAreaChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: "US Sales"
			},
			axisY: {
				title: "Sales"
			},
			data: [
			{
				type: "stepArea",
				xValueFormatString: "YYYY",
				dataPoints: [
					  { x: new Date(2000, 0), y: 40 },
					  { x: new Date(2001, 0), y: 62 },
					  { x: new Date(2002, 0), y: 53 },
					  { x: new Date(2003, 0), y: 49 },
					  { x: new Date(2004, 0), y: 52 },
					  { x: new Date(2005, 0), y: 32 },
					  { x: new Date(2006, 0), y: 28 },
					  { x: new Date(2007, 0), y: 46 },
					  { x: new Date(2008, 0), y: 55 },
					  { x: new Date(2009, 0), y: 88 },
					  { x: new Date(2010, 0), y: 68 },
					  { x: new Date(2011, 0), y: 63 },
					  { x: new Date(2012, 0), y: 65 },
					  { x: new Date(2013, 0), y: 68 },
					  { x: new Date(2014, 0), y: 48 },
					  { x: new Date(2015, 0), y: 39 },
					  { x: new Date(2016, 0), y: 40 },
					  { x: new Date(2017, 0), y: 46 }
				]
			}
			]
		}
		
		return (
		<div>
			<h1>React Step Area Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StepAreaChart;                           