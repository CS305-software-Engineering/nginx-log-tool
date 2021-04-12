import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
class ColumnLineAreaChart extends Component {
		constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.addSymbols = this.addSymbols.bind(this);
	}
	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
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
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
				text: "Monthly Sales"
			},
			axisX: {
				valueFormatString: "MMMM"
			},
			axisY: {
				prefix: "$",
				labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: "column",
				name: "Actual Sales",
				showInLegend: true,
				xValueFormatString: "MMMM YYYY",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 27500 },
					{ x: new Date(2017, 1), y: 29000 },
					{ x: new Date(2017, 2), y: 22000 },
					{ x: new Date(2017, 3), y: 26500 },
					{ x: new Date(2017, 4), y: 33000 },
					{ x: new Date(2017, 5), y: 37000 },
					{ x: new Date(2017, 6), y: 32000 },
					{ x: new Date(2017, 7), y: 27500 },
					{ x: new Date(2017, 8), y: 29500 },
					{ x: new Date(2017, 9), y: 43000 },
					{ x: new Date(2017, 10), y: 55000, indexLabel: "High Renewals" },
					{ x: new Date(2017, 11), y: 39500 }
				]
			},{
				type: "line",
				name: "Expected Sales",
				showInLegend: true,
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 38000 },
					{ x: new Date(2017, 1), y: 39000 },
					{ x: new Date(2017, 2), y: 35000 },
					{ x: new Date(2017, 3), y: 37000 },
					{ x: new Date(2017, 4), y: 42000 },
					{ x: new Date(2017, 5), y: 48000 },
					{ x: new Date(2017, 6), y: 41000 },
					{ x: new Date(2017, 7), y: 38000 },
					{ x: new Date(2017, 8), y: 42000 },
					{ x: new Date(2017, 9), y: 45000 },
					{ x: new Date(2017, 10), y: 48000 },
					{ x: new Date(2017, 11), y: 47000 }
				]
			},{
				type: "area",
				name: "Profit",
				markerBorderColor: "white",
				markerBorderThickness: 2,
				showInLegend: true,
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 11500 },
					{ x: new Date(2017, 1), y: 10500 },
					{ x: new Date(2017, 2), y: 9000 },
					{ x: new Date(2017, 3), y: 13500 },
					{ x: new Date(2017, 4), y: 13890 },
					{ x: new Date(2017, 5), y: 18500 },
					{ x: new Date(2017, 6), y: 16000 },
					{ x: new Date(2017, 7), y: 14500 },
					{ x: new Date(2017, 8), y: 15880 },
					{ x: new Date(2017, 9), y: 24000 },
					{ x: new Date(2017, 10), y: 31000 },
					{ x: new Date(2017, 11), y: 19000 }
				]
			}]
		}
		
		return (
		<div>
			<h1>Combination of React Column, Line & Area Charts</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ColumnLineAreaChart;