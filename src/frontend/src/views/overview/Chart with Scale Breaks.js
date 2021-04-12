import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ChartWithScaleBreaks extends Component {
  	render() {
		const options = {
			animationEnabled: true,
			theme: "dark2",
			title: {
				text: "Worpress Featured Plugins"
			},
			axisY: {
			title: "Active Installations",
				scaleBreaks: {
					autoCalculate: true,
			  type: "wavy",
			  lineColor: "white"
				}
			},
			data: [{
				type: "column",
				indexLabel: "{y}",		
				indexLabelFontColor: "white",
				dataPoints: [
					{"label":"Akismet Anti-Spam","y":5000000},
					{"label":"Jetpack","y":4000000},
					{"label":"WP Super Cache","y":2000000},
					{"label":"bbPress","y":300000},
					{"label":"BuddyPress","y":200000},
					{"label":"Health Check","y":200000}    
				]
			}]
		}
		return (
		  <div className="ChartWithScaleBreaks">
			<h1>React Column Chart With Axis Scale Breaks</h1>
			<CanvasJSChart options = {options} />
		  </div>
		);
	}
}
 
export default ChartWithScaleBreaks;