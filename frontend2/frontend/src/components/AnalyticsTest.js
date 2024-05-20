import React, { useState, useEffect } from 'react';
import { api_analytics } from './api';
import TemporaryDrawer from './NavigationDrawer';
import FormLabel from '@mui/material/FormLabel';
import { BarChart } from '@mui/x-charts/BarChart';

const Analytics = () => {
  const socket = new WebSocket(`ws://${api_analytics.defaults.baseURL}/ws`);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Replace 'ws://localhost:8000' with your WebSocket server URL

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };



    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // return () => {
    //   socket.close();
    // };
  }, []);

  console.log(messages);

  const chartSetting = {
    height: 400,
    colors: "#2584ff",
  };

  // if (messages.length === 0) {
  //   return <p>Waiting for data...</p>;
  // }

  // const latestMessage = messages[messages.length - 1];
  // const questionData = latestMessage.questions[0];
  // const answersData = Object.entries(questionData.options).map(([key, value]) => ({
  //   option: key,
  //   answer: parseInt(value, 10),
  // }));

  // console.log(answersData);

  return (
    <>
      {/* <h1>{questionData.question}</h1>
      <FormLabel id="demo-radio-buttons-group-label">
        {questionData.answers.join(', ')}
      </FormLabel> */}
      {/* <BarChart
        {...chartSetting}
        series={[{ data: answersData, key: 'answer', color: "#2584ff" }]}
        yAxis={{ data: answersData.map(d => d.answer), scaleType: 'band' }}
        xAxis={{ data: answersData.map(d => d.option), scaleType: 'band' }}
        height={200}
        width={600}
        layout="horizontal"
        options={{
          plugins: {
            datalabels: {
              display: true,
              color: 'black',
              anchor: 'end',
              align: 'end',
              formatter: (value) => `${value}%`,
            },
          },
        }}
      /> */}
      <div>
        <TemporaryDrawer />
        <h1>WebSocket Messages:</h1>
        <ul>
          {messages.slice(0, 2 + 0).map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Analytics;