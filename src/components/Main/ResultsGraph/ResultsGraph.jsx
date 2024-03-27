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
    let magnitude =
      maxData !== 0 ? Math.floor(Math.log(maxData) / Math.log(10)) : 0;
    let base = Math.floor(maxData / 10 ** magnitude) + 1;
    if (base === 10) {
      base = 1;
      magnitude++;
    }
    const graphScaleMax = base * 10 ** magnitude;
    const scaleFactor = 300 / graphScaleMax;

    console.log('GRAPH Data:', this.props.data);
    console.log('GRAPH Props:', this.props);
    console.log('GRAPH maxData / Magnitude:', maxData, magnitude, base);
    console.log('Graph Scale:', graphScaleMax, scaleFactor);

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
      .attr('x', (d, i) => i * 130 + 80)
      .attr('y', (d, i) => 350 - scaleFactor * d)
      .attr('width', 80)
      .attr('height', (d, i) => d * scaleFactor)
      .attr('fill', (d, i) => colors[i])
      .attr('stroke', 'gold');

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 100 + 75)
      .attr('y', (d, i) => 350 - scaleFactor * d - 3)
      .attr('fill', 'white');

    const testData = data.map((d, i) => {
      return [{ x: i * 130 + 80, y: 350 - scaleFactor * d - 30 }];
    });

    console.log('Test Data:', testData);

    const depthTopsData = [
      [
        { x: 50, y: 50 },
        { x: 100, y: 50 },
        { x: 100, y: 100 },
        { x: 50, y: 100 },
      ],
    ];

    const depthColor = ['darkblue', 'darkred'];

    console.log(
      'Mapped Coords:',
      depthTopsData[0]
        .map((coord) => {
          return [coord.x, coord.y].join(',');
        })
        .join(' ')
    );

    svg
      .selectAll('polygon')
      .data(depthTopsData)
      .enter()
      .append('polygon')
      .attr('points', (d, i) => {
        return d
          .map((coord) => {
            return [coord.x, coord.y].join(',');
          })
          .join(' ');
      })
      .attr('stroke', 'gold')
      .attr('fill', (d, i) => depthColor[i]);
  }
  render() {
    return <div id={'#results-graph'}></div>;
  }
}
export default ResultsGraph;
