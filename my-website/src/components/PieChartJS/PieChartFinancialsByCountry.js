import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';

const PieChartFinancialsByCountry = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data/PieChart/PieChartFinancialsByCountry.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;
            // Transform CSV data into a format suitable for pie chart
            const source = data.map(row => ({
              Country: row.Country,
              Sales: parseFloat(row.Sum_Sales) || 0
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
        text: 'Sales by Country',
        left: 'center', // Center the title horizontally
      },
      tooltip: {
        trigger: 'item', // Tooltip triggered by item (slice of pie)
        formatter: '{a} <br/>{b}: {c} ({d}%)', // Show name, value, and percentage
      },
      legend: {
        orient: 'vertical', // Vertical legend layout
        left: 'left', // Position legend on the left side
        top: 'middle', // Align legend to the middle vertically
      },
      series: [
        {
          name: 'Sales',
          type: 'pie', // Set chart type to pie
          radius: '50%', // Size of the pie chart relative to container
          center: ['50%', '50%'], // Center the pie chart
          data: chartData.map(item => ({
            value: item.Sales,
            name: item.Country
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10, // Shadow effect on hover
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true, // Show labels on pie slices
            formatter: '{b}: {d}%' // Show country name and percentage
          }
        }
      ]
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

export default PieChartFinancialsByCountry;