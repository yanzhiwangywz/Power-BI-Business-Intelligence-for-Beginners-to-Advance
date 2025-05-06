import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';

const BarChartFinancialsByMonth = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data/BarChart/BarChartFinancialsByMonth.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;
            // Transform CSV data into dataset.source format (array of objects)
            const source = data.map(row => ({
              YearMonth: `${row.Year}-${row['Month Name']}`, // Format as "Year-Month"
              Sales: parseFloat(row.Sum_Sales) || 0,
              COGS: parseFloat(row.Sum_COGS) || 0
            }));
            setChartData(source);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  useEffect(() => {
    if (!chartData) return;

    // Initialize ECharts
    const chart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: 'Sales and COGS by Year-Month',
        left: 'center', // Center the title horizontally
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: '10%', // Position legend below the title
      },
      grid: {
        left: '5%', // Space for y-axis labels
        right: '5%',
        bottom: '15%', // Space for rotated x-axis labels
        containLabel: true, // Ensure labels are contained within the grid
      },
      dataset: {
        // Define dimensions (first is category, others map to series)
        dimensions: ['YearMonth', 'Sales', 'COGS'],
        // Use the transformed data directly from CSV
        source: chartData,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45, // Rotate x-axis labels to prevent overlap
          interval: 0, // Show all labels, no skipping
          margin: 10, // Margin to prevent clipping of rotated labels
        },
      },
      yAxis: {
        type: 'value',
        name: '', // No label on y-axis
        axisLabel: {
          formatter: function (value) {
            return value.toLocaleString(); // Format numbers with commas (e.g., 100,000,000)
          },
          margin: 12, // Move y-axis labels slightly to the right
        },
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: '#8884d8',
          },
          barGap: 0, // No gap between bars of different series (Sales and COGS)
        },
        {
          type: 'bar',
          itemStyle: {
            color: '#82ca9d',
          },
        },
      ],
    };
    chart.setOption(option);

    // Cleanup on component unmount
    return () => {
      chart.dispose();
    };
  }, [chartData]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '600px', height: '400px', marginTop: '20px' }} />
    </div>
  );
};

export default BarChartFinancialsByMonth;
