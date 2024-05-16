import React, { useState, useEffect } from 'react';
import { api_analytics } from './api'

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

  return (
    <div>
      <h1>WebSocket Messages:</h1>
      <ul>
        {messages.slice(0, 20).map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
