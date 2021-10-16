import React, { Component } from "react";
import Chart from "react-google-charts";

class ChartDiagram extends Component {
  state = {};
  render() {
    const {
      data,
      heading,
      colorList,
      is3d,
      chartType,
      chartWidth,
      chartHt
    } = this.props;
    return (
      <Chart
        width={chartWidth}
        height={chartHt}
        chartType={chartType}
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: heading,
          is3D: is3d,
          colors: colorList
        }}
        rootProps={{ "data-testid": "2" }}
      />
    );
  }
}

export default ChartDiagram;
