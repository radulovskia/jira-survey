import React, { useState, useEffect } from 'react';
import { api_analytics } from './api'
import TemporaryDrawer from './NavigationDrawer';
import FormLabel from '@mui/material/FormLabel';
import { BarChart } from '@mui/x-charts/BarChart';



const Analytics = () => {
  const socket = new WebSocket(`ws://${api_analytics.defaults.baseURL}/ws`);
  const [messages, setMessages] = useState([]);
  const [uniqueSurveyIds, setUniqueSurveyIds] = useState(new Set());
  // const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        console.log("Received: ", event.data);
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
        setUniqueSurveyIds((prevIds) => {
          const newIds = new Set(prevIds);
          newIds.add(message.survey_id);
          return newIds;
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // return () => {
    //   socket.close();
    // };
  }, []);
  
  const getQuestionsForSurvey = (surveyId) => {
    const filteredMessages = messages.filter((message) => message.survey_id === surveyId);
    const questions = filteredMessages.flatMap((message) => 
      message.questions.map((question) => question.question)
    );
    return questions;
  };

  const getCountsForSurvey = (surveyId) => {
    const filteredMessages = messages.filter((message) => message.survey_id === surveyId);
    const counts = {};
    filteredMessages.forEach((message) => {
      message.questions.forEach((question) => {
        const questionText = question.question;
        question.answers.forEach((answer) => {
          counts[questionText] = counts[questionText] || {};
          counts[questionText][answer] = counts[questionText][answer] ? counts[questionText][answer] + 1 : 1;
        });
      });
    });
    return counts;
  };
  

  return (
    <>    
      <div>
        <TemporaryDrawer />
        <h1>WebSocket Messages:</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
      {Array.from(uniqueSurveyIds).map((surveyId) => (
        <div key={surveyId}>
          <h2>Survey ID: {surveyId}</h2>
          <BarChart
            xAxis={[{ scaleType: 'band', data: getQuestionsForSurvey(surveyId) }]}
            series={Object.entries(getCountsForSurvey(surveyId)).map(([question, counts]) => ({
              name: question,
              data: Object.values(counts)
            }))}
            width={1000}
            height={500}
          />
        </div>
      ))}
    </>
  );
};

export default Analytics;