import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedBar100Chart extends Component {
		render() {
		const options = {
			title: {
				text: "Popular Majors Opted by Women & Men"
			},
			toolTip: {
				shared: true
			},
			legend: {
				verticalAlign: "top"
			},
			axisY: {
				suffix: "%"
			},
			data: [{
				type: "stackedBar100",
				color: "#9bbb59",
				name: "Women",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Health & Clinical Science",   y: 85 },
					{ label: "Education",   y: 79 },
					{ label: "Psyhcology",   y: 77 },
					{ label: "Language & Literature",   y: 68 },
					{ label: "Communication Tech",   y: 63 },
					{ label: "Art",   y: 61 },
					{ label: "Biomedical Science",   y: 59 },
					{ label: "Social Science & History",   y: 49 },
					{ label: "Business",   y: 49 },
					{ label: "Computer & Info Science",   y: 18 }
				]
			},{
				type: "stackedBar100",
				color: "#7f7f7f",
				name: "Men",
				showInLegend: true,
				indexLabel: "{y}%",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Health & Clinical Science",   y: 15 },
					{ label: "Education",   y: 21 },
					{ label: "Psychology",   y: 23 },
					{ label: "Language & Literature",   y: 32 },
					{ label: "Communication Tech",   y: 37 },
					{ label: "Art",   y: 39 },
					{ label: "Biomedical Science",   y: 41 },
					{ label: "Social Science & History",   y: 51 },
					{ label: "Business",   y: 51 },
					{ label: "Computer & Info Science",   y: 82 }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Stacked Bar 100% Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedBar100Chart;