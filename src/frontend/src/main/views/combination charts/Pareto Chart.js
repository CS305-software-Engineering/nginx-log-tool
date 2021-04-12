import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ParetoChart extends Component {
	constructor() {
		super();
		this.createPareto = this.createPareto.bind(this);
	}
	componentDidMount(){
		this.createPareto();
	}
	createPareto(){
		var dps = [];
		var chart = this.chart;
		var yValue, yTotal = 0, yPercent = 0, i;
		for(i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;
		for(i = 0; i < chart.data[0].dataPoints.length; i++){
			yValue = chart.data[0].dataPoints[i].y;
			yPercent += (yValue / yTotal * 100);
			dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.addTo("data",{type:"line", yValueFormatString: "0.##"%"", dataPoints: dps});
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
		chart.axisY2[0].set("maximum", 100);
	}
	render() {
		const options = {
			title:{
				text: "Customer Complaints"
			},
			axisX : {
				title: "Type of Defect"
			},
			axisY: {
				title: "Number of Defects",
				lineColor: "#4F81BC",
				tickColor: "#4F81BC",
				labelFontColor: "#4F81BC"
			},
			axisY2: {
				title: "Percent",
				suffix: "%",
				lineColor: "#C0504E",
				tickColor: "#C0504E",
				labelFontColor: "#C0504E"
			},
			data: [{
				type: "column",
				dataPoints: [
					{ label: "Strain", y: 104 },
					{ label: "Scratch", y: 42 },
					{ label: "Pinhole", y: 20 },
					{ label: "Crack", y: 10 },
					{ label: "Gap", y: 4 },
					{ label: "Others", y: 14 }
				]
			}]
		}
		return (
		<div>
			<h1>React Pareto Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ParetoChart;