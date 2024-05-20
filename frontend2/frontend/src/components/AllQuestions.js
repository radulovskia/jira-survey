import React, { useState, useEffect } from 'react';
import { api_backend } from './api';
import TemporaryDrawer from './NavigationDrawer';


function MyComponent() {
  const [questions, setQuestions] = useState([]); // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${api_backend.defaults.baseURL}/questions/`); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures fetching happens only once

  return (
    <div>
      <TemporaryDrawer />
      <h1>Questions</h1>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <ul>
              {Object.entries(question.options).map(([optionKey, optionValue]) => (
                <li key={optionKey}>{optionKey}: {optionValue}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default MyComponent;
