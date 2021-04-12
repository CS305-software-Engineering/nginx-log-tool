import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedColumnChart extends Component {
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
			exportEnabled: true,
			title: {
				text: "Operating Expenses of ACME",
				fontFamily: "verdana"
			},
			axisY: {
				title: "in Eur",
				prefix: "€",
				suffix: "k"
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "General",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Jan", y: 14 },
					{ label: "Feb", y: 12 },
					{ label: "Mar", y: 14 },
					{ label: "Apr", y: 13 },
					{ label: "May", y: 13 },
					{ label: "Jun", y: 13 },
					{ label: "Jul", y: 14 },
					{ label: "Aug", y: 14 },
					{ label: "Sept", y: 13 },
					{ label: "Oct", y: 14 },
					{ label: "Nov", y: 14 },
					{ label: "Dec", y: 14 }
				]
			},
			{
				type: "stackedColumn",
				name: "Marketing",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Jan", y: 13 },
					{ label: "Feb", y: 13 },
					{ label: "Mar", y: 15 },
					{ label: "Apr", y: 16 },
					{ label: "May", y: 17 },
					{ label: "Jun", y: 17 },
					{ label: "Jul", y: 18 },
					{ label: "Aug", y: 18 },
					{ label: "Sept", y: 17 },
					{ label: "Oct", y: 18 },
					{ label: "Nov", y: 18 },
					{ label: "Dec", y: 18 }
				]
			},
			{
				type: "stackedColumn",
				name: "Sales",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Jan", y: 13 },
					{ label: "Feb", y: 13 },
					{ label: "Mar", y: 15 },
					{ label: "Apr", y: 15 },
					{ label: "May", y: 15 },
					{ label: "Jun", y: 15 },
					{ label: "Jul", y: 16 },
					{ label: "Aug", y: 17 },
					{ label: "Sept", y: 17 },
					{ label: "Oct", y: 18 },
					{ label: "Nov", y: 19 },
					{ label: "Dec", y: 20 },
			]
			},
			{
				type: "stackedColumn",
				name: "IT",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Jan", y: 14 },
					{ label: "Feb", y: 8 },
					{ label: "Mar", y: 6 },
					{ label: "Apr", y: 6 },
					{ label: "May", y: 5 },
					{ label: "Jun", y: 5 },
					{ label: "Jul", y: 6 },
					{ label: "Aug", y: 3 },
					{ label: "Sept", y: 9 },
					{ label: "Oct", y: 5 },
					{ label: "Nov", y: 8 },
					{ label: "Dec", y: 2 },
				]
			}]
		}
		
		return (
		<div>
			<h1>React Stacked Column Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedColumnChart;