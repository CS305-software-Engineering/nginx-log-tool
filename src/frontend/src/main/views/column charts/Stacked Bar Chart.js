import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedBarChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e) {
		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Evening Sales in a Restaurant"
			},
			axisX: {
				valueFormatString: "DDD"
			},
			axisY: {
				prefix: "$"
			},
			toolTip: {
				shared: true
			},
			legend:{
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "stackedBar",
				name: "Meals",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 25), y: 56 },
					{ x: new Date(2018, 5, 26), y: 45 },
					{ x: new Date(2018, 5, 27), y: 71 },
					{ x: new Date(2018, 5, 28), y: 41 },
					{ x: new Date(2018, 5, 29), y: 60 },
					{ x: new Date(2018, 5, 30), y: 75 },
					{ x: new Date(2018, 6, 1), y: 98 }
				]
			},
			{
				type: "stackedBar",
				name: "Snacks",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 25), y: 86 },
					{ x: new Date(2018, 5, 26), y: 95 },
					{ x: new Date(2018, 5, 27), y: 71 },
					{ x: new Date(2018, 5, 28), y: 58 },
					{ x: new Date(2018, 5, 29), y: 60 },
					{ x: new Date(2018, 5, 30), y: 65 },
					{ x: new Date(2018, 6, 1), y: 89 }
				]
			},
			{
				type: "stackedBar",
				name: "Drinks",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 25), y: 48 },
					{ x: new Date(2018, 5, 26), y: 45 },
					{ x: new Date(2018, 5, 27), y: 41 },
					{ x: new Date(2018, 5, 28), y: 55 },
					{ x: new Date(2018, 5, 29), y: 80 },
					{ x: new Date(2018, 5, 30), y: 85 },
					{ x: new Date(2018, 6, 1), y: 83 }
				]
			},
			{
				type: "stackedBar",
				name: "Dessert",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 25), y: 61 },
					{ x: new Date(2018, 5, 26), y: 55 },
					{ x: new Date(2018, 5, 27), y: 61 },
					{ x: new Date(2018, 5, 28), y: 75 },
					{ x: new Date(2018, 5, 29), y: 80 },
					{ x: new Date(2018, 5, 30), y: 85 },
					{ x: new Date(2018, 6, 1), y: 105 }
				]
			},
			{
				type: "stackedBar",
				name: "Takeaway",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 25), y: 52 },
					{ x: new Date(2018, 5, 26), y: 55 },
					{ x: new Date(2018, 5, 27), y: 20 },
					{ x: new Date(2018, 5, 28), y: 35 },
					{ x: new Date(2018, 5, 29), y: 30 },
					{ x: new Date(2018, 5, 30), y: 45 },
					{ x: new Date(2018, 6, 1), y: 25 }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Stacked Bar Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedBarChart;