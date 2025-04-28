import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';

const BarChartFinancials = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data/financials.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;

            // Process data to calculate total Sales and COGS per country
            const countryMetrics = data.reduce((acc, curr) => {
              const country = curr.Country;
              if (!acc[country]) {
                acc[country] = { Sales: 0, COGS: 0 };
              }
              acc[country].Sales += parseFloat(curr.Sales) || 0;
              acc[country].COGS += parseFloat(curr.COGS) || 0;
              return acc;
            }, {});

            // Extract countries, Sales, and COGS for the chart
            const countries = Object.keys(countryMetrics);
            const salesData = countries.map(country => countryMetrics[country].Sales);
            const cogsData = countries.map(country => countryMetrics[country].COGS);

            setChartData({ countries, salesData, cogsData });
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
        text: 'Sales and COGS by Country',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Sales', 'COGS'],
        top: '10%', // Position legend below the title (second line)
      },
      xAxis: {
        type: 'category',
        data: chartData.countries,
      },
      yAxis: {
        type: 'value',
        name: 'Amount',
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: chartData.salesData,
          itemStyle: {
            color: '#8884d8',
          },
          barGap: 0,
        },
        {
          name: 'COGS',
          type: 'bar',
          data: chartData.cogsData,
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

export default BarChartFinancials;