import { Component, OnInit, ViewChild, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('BarChart', { static: true }) chartElement: ElementRef;
  @Input() dataSource: any;

  private svg: any;
  private bar: any;
  private dot: any;
  private line: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private xGrooup: any;
  private yGrooup: any;


  width = 650;
  height = 420;
  margin = 60;

  constructor() { }

  ngOnInit() {

    this.renderChart(this.dataSource)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.svg) { return; }
    this.dataSource = changes.dataSource.currentValue;
    this.updateChart(this.dataSource);
  }
  renderChart(data: any) {

    const element = this.chartElement.nativeElement;
    const margin = this.margin;


    this.svg = d3.select(element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('border', '1px solid #159')


    // 比例繪製
    this.xScale = d3.scaleBand()
      .domain(data.map((d: any) => d.id))
      .range([margin, this.width - margin])
      .paddingInner(0.1)
      .paddingOuter(0.5)

    // this.xScale = d3.scaleLinear()
    //   // .domain([0, d3.max(data, d => d.value)])
    //   .domain([0, data.length])
    //   .range([margin, this.width - margin])
    //   .nice();

    this.yScale = d3.scaleLinear()
      // .domain([0, d3.max(data, d => d.value)])
      .domain(d3.extent(data, d => d.value))
      // .domain([0, 100000])
      .range([margin, this.height - margin])
      .nice();

    // 坐標軸定義
    this.xAxis = d3.axisBottom(this.xScale)
      .tickSizeOuter(0)

    this.yAxis = d3.axisLeft(this.yScale)
      .tickSize(this.width - this.margin * 2)


    // 繪製作標
    this.svg.append('g')
      .attr('class', 'xaxis')
      .call(this.xAxis)
      .attr('transform', `translate( 0, ${this.height - this.margin})`)

    this.svg.append('g')
      .attr('class', 'yaxis')
      .call(this.yAxis)
      .attr('transform', `translate( ${this.width - this.margin}, 0)`)

    this.svg.append('g').attr('class', 'bars')
    this.svg.append('g').attr('class', 'dots')

    // this.svg.append('g')
    //   .attr('class', 'brush')
    //   .call(this.brush)



    this.updateChart(data)
  }

  updateChart(data: any) {

    const margin = this.margin;

    // this.xScale.domain([0, data.length]).nice()
    this.xScale.domain(data.map(d => d.id))

    this.yScale
      // .domain([0, 100000])
      // .domain([0, d3.max(data, d => d.value)])
      .domain([d3.max(data, d => d.value), d3.min(data, d => d.value)])
      .range([margin, this.height - margin])
      .nice();

    this.svg.select('.xaxis').call(this.xAxis)
    this.svg.select('.yaxis').call(this.yAxis)

    this.bar = this.svg
      .select('.bars')
      .selectAll('.bar')
      .data(data)

    this.bar
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .merge(this.bar)

      .attr('x', d => this.xScale(d.id))
      .attr('y', d => this.height - this.margin)
      .attr('height', 0)
      .attr('width', this.xScale.bandwidth())
      .transition()
      .duration(1300)
      .attr('fill', 'steelblue')
      .attr('x', d => this.xScale(d.id))
      .attr('y', d => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d, i) => this.height - this.yScale(d.value) - this.margin);


    this.bar.exit().remove();
  }
}
