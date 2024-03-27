import React, { Component } from 'react';
import * as d3 from 'd3';

import './ResultsGraph.css';

class ResultsGraph extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const data = this.props.data;
    const colors = ['blue', 'red'];

    // Scaling
    const maxData =
      this.props.data[0] > this.props.data[1]
        ? this.props.data[0]
        : this.props.data[1];

    console.log('GRAPH Data:', this.props.data);
    console.log('GRAPH Props:', this.props);
    console.log('GRAPH maxData:', maxData);

    const svg = d3
      .select('#results-graph')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => 300 - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', (d, i) => colors[i]);

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => 300 - 10 * d - 3);
  }
  render() {
    return <div id={'#results-graph'}></div>;
  }
}
export default ResultsGraph;
