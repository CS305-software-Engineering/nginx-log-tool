import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import ColumnChartwithIndexlabel from "./overview/Column Chart with Indexlabel";
import ChartWithCrosshair from "./overview/Chart with Crosshair";
import ChartWithZoom from "./overview/Chart with Zoom";
import AnimatedChart from "./overview/Animated Chart";
import MultiseriesChart from "./overview/Multiseries Chart";
import MultipleAxisChart from "./overview/Multiple Axis Chart";
import ChartWithScaleBreaks from "./overview/Chart with Scale Breaks";
import ChartWithLogarithmicAxis from "./overview/Chart with Logarithmic Axis";
import PerformanceDemo from "./overview/Performance Demo";
import ChartWithDrillDown from "./overview/Chart with Drilldown";

import LineChart from "./line charts/Line Chart";
import SplineChart from "./line charts/Spline Chart";
import StepLineChart from "./line charts/Step Line Chart";

import AreaChart from "./area charts/Area Chart";
import MultiSeriesAreaChart from "./area charts/Multi Series Area Chart";
import SplineAreaChart from "./area charts/Spline Area Chart";
import StepAreaChart from "./area charts/Step Area Chart";
import RangeAreaChart from "./area charts/Range Area Chart";
import RangeSplineAreaChart from "./area charts/Range Spline Area Chart";
import StackedAreaChart from "./area charts/Stacked Area Chart";
import StackedArea100Chart from "./area charts/Stacked Area 100 Chart";

import ColumnChart from "./column charts/Column Chart";
import BarChart from "./column charts/Bar Chart";
import RangeColumnChart from "./column charts/Range Column Chart";
import StackedColumnChart from "./column charts/Stacked Column Chart";
import StackedColumn100Chart from "./column charts/Stacked Column 100 Chart";
import RangeBarChart from "./column charts/Range Bar Chart";
import StackedBarChart from "./column charts/Stacked Bar Chart";
import StackedBar100Chart from "./column charts/Stacked Bar 100 Chart";
import WaterfallChart from "./column charts/Waterfall Chart";

import PieChart from "./pie & funnel charts/Pie Chart";
import PieChartWithCustomization from "./pie & funnel charts/Pie Chart with Customization";
import DoughnutChart from "./pie & funnel charts/Doughnut Chart";
import FunnelChart from "./pie & funnel charts/Funnel Chart";
import FunnelChartWithCustomNeck from "./pie & funnel charts/Funnel Chart with Custom Neck";
import PyramidChart from "./pie & funnel charts/Pyramid Chart";

import CandlestickChart from "./financial charts/Candlestick Chart";
import OhlcChart from "./financial charts/OHLC Chart";

import ScatterChart from "./scatter & bubble charts/Scatter Chart";
import ScatterChartWithCustomMarkers from "./scatter & bubble charts/Scatter Chart with Custom Markers";
import BubbleChart from "./scatter & bubble charts/Bubble Chart";

import BoxAndWhiskerChart from "./box & whisker charts/Box & Whisker Chart";
import BoxAndWhiskerChartWithCustomization from "./box & whisker charts/Box & Whisker Chart with Customization";

import ErrorChart from "./combination charts/Error Chart";
import ErrorLineChart from "./combination charts/Error Line Chart";
import ParetoChart from "./combination charts/Pareto Chart";
import ColumnLineAreaChart from "./combination charts/Column Line Area Chart";

import DynamicLineChart from "./dynamic charts/Dynamic Line Chart";
import DynamicColumnChart from "./dynamic charts/Dynamic Column Chart";
import DynamicMultiSeriesChart from "./dynamic charts/Dynamic Multi Series Chart";


class Template extends Component {
  
