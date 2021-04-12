import React, { Component } from "react";
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartWithIndexLabel extends Component {
  render() {
	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", //"light1", "dark1", "dark2"
		title:{
			text: "Simple Column Chart with Index Labels"
		},
		data: [{
			type: "column", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 71 },
				{ x: 60, y: 68 },
				{ x: 70, y: 38 },
				{ x: 80, y: 92, indexLabel: "Highest" },
				{ x: 90, y: 54 },
				{ x: 100, y: 60 },
				{ x: 110, y: 21 },
				{ x: 120, y: 49 },
				{ x: 130, y: 36 }
			]
		}]
	}
	
	return (
		<div className="ChartWithIndexLabel">
			<h1>React Column Chart With Indexlabel</h1>
			<CanvasJSChart options = {options} 
			/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
	);
  }
}
 
export default ChartWithIndexLabel;