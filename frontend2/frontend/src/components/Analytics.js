import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const [wsConnection, setWsConnection] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const myChart = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws:/localhost:8001/ws');
    setWsConnection(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (wsConnection) {
      wsConnection.onmessage = handleWebSocketMessage;
    }
  }, [wsConnection]);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('myChart').getContext('2d');
      if (myChart.current) {
        myChart.current.destroy(); // Destroy the existing chart
      }
      myChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Chart Data',
            data: chartData.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [chartData]);

  const handleWebSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received data from WebSocket:", data); // Print the received data
    setChartData(data);
  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Analytics;