  render() {    
    return (
		<div>
			<Navbar bg="dark" variant="dark">
				<button className="d-lg-none toggle-sidebar"><span className="navbar-toggler-icon"></span></button>
				<Navbar.Brand href="/">CanvasJS Examples</Navbar.Brand><span className="hidden-xs text-muted">React</span>
			  </Navbar>		  
			  <BrowserRouter>		  
					<Row>
						
						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">
								<ListGroup.Item>
									<a href="#overview" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>OVERVIEW</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="overview">
										<ListGroup.Item> <NavLink exact to="/chart-with-index-label">Chart with Index / Data Label</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink exact to="/chart-zoom-pan">Chart with Zooming / Panning</NavLink></ListGroup.Item>									
										<ListGroup.Item> <NavLink exact to="/animated-chart">Chart with Animation</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink exact to="/multiseries-chart">Multi Series Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink exact to="/chart-with-multiple-axes">Chart with Multiple Axes</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/chart-with-crosshair">Chart with Crosshair</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/chart-axis-scale-break">Chart with Scale Breaks</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/chart-with-logarithmic-axis">Chart with Logarithmic Axis</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/performance-demo-chart">Performance with 50,000 Data Points</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/drilldown-chart">Chart with Drilldown</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#lineCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>LINE CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="lineCharts">
										<ListGroup.Item> <NavLink to="/line-chart">Line Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/spline-chart">Spline Chart</NavLink></ListGroup.Item>									
										<ListGroup.Item> <NavLink to="/step-line-chart">Step Line Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>

								<ListGroup.Item>
									<a href="#areaCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>AREA CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="areaCharts">
										<ListGroup.Item> <NavLink to="/area-chart">Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/multi-series-area-chart">Multi Series Area Chart with Date Time Axis</NavLink></ListGroup.Item>									
										<ListGroup.Item> <NavLink to="/spline-area-chart">Spline Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/step-area-chart">Step Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/range-area-chart">Range Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/range-spline-area-chart">Range Spline Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-area-chart">Stacked Area Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-area-100-chart">Stacked Area 100% Chart</NavLink></ListGroup.Item>									
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#columnCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>COLUMN & BAR CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="columnCharts">
										<ListGroup.Item> <NavLink to="/column-chart">Column Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/bar-chart">Bar Chart</NavLink></ListGroup.Item>									
										<ListGroup.Item> <NavLink to="/range-column-chart">Range Column Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-column-chart">Stacked Column Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-column-100-chart">Stacked Column 100% Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/range-bar-chart">Range Bar Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-bar-chart">Stacked Bar Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/stacked-bar-100-chart">Stacked Bar 100% Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/waterfall-chart">Waterfall Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#pieCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>PIE & FUNNEL CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="pieCharts">
										<ListGroup.Item> <NavLink to="/pie-chart">Pie Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/pie-chart-index-label">PIe Chart with Index Labels Placed Inside</NavLink></ListGroup.Item>									
										<ListGroup.Item> <NavLink to="/doughnut-chart">Doughnut Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/funnel-chart">Funnel Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/funnel-chart-with-custom-neck">Funnel Chart with Custom Neck</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/pyramid-chart">Pyramid Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#financialCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>FINANCIAL CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="financialCharts">
										<ListGroup.Item> <NavLink to="/candlestick-chart">Candlestick Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/ohlc-chart">OHLC Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#scatterCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>SCATTER & BUBBLE CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="scatterCharts">
										<ListGroup.Item> <NavLink to="/scatter-chart">Statter Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/scatter-chart-with-custom-marker">Scatter Chart with Custom Marker</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/bubble-chart">Bubble Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#boxAndWhiskerCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>BOX & WHISKER CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="boxAndWhiskerCharts">
										<ListGroup.Item> <NavLink to="/box-whisker-chart">Box & Whisker Chart</NavLink></ListGroup.Item>										
										<ListGroup.Item> <NavLink to="/box-whisker-chart-with-customization">Box & Whisker Chart with Customization</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#combinationCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>COMBINATION CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="combinationCharts">
										<ListGroup.Item> <NavLink to="/error-chart">Error Chart</NavLink></ListGroup.Item>										
										<ListGroup.Item> <NavLink to="/error-line-chart">Error Line Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/pareto-chart">Pareto Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/column-line-area-chart">Combination of Column, Line & Area Chart Chart</NavLink></ListGroup.Item>
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item>
									<a href="#dynamicCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>DYNAMIC CHARTS</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="dynamicCharts">
										<ListGroup.Item> <NavLink to="/dynamic-line-chart">Dynamic Line Chart</NavLink></ListGroup.Item>										
										<ListGroup.Item> <NavLink to="/dynamic-column-chart">Dynamic Column Chart</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/dynamic-multi-series-chart">Dynamic Multi Series Chart</NavLink></ListGroup.Item>										
									</ListGroup>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
							</ListGroup>
						</Nav>
						
						<Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
							<Container>
								<div className="content">
									<Route exact path="/" component={ColumnChart}/>
									<Route exact path="/chart-with-index-label" component={ColumnChartwithIndexlabel}/>
									<Route path="/chart-with-crosshair" component={ChartWithCrosshair}/>
									<Route path="/chart-zoom-pan" component={ChartWithZoom}/>
									<Route path="/animated-chart" component={AnimatedChart}/>
									<Route path="/multiseries-chart" component={MultiseriesChart}/>
									<Route path="/chart-with-multiple-axes" component={MultipleAxisChart}/>
									<Route path="/chart-axis-scale-break" component={ChartWithScaleBreaks}/>
									<Route path="/chart-with-logarithmic-axis" component={ChartWithLogarithmicAxis}/>
									<Route path="/performance-demo-chart" component={PerformanceDemo}/>
									<Route path="/drilldown-chart" component={ChartWithDrillDown}/>
									
									<Route path="/line-chart" component={LineChart}/>
									<Route path="/spline-chart" component={SplineChart}/>
									<Route path="/step-line-chart" component={StepLineChart}/>
									
									<Route path="/area-chart" component={AreaChart}/>
									<Route path="/multi-series-area-chart" component={MultiSeriesAreaChart}/>
									<Route path="/spline-area-chart" component={SplineAreaChart}/>
									<Route path="/step-area-chart" component={StepAreaChart}/>
									<Route path="/range-area-chart" component={RangeAreaChart}/>
									<Route path="/range-spline-area-chart" component={RangeSplineAreaChart}/>
									<Route path="/stacked-area-chart" component={StackedAreaChart}/>
									<Route path="/stacked-area-100-chart" component={StackedArea100Chart}/>
									
									<Route path="/column-chart" component={ColumnChart}/>
									<Route path="/bar-chart" component={BarChart}/>
									<Route path="/range-column-chart" component={RangeColumnChart}/>
									<Route path="/stacked-column-chart" component={StackedColumnChart}/>
									<Route path="/stacked-column-100-chart" component={StackedColumn100Chart}/>
									<Route path="/range-bar-chart" component={RangeBarChart}/>
									<Route path="/stacked-bar-chart" component={StackedBarChart}/>
									<Route path="/stacked-bar-100-chart" component={StackedBar100Chart}/>
									<Route path="/waterfall-chart" component={WaterfallChart}/>
									
									<Route path="/pie-chart" component={PieChart}/>
									<Route path="/pie-chart-index-label" component={PieChartWithCustomization}/>
									<Route path="/doughnut-chart" component={DoughnutChart}/>
									<Route path="/funnel-chart" component={FunnelChart}/>
									<Route path="/funnel-chart-with-custom-neck" component={FunnelChartWithCustomNeck}/>
									<Route path="/pyramid-chart" component={PyramidChart}/>
									
									<Route path="/candlestick-chart" component={CandlestickChart}/>
									<Route path="/ohlc-chart" component={OhlcChart}/>
									
									<Route path="/scatter-chart" component={ScatterChart}/>
									<Route path="/scatter-chart-with-custom-marker" component={ScatterChartWithCustomMarkers}/>
									<Route path="/bubble-chart" component={BubbleChart}/>
									
									<Route path="/box-whisker-chart" component={BoxAndWhiskerChart}/>
									<Route path="/box-whisker-chart-with-customization" component={BoxAndWhiskerChartWithCustomization}/>
									
									<Route path="/error-chart" component={ErrorChart}/>
									<Route path="/error-line-chart" component={ErrorLineChart}/>
									<Route path="/pareto-chart" component={ParetoChart}/>
									<Route path="/column-line-area-chart" component={ColumnLineAreaChart}/>
									
									<Route path="/dynamic-line-chart" component={DynamicLineChart}/>
									<Route path="/dynamic-column-chart" component={DynamicColumnChart}/>
									<Route path="/dynamic-multi-series-chart" component={DynamicMultiSeriesChart}/>
																		
									
								</div>
							</Container>
						</Col>					
					</Row>			
			  </BrowserRouter>	
			</div>
    );
  }
}

export default Template;