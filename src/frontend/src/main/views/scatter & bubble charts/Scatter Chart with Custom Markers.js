import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ScatterChartWithCustomMarkers extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title: {
				text: "Active Users vs Server CPU Utilization"
			},
			axisX: {
				title: "Active Users"
			},
			axisY: {
				title: "CPU Utilization",
				suffix: "%"
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "scatter",
				name: "Server 1",
				markerType: "triangle",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#4F81BC \">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%",
				dataPoints: [
					{ x: 100, y: 10 },
					{ x: 150, y: 15 },
					{ x: 190, y: 17 },
					{ x: 250, y: 19 },
					{ x: 310, y: 21 },
					{ x: 400, y: 25 },
					{ x: 500, y: 40 },
					{ x: 510, y: 50 },
					{ x: 600, y: 30 },
					{ x: 700, y: 35 },
					{ x: 800, y: 40 },
					{ x: 900, y: 45 },
					{ x: 1000, y: 47 },
					{ x: 1100, y: 55 },
					{ x: 1230, y: 51 },
					{ x: 1300, y: 60 },
					{ x: 1330, y: 65 },
					{ x: 1400, y: 70 },
					{ x: 1450, y: 71 },
					{ x: 1500, y: 69 }
				]
			},
			{
				type: "scatter",
				name: "Server 2",
				showInLegend: true,
				markerType: "cross",
				toolTipContent: "<span style=\"color:#C0504E \">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%",
				dataPoints: [
					{ x: 100, y: 25 },
					{ x: 150, y: 35 },
					{ x: 190, y: 35 },
					{ x: 250, y: 40 },
					{ x: 310, y: 45 },
					{ x: 400, y: 42 },
					{ x: 500, y: 57 },
					{ x: 510, y: 67 },
					{ x: 600, y: 40 },
					{ x: 700, y: 46 },
					{ x: 800, y: 50 },
					{ x: 900, y: 60 },
					{ x: 1000, y: 66 },
					{ x: 1100, y: 79 },
					{ x: 1230, y: 60 },
					{ x: 1300, y: 75 },
					{ x: 1330, y: 80 },
					{ x: 1400, y: 82 },
					{ x: 1450, y: 88 },
					{ x: 1500, y: 87 }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Scatter Chart with Custom Markers</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ScatterChartWithCustomMarkers;