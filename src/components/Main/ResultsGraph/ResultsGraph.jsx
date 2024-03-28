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

    // render graph lines
    const xLineHeights = [20, 95, 170, 245, 320];
    const xLines = xLineHeights.map((d, i) => {
      return [
        { x: 60, y: d },
        { x: 350, y: d },
      ];
    });

    const zLines = xLineHeights.map((d, i) => {
      return [
        { x: 10, y: d + 50 },
        { x: 60, y: d },
      ];
    });

    const lineData = [
      ...xLines,
      ...zLines,
      [
        { x: 60, y: 320 },
        { x: 60, y: 20 },
      ],
    ];

    svg
      .selectAll('svg')
      .data(lineData)
      .enter()
      .append('polyline')
      .attr('points', (d, i) => {
        return d
          .map((coord) => {
            return [coord.x, coord.y].join(',');
          })
          .join(' ');
      })
      .attr('stroke', 'gold');

    // Render scale text
    const textHeights = [20, 95, 170, 245, 320];
    const textValues = [
      graphScaleMax.toFixed(0),
      (graphScaleMax * 0.75).toFixed(0),
      (graphScaleMax * 0.5).toFixed(0),
      (graphScaleMax * 0.25).toFixed(0),
      (graphScaleMax * 0).toFixed(0),
    ];

    console.log('Text Data:', textValues);

    svg
      .selectAll('svg')
      .data(textValues)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', 10)
      .attr('y', (d, i) => 70 - 3 + i * 75)
      .attr('transform', (d, i) => `rotate(-45 10 ${70 + i * 75})`)
      .attr('fill', 'white');

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
      .selectAll('svg')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 130 + 80 + 40)
      .attr('y', (d, i) => 350 - scaleFactor * d - 3 - 30)
      .attr('fill', 'white');

    // Render 3D tops
    const depthTopsData = data.map((d, i) => {
      return [
        { x: i * 130 + 80 + 30, y: 350 - scaleFactor * d - 30 },
        { x: i * 130 + 80 + 30 + 80, y: 350 - scaleFactor * d - 30 },
        { x: i * 130 + 80 + 80, y: 350 - scaleFactor * d },
        { x: i * 130 + 80, y: 350 - scaleFactor * d },
      ];
    });

    const depthTopColor = ['darkblue', 'darkred'];

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
      .attr('fill', (d, i) => depthTopColor[i]);

    // Render 3D sides
    const depthSideData = data.map((d, i) => {
      return [
        { x: i * 130 + 80 + 80, y: 350 - scaleFactor * d },
        { x: i * 130 + 80 + 30 + 80, y: 350 - scaleFactor * d - 30 },
        { x: i * 130 + 80 + 30 + 80, y: 350 - 30 },
        { x: i * 130 + 80 + 80, y: 350 },
      ];
    });

    const depthSideColor = ['darkblue', 'darkred'];

    svg
      .selectAll('svg')
      .data(depthSideData)
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
      .attr('fill', (d, i) => depthSideColor[i]);
  }
  render() {
    return <div id={'#results-graph'}></div>;
  }
}
export default ResultsGraph;
