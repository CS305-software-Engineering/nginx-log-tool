import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var startTime = 0, endTime = 0;
class PerformanceDemo extends Component {
  		componentDidMount() {
		endTime = new Date();
		document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
	}
	
	render() {
		var limit = 50000;
		var y = 100;    
		var data = [];
		var dataSeries = { type: "line" };
		var dataPoints = [];
		
		for (var i = 0; i < limit; i += 1) {
			y += Math.round(Math.random() * 10 - 5);
			dataPoints.push({
				x: i,
				y: y
			});
		}
		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
		
		const spanStyle = {
			fontSize: '20px', 
			fontWeight: 'bold', 
			backgroundColor: '#d85757',
			padding: '2px 4px',
			color: '#ffffff'
		}
		
		const options = {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Try Zooming - Panning"
			},
			axisY: {
				includeZero: false
			},
			data: data  // random data
		}
		
		startTime = new Date();
				
		return (
		<div>
			<h1>Performance Demo with 50,000 Datapoints</h1>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			<span id="timeToRender" style={spanStyle}></span>
		</div>
		);
	}
}
 
export default PerformanceDemo;