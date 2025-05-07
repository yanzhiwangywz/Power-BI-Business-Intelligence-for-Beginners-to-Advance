// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import Papa from 'papaparse';

// const PieChartFinancialsByCountryYear = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Fetch and parse the CSV file
//     fetch('/data/PieChart/PieChartFinancialsByCountryYear.csv')
//       .then(response => response.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (result) => {
//             const data = result.data;
//             // Transform CSV data into a format suitable for pie chart
//             const source = data.map(row => ({
//               Country: row.Country,
//               Year: row.Year,
//               Sales: parseFloat(row.Sum_Sales) || 0
//             }));
//             setChartData(source);
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

//     // Extract unique countries from the data
//     const uniqueCountries = [...new Set(chartData.map(item => item.Country))];
    
//     // Define a color palette (you can expand this list for more countries)
//     const colorPalette = [
//       '#FF6B6B', // Red shade
//       '#4ECDC4', // Turquoise shade
//       '#45B7D1', // Blue shade
//       '#96CEB4', // Green shade
//       '#FFEEAD', // Yellow shade
//       '#D4A5A5', // Additional color
//       '#9B59B6', // Additional color
//       '#3498DB'  // Additional color
//     ];
    
//     // Dynamically map colors to countries
//     const countryColors = {};
//     uniqueCountries.forEach((country, index) => {
//       // Use modulo to cycle through colors if there are more countries than colors
//       countryColors[country] = colorPalette[index % colorPalette.length];
//     });

//     // Initialize ECharts
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       title: {
//         text: 'Sales by Country and Year',
//         left: 'center', // Center the title horizontally
//       },
//       tooltip: {
//         trigger: 'item', // Tooltip triggered by item (slice of pie)
//         formatter: '{a} <br/>{b}: {c} ({d}%)', // Show name, value, and percentage
//       },
//       series: [
//         {
//           name: 'Sales',
//           type: 'pie', // Set chart type to pie
//           radius: '50%', // Size of the pie chart relative to container
//           center: ['50%', '50%'], // Center the pie chart
//           data: chartData.map(item => ({
//             value: item.Sales,
//             name: `${item.Country} (${item.Year})`, // Combine Country and Year for label
//             itemStyle: {
//               color: countryColors[item.Country], // Assign color based on country dynamically
//               borderColor: 'white', // White border to separate slices
//               borderWidth: 1 // Border width for visibility
//             }
//           })),
//           emphasis: {
//             itemStyle: {
//               shadowBlur: 10, // Shadow effect on hover
//               shadowOffsetX: 0,
//               shadowColor: 'rgba(0, 0, 0, 0.5)'
//             }
//           },
//           label: {
//             show: true, // Show labels on pie slices
//             formatter: '{b}: {d}%', // Show country, year, and percentage
//             fontSize: 12, // Adjust font size for readability
//             position: 'outside', // Place labels outside the pie for clarity
//             alignTo: 'labelLine' // Align labels with lines for neatness
//           },
//           labelLine: {
//             show: true, // Show lines connecting labels to slices
//             length: 15, // Length of the first segment of the line
//             length2: 10 // Length of the second segment of the line
//           }
//         }
//       ]
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

// export default PieChartFinancialsByCountryYear; 




import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';

const PieChartFinancialsByCountryYear = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data/PieChart/PieChartFinancialsByCountryYear.csv')
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
              Year: row.Year,
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

    // Define color mapping for each country
    const countryColors = {
      'Canada': '#FF6B6B', // Red shade
      'France': '#4ECDC4', // Turquoise shade
      'Germany': '#45B7D1', // Blue shade
      'Mexico': '#96CEB4', // Green shade
      'United States of America': '#FFEEAD' // Yellow shade
    };

    // Initialize ECharts
    const chart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: 'Sales by Country and Year',
        left: 'center', // Center the title horizontally
      },
      tooltip: {
        trigger: 'item', // Tooltip triggered by item (slice of pie)
        formatter: '{a} <br/>{b}: {c} ({d}%)', // Show name, value, and percentage
      },
      series: [
        {
          name: 'Sales',
          type: 'pie', // Set chart type to pie
          radius: '50%', // Size of the pie chart relative to container
          center: ['50%', '50%'], // Center the pie chart
          data: chartData.map(item => ({
            value: item.Sales,
            name: `${item.Country} (${item.Year})`, // Combine Country and Year for label
            itemStyle: {
              color: countryColors[item.Country] || '#ccc', // Assign color based on country
              borderColor: 'white', // White border to separate slices
              borderWidth: 1 // Border width for visibility
            }
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
            formatter: '{b}: {d}%', // Show country, year, and percentage
            fontSize: 12, // Adjust font size for readability
            position: 'outside', // Place labels outside the pie for clarity
            alignTo: 'labelLine' // Align labels with lines for neatness
          },
          labelLine: {
            show: true, // Show lines connecting labels to slices
            length: 15, // Length of the first segment of the line
            length2: 10 // Length of the second segment of the line
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

export default PieChartFinancialsByCountryYear;