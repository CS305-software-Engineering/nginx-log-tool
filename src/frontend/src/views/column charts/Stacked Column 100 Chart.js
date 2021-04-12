import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedColumn100Chart extends Component {
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
			animationEnabled: true,
			title:{
				text: "All Time Summer Olympic Medals"
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
					fontSize: 16,
					itemclick: this.toggleDataSeries
			},
			toolTip: {
				shared: true
			},
			data: [
			{
				type: "stackedColumn100",
				name: "Gold",
				showInLegend: true,
				color: "#D4AF37",
				dataPoints: [
					{ label: "United States", y:1118},
					{ label: "Soviet Union", y:473},
					{ label: "Great Britain", y:273},
					{ label: "France", y:243},
					{ label: "Germany", y:269},
					{ label: "Italy", y:243},
					{ label: "Sweden", y:195},
					{ label: "China", y:236},
					{ label: "Russia", y:194},
					{ label: "East Germany", y:192}
				]
			},
			{
				type: "stackedColumn100",
				name: "Silver",
				showInLegend: true,
				color: "#C0C0C0",
				dataPoints: [
					{ label: "United States",	y: 897},
					{ label: "Soviet Union", y: 376},
					{ label: "Great Britain", y: 299},
					{ label: "France", y: 272},
					{ label: "Germany", y: 272},
					{ label: "Italy",	y: 212},
					{ label: "Sweden", y: 210},
					{ label: "China",	y: 189},
					{ label: "Russia", y: 156},
					{ label: "East Germany", y: 165}
				]
			},
			{
				type: "stackedColumn100",
				name: "Bronze",
				showInLegend: true,
				color: "#CD7F32",
				dataPoints: [
					{ label: "United States", y: 789},
					{ label: "Soviet Union", y: 355},
					{ label: "Great Britain", y: 303},
					{ label: "France", y: 310},
					{ label: "Germany",	y: 283},
					{ label: "Italy", y: 236},
					{ label: "Sweden", y: 233},
					{ label: "China", y: 174},
					{ label: "Russia", y: 187},
					{ label: "East Germany", y: 162}
				]
			}
			]
		}
		
		return (
		<div>
			<h1>React Stacked Column 100% Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedColumn100Chart;