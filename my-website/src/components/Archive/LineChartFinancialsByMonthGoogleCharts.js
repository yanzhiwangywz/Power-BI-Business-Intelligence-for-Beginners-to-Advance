import React, { useEffect, useRef } from 'react';
import Papa from 'papaparse';

const LineChartFinancialsByMonth = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Load Google Charts
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.async = true;
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(fetchAndDrawChart);
      };
      document.body.appendChild(script);
    } else {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(fetchAndDrawChart);
    }

    // Fetch and draw chart
    const fetchAndDrawChart = () => {
      fetch('/data/LineChart/LineChartFinancialsByMonth.csv')
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const data = result.data;

              // Create Google Charts DataTable
              const dataTable = new google.visualization.DataTable();
              dataTable.addColumn('string', 'YearMonth');
              dataTable.addColumn('number', 'Sales');
              dataTable.addColumn('number', 'COGS');

              // Add rows
              data.forEach(row => {
                dataTable.addRow([
                  `${row.Year}-${row['Month Name']}`,
                  parseFloat(row.Sum_Sales) || 0,
                  parseFloat(row.Sum_COGS) || 0
                ]);
              });

              // Chart options
              const options = {
                title: 'Sales and COGS by Year-Month',
                titleTextStyle: { fontSize: 16, bold: true },
                legend: { position: 'top' },
                width: 600,
                height: 400,
                chartArea: { left: 60, top: 60, width: '80%', height: '70%' },
                hAxis: {
                  slantedText: true,
                  slantedTextAngle: 45,
                  textStyle: { fontSize: 12 }
                },
                vAxis: {
                  format: '#,##0',
                  textStyle: { fontSize: 12 }
                },
                colors: ['#8884d8', '#82ca9d'],
                pointSize: 6,
                curveType: 'none', // Straight lines, matching ECharts
                dataOpacity: 1
              };

              // Draw chart
              const chart = new google.visualization.LineChart(chartRef.current);
              chart.draw(dataTable, options);
            },
            error: (error) => {
              console.error('Error parsing CSV:', error);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching CSV:', error);
        });
    };

    // Cleanup
    return () => {
      // Google Charts doesn't require explicit cleanup, but remove any added scripts
      const scripts = document.querySelectorAll('script[src="https://www.gstatic.com/charts/loader.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div>
      <div ref={chartRef} style={{ width: '600px', height: '400px', marginTop: '20px' }} />
    </div>
  );
};

export default LineChartFinancialsByMonth;