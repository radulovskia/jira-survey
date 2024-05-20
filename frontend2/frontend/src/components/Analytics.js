import React, { useState, useEffect } from 'react';
import { api_analytics } from './api'
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
  // console.log(messages);

  const chartSetting = {
    // width: 500,
    height: 400,
    colors: "#2584ff",
  };
  // printQuestions(messages)



  // console.log(messages.slice(0, 2 + 15));
  let tempJSON;
  messages.slice(0, 2 + 15).map((message, index) => (

    tempJSON = JSON.parse(message).questions[0],

    console.log(JSON.parse(message).questions[0]))
    // <li key={index}>{JSON.stringify(JSON.parse(message).questions)}</li>
    // <li key={index}>{JSON.stringify(message)}</li>



  )
  return (
    <>
      {/* <>
        <h1>{messages.question}</h1>
        <FormLabel id="demo-radio-buttons-group-label">{messages.answers}</FormLabel>
        <BarChart
          // leftAxis={null}
          // bottomAxis={null}
          // yAxis={[{ scaleType: 'band', data: [props.answers], dataKey: 'answersNum' }]}
          // xAxis={[]}
          // series={[{ dataKey: props.answersNum }]}
          // series={[{ data: [1, 2, 3, 2, 1] }]}
          // xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }]}
          // layout="horizontal"
          {...chartSetting}
          series={[{ data: messages.answers, color: "#2584ff" }]}
          yAxis={[{ scaleType: 'band', data: messages.answers, ChartsText: messages.answersNum }]}
          height={200}
          width={600}
          bottomAxis={null}
          layout="horizontal"

          options={{
            plugins: {
              datalabels: {
                display: true, // Ensure that the data labels are enabled
                // color: 'black', // Color of the label text
                anchor: 'end', // Positioning of the label relative to the bar
                align: 'end', // Alignment of the label text

                formatter: (value, context) => {
                  // const index = context.dataIndex;
                  // const total = props.answersNum.reduce((acc, cur) => acc + cur, 0);
                  // const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
                  return messages.answersNum
                  // return percentage + '%'; // Display percentage with percentage sign
                }
              }
            }
          }}
        /> */}

      {/* </> */}


      console.log(JSON.parse(messagesSpliced).questions);

      {/* "{"survey_id": "c04cfdcf - 5ebc - 4f56 - b06e - 4032bd57c273", "questions": [{"question_id": "f63046f9 - 90da - 428f - 8f30 - e5b93cc225c6", "question": "ewaee", "options": {"A": "rer", "B": "reree", "C": "rere"}, "answers": ["rer"]}, {"question_id": "3ae9c0da - 134a - 4535 - 81b4 - 56617c7e0ccb", "question": "RER", "options": {"A": "a", "B": "b", "C": "c"}, "answers": ["a"]}]}" */}

      <div>
        <TemporaryDrawer />
        <h1>WebSocket Messages:</h1>
        <ul>
          {messages.slice(0, 2 + 15).map((message, index) => (

            <li key={index}>{JSON.stringify(JSON.parse(message).questions)}</li>
            // <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Analytics;
