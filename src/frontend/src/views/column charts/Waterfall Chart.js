import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class WaterfallChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: "Monthly Sales of ACME"
			},
			axisY: {
				valueFormatString: "$#,##0,.K"
			},
			data: [{
				type: "waterfall",
				yValueFormatString: "$#,##0,.00K",
				indexLabelOrientation: "vertical",
				dataPoints: [
					{ label: "Initial", y: 7655 },
					{ label: "Jan", y: 5312 },
					{ label: "Feb", y: 4065 },
					{ label: "Mar", y: -2564 },
					{ label: "Apr", y: 7004},
					{ label: "May", y: 5324 },
					{ label: "Jun", y: -11543 },
					{ label: "July", y: 4008 },
					{ label: "Aug", y: 5673 },
					{ label: "Sep", y: -6997 },
					{ label: "Oct", y: 6654 },
					{ label: "Nov", y: -10943 },
					{ label: "Dec", y: 4324 },
					{ label: "Final", isCumulativeSum: true, indexLabel: "{y}" }
				]
			}]
		}
		
		return (
		<div>
			<h1>React Waterfall Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default WaterfallChart;