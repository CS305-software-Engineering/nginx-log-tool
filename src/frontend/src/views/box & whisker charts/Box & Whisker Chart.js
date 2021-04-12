import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class BoxAndWhiskerChart extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Energy in Baked Foods"
			},
			axisY: {
				title: "Energy Per 100 g (kcal/100g)",
				includeZero: false
			},
			data: [{
				type: "boxAndWhisker",
				yValueFormatString: "#,##0.# \"kcal/100g\"",
				dataPoints: [
					{ label: "Bread",  y: [179, 256, 300, 418, 274] },
					{ label: "Cake",  y: [252, 346, 409, 437, 374.5] },
					{ label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
					{ label: "Doughnut",  y: [340, 382, 430, 452, 417] },
					{ label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
					{ label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Box & Whisker Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BoxAndWhiskerChart;