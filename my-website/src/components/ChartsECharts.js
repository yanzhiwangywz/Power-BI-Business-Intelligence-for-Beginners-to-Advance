import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ChartsECharts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: 'Monthly Metrics',
      },
      tooltip: {},
      legend: {
        data: ['Value'],
      },
      xAxis: {
        data: ['Jan', 'Feb', 'Mar', 'Apr'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Value',
          type: 'bar',
          data: [100, 150, 120, 180],
          itemStyle: {
            color: '#8884d8',
          },
        },
      ],
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <h2>Monthly Metrics (ECharts)</h2>
      <div ref={chartRef} style={{ width: '600px', height: '300px', marginTop: '20px' }} />
    </div>
  );
};

export default ChartsECharts;