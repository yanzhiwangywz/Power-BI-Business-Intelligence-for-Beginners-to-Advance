// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import Papa from 'papaparse';

// const BarChartFinancialsByCountry = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Fetch and parse the pre-calculated CSV file
//     fetch('/data/BarChartFinancialsByCountry.csv')
//       .then(response => response.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (result) => {
//             const data = result.data;

//             // Extract countries, Sum_Sales, and Sum_COGS directly from CSV
//             const countries = data.map(row => row.Country);
//             const salesData = data.map(row => parseFloat(row.Sum_Sales) || 0);
//             const cogsData = data.map(row => parseFloat(row.Sum_COGS) || 0);

//             setChartData({ countries, salesData, cogsData });
//           },
//           error: (error) => {
//             console.error('Error parsing CSV:', error);
//           },
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching CSV:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (!chartData) return;

//     // Initialize ECharts
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       title: {
//         text: 'Sales and COGS by Country',
//         left: 'center', // Center the title horizontally
//       },
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'shadow',
//         },
//       },
//       legend: {
//         data: ['Sales', 'COGS'],
//         top: '10%', // Position legend below the title
//       },
//       grid: {
//         left: '5%', // Increase left margin for y-axis labels
//         right: '5%', // Adjust right margin for balance
//         bottom: '15%', // Increase bottom margin for rotated x-axis labels
//         containLabel: true, // Ensure labels are contained within the grid
//       },
//       xAxis: {
//         type: 'category',
//         data: chartData.countries,
//         axisLabel: {
//           rotate: 45, // Rotate x-axis labels to prevent overlap
//           interval: 0, // Show all labels, no skipping
//           margin: 10, // Add margin to prevent clipping of rotated labels
//         },
//       },
//       yAxis: {
//         type: 'value',
//         name: '', // No label on y-axis
//         axisLabel: {
//           formatter: function (value) {
//             return value.toLocaleString(); // Format numbers with commas (e.g., 100,000,000)
//           },
//           margin: 12, // Increase margin to move y-axis labels slightly to the right
//         },
//       },
//       series: [
//         {
//           name: 'Sales',
//           type: 'bar',
//           data: chartData.salesData,
//           itemStyle: {
//             color: '#8884d8',
//           },
//           barGap: 0,
//         },
//         {
//           name: 'COGS',
//           type: 'bar',
//           data: chartData.cogsData,
//           itemStyle: {
//             color: '#82ca9d',
//           },
//         },
//       ],
//     };
//     chart.setOption(option);

//     // Cleanup on component unmount
//     return () => {
//       chart.dispose();
//     };
//   }, [chartData]);

//   return (
//     <div>
//       <div ref={chartRef} style={{ width: '600px', height: '400px', marginTop: '20px' }} />
//     </div>
//   );
// };

// export default BarChartFinancialsByCountry;


import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';

const BarChartFinancialsByCountry = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the pre-calculated CSV file
    fetch('/data/BarChart/BarChartFinancialsByCountry.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;
            // Transform CSV data into dataset.source format (array of objects)
            const source = data.map(row => ({
              Country: row.Country,
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
        text: 'Sales and COGS by Country',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: '10%',
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true,
      },
      dataset: {
        // Define dimensions (first is category, others map to series)
        dimensions: ['Country', 'Sales', 'COGS'],
        // Use the transformed data directly from CSV
        source: chartData,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 45,
          interval: 0,
          margin: 10,
        },
      },
      yAxis: {
        type: 'value',
        name: '',
        axisLabel: {
          formatter: function (value) {
            return value.toLocaleString();
          },
          margin: 12,
        },
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: '#8884d8',
          },
          barGap: 0,
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

export default BarChartFinancialsByCountry;
